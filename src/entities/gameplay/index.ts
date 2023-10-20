import { MainEntitie } from "@/entities/main"
import { canvas, ctx } from "@/canvas"
import eventEmitter from "@/eventEmitter";
import { getSmoothValue } from "@/common/funcs/getSmoothValue";

// Entitie
import { Button } from "./button";

// Types
import { Level } from "@/types";

// Methods
import { withFullWidth } from "@/common/funcs/withFullWidth"
import { withFullHeight } from "@/common/funcs/withFullHeight";
import { Controller } from "./controller";
import { GameInterface } from "./gameInterface";
import { ControllerButtonData } from "./controller/types";

export class Gameplay extends MainEntitie {
  columnsEffects: {
    [key: string]: {
      type: 'error' | 'success'
      columnNumber: number
      opacity: number
    }
  } = {}
  errors: {
    [key: string]: {
      columnNumber: number
      opacity: number
    }
  } = {}
  controllerVh: number = .18 // from 0 to 1 (canvas.height)
  controller: Controller = new Controller(this.controllerVh)
  gameInterface: GameInterface = new GameInterface()
  level: Level | null = null
  song: HTMLAudioElement | null = null
  combo: number = 0
  buttons: Button[] = []
  pressedKeys: number = 0

  isPlayed: boolean = false
  isLose: boolean = false

  constructor() {
    super();
    withFullHeight(this)
    withFullWidth(this)

    this.initListeners()
  }

  initListeners() {
    eventEmitter.on('level', (newLevel: Level) => {
      this.level = newLevel
      this.gameInterface.setKeysCount(newLevel.buttons.length)

      if (newLevel) {
        for (let button of newLevel.buttons) {
          this.buttons.push(new Button(button, this.controllerVh))
        }

        const song = new Audio()
        song.src = newLevel.songPath
        song.volume = .05
        song.currentTime = newLevel.startFrom || 0

        this.song = song
        this.gameInterface.setSong(song)
        this.gameInterface.setLevel(newLevel)
        this.gameInterface.setCombo(this.combo)
      }
    })

    eventEmitter.on('lose', () => {
      if (!this.isLose && !this.level?.ignoreLose) {
        this.controller.ignorePressing = true
        this.isPlayed = false
        this.isLose = true

        this.combo = 0
        this.gameInterface.setCombo(this.combo)
        
        if (this.song) {
          this.song.pause()
        }
        
        if (this.song) {
          const { stopCalculate } = getSmoothValue(({ value }) => {
            if (this.song) {
              this.song.currentTime = value
            }
          }, {
            fromTo: [
              this.song.currentTime,
              this.song.currentTime - .3
            ],
            timingFunction: 'ease',
            duration: 1000
          })

          eventEmitter.once('stopLoseTransition', () => {
            stopCalculate()
          })
        }
  
        setTimeout(() => {
          document.addEventListener('keydown', () => this.restart(), { once: true })
          document.addEventListener('mousedown', () => this.restart(), { once: true })
        }, 1500)
      }
    })

    eventEmitter.on('mistake', (columnNumber: number) => {
      this.addColumnEffect(columnNumber, 'error')
      this.gameInterface.setCombo(this.combo = 0)
    })

    eventEmitter.on('controllerSuccessKeyDown', (columnNumber: number) => {
      this.addColumnEffect(columnNumber, 'success')

      this.gameInterface.setPressedKeys(++this.pressedKeys)
      this.gameInterface.setCombo(++this.combo)
    })

    eventEmitter.on('controllerKeyDown', (
      data: ControllerButtonData
    ) => {
      for (let button of this.buttons) {
        const isCurrentColumn = data.keyIndex === button.data.column - 1
        const isVissible = this.y + this.height > 0
  
        if (isCurrentColumn && isVissible) {
          const topCollision = button.y + button.height > data.y - data.height * 2
          const bottomCollision = button.y < canvas.height
          const collision = topCollision && bottomCollision

          if (collision && !button.isPressed) {
            button.press()
            eventEmitter.emit('controllerSuccessKeyDown', button.data.column)
            break;
          } else if (!button.isPressed && bottomCollision) {
            // emit "mistake", columnNumber
            eventEmitter.emit('mistake', data.keyIndex + 1)
          }
        }
      }
    })

    document.addEventListener('keydown', () => this.play(), { once: true })
    document.addEventListener('mousedown', () => this.play(), { once: true })
  }

  restart() {
    this.pressedKeys = 0

    if (this.song && !this.isPlayed) {
      this.play()
      this.song.currentTime = 0

      requestAnimationFrame(() => {
        this.isLose = false
        this.isPlayed = true
      })
    }
  }

  play() {
    this.pressedKeys = 0
    
    if (this.level && !this.isPlayed) {
      this.controller.ignorePressing = false
      this.isPlayed = true
  
      eventEmitter.emit('stopLoseTransition')
      eventEmitter.emit('play', this.level)
  
      if (this.song) {
        this.song.play()
  
        const mousedown = () => console.log(this.song?.currentTime)
        document.addEventListener("mousedown", mousedown)
  
        eventEmitter.on('play', () => {
          document.removeEventListener("mousedown", mousedown)
        })
      }
    }
  }

  setCombo(combo: number) {
    this.combo = combo
    this.gameInterface.setCombo(combo)
  }

  addColumnEffect(
    columnNumber: number,
    type: typeof this.columnsEffects['']['type']
  ) {
    const columnsEffect = {
      type: type,
      columnNumber,
      opacity: 1
    }
    this.columnsEffects[columnNumber] = columnsEffect
    
    getSmoothValue(({ value }) => {
      columnsEffect.opacity = value
    }, {
      fromTo: [1, 0],
      timingFunction: 'ease',
      duration: 1000
    })
  }

  draw() {
    if (this.level) {
      ctx.save()
      ctx.fillStyle = 'white'
      ctx.globalAlpha = .04
      
      const gap = this.width / this.level.columns
  
      for (let i = 0; i < this.level.columns - 1; i++) {
        ctx.fillRect((i + 1) * gap, 0, 1, this.height)
      }
  
      ctx.restore()
      
      this.drawButtons()
      this.drawColumnEffects()
      this.controller.draw()
      this.gameInterface.draw()
      this.drawPlayText()
      this.drawLoseText()
    }
  }

  drawButtons() {
    for (let button of this.buttons) {
      button.draw(this.song)
    }
  }

  drawColumnEffects() {
    ctx.save()

    for (let key in this.columnsEffects) {
      const effect = this.columnsEffects[key]

      if (this.level) {
        const gap = this.width / this.level.columns
        const x = gap * (effect.columnNumber - 1)
        const y = 0
        const w = gap
        const h = canvas.height
        const initialOpacity = .2

        ctx.globalAlpha = initialOpacity * effect.opacity

        if (effect.type === 'error') {
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, "rgba(255, 118, 94, 0)");
          gradient.addColorStop(1, "rgba(255, 118, 94, 1)");

          ctx.fillStyle = gradient
        } else {
          const gradient = ctx.createLinearGradient(0, y, 0, y + h);
          gradient.addColorStop(0, "transparent");
          gradient.addColorStop(1, "rgba(152, 235, 52, .5)");
          ctx.fillStyle = gradient
          ctx.filter = `blur(${20 - 20 * effect.opacity}px)`
          ctx.fillStyle = 'rgba(152, 235, 52, .2)'
        }

        ctx.fillRect(x, y, w, h)
      }
    }

    ctx.restore()
  }

  drawPlayText() {
    if (!this.isPlayed && !this.isLose) {
      ctx.save()
  
      ctx.font = "36px Arial"
      ctx.textAlign = 'center'
      ctx.fillStyle = 'white'
      ctx.fillText('Нажмите любую клавишу', this.width / 2, this.height / 2)
  
      ctx.restore()
    }
  }

  drawLoseText() {
    if (!this.isPlayed && this.isLose) {
      ctx.save()
  
      const text = 'Вы проиграли, нажмите любую клавишу'

      ctx.font = "36px Arial"
      ctx.textAlign = 'center'
      ctx.fillStyle = 'white'
      ctx.fillText(text, this.width / 2, this.height / 2)
  
      ctx.restore()
    }
  }
}