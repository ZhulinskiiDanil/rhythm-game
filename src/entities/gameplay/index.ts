import { LevelEvent } from './../../types/all/level';
import { useSelector } from './../../hooks/useSelector';
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
  initAt = new Date()
  nextEventIndex = 0
  lastEventStopTransitionFn: null | (() => void) = null
  columnsEffects: {
    [key: string]: {
      type: 'error' | 'success'
      columnNumber: number
      opacity: number
      KDPS: number
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
  initialLevel: Level | null = null
  song: HTMLAudioElement | null = null
  combo: number = 0
  buttons: Button[] = []
  pressedKeys: number = 0
  
  countKDPSAt = new Date()
  keydownCount = 0
  KDPS = 0

  isPlayed: boolean = false
  isLose: boolean = false

  constructor() {
    super();
    withFullHeight(this)
    withFullWidth(this)

    const loop = () => {
      const initDiff = +new Date() - +(this.countKDPSAt)
      this.KDPS = 1000 / (initDiff / this.keydownCount)
      
      requestAnimationFrame(loop.bind(this))
    }

    loop()

    this.initListeners()
  }

  initListeners() {
    eventEmitter.on('level', (newLevel: Level) => {
      const stringifyedLevel = JSON.stringify(newLevel)

      this.level = JSON.parse(stringifyedLevel)
      this.initialLevel = JSON.parse(stringifyedLevel)
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
        this.controller.setSong(song)
        this.gameInterface.setSong(song)
        this.gameInterface.setLevel(newLevel)
        this.gameInterface.setCombo(this.combo)
      }
    })

    eventEmitter.on('lose', () => {
      // console.log(`%cGame Over`, `color: red; font-size: 2rem; font-weight: bold;`)

      if (!this.isLose && !this.level?.ignoreLose) {
        this.controller.ignorePressing = true
        this.isPlayed = false
        this.isLose = true
        
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
          document.addEventListener('keydown', this.restart.bind(this), { once: true })
          document.addEventListener('mousedown', this.restart.bind(this), { once: true })
        }, 1500)
      }
    })

    eventEmitter.on('mistake', (columnNumber: number) => {
      this.addColumnEffect(columnNumber, 'error')
      this.gameInterface.setCombo(this.combo = 0)
    })

    eventEmitter.on('controllerSuccessKeyDown', (columnNumber: number) => {
      this.updateKeydownCounter()
      this.addColumnEffect(columnNumber, 'success')

      this.gameInterface.setPressedKeys(++this.pressedKeys)
      this.gameInterface.setCombo(++this.combo)
    })

    eventEmitter.on('controllerKeyDown', (
      data: ControllerButtonData
    ) => {
      const columns = this.level?.columns || 1
      const currentTime = this.song?.currentTime || 0
      const btnsSliceFromIndex = Math.max(this.pressedKeys - 1, 0)
      const btnsSliceToIndex = btnsSliceFromIndex + columns * 2
      const buttons = this.buttons.slice(btnsSliceFromIndex, btnsSliceToIndex).filter(btn => !btn.isPressed)
      const closerButton = buttons.reduce((acc, elm) => (
        acc.data.fromSecond < elm.data.fromSecond ? acc : elm
      ), buttons[0])

      const buttonsForCheck = buttons.filter(btn => (
        btn.data.fromSecond - .004 <= closerButton.data.fromSecond
      ))

      let pressed = false

      // console.table({
      //   key: useSelector(state => state.settings.controllers)[
      //     data.keyIndex
      //   ],
      //   t: this.song?.currentTime || 0
      // })

      for (let button of buttonsForCheck) {
        const isCurrentColumn = data.keyIndex === button.data.column - 1
        const isVissible = this.y + this.height > 0

        if (isCurrentColumn && isVissible) {
          const topCollision = currentTime + .100 > button.data.fromSecond
          const bottomCollision = button.y < canvas.height
          const collision = topCollision && bottomCollision

          if (collision && !button.isPressed) {
            button.press()
            pressed = true
            eventEmitter.emit('controllerSuccessKeyDown', button.data.column)
            break;
          }
        }
      }

      if (!pressed) {
        // emit "mistake", columnNumber
        eventEmitter.emit('mistake', data.keyIndex + 1)
      }
    })
  }

  restart() {
    console.clear()
    
    if (this.song && !this.isPlayed) {
      this.song.currentTime = this.level?.startFrom || 0

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.isLose = false
          this.play()
        })
      })
    }
  }

  play(fromZero?: boolean) {
    this.combo = 0
    this.KDPS = 0
    this.keydownCount = 0
    this.countKDPSAt = new Date()
    this.gameInterface.setCombo(this.combo)
    this.gameInterface.setPressedKeys(0)
    this.pressedKeys = 0
    this.nextEventIndex = 0

    if (this.initialLevel) {
      this.setSpeed(this.initialLevel.speed)
    }
    
    if (this.level && !this.isPlayed && !this.isLose) {
      this.controller.ignorePressing = false
      this.isPlayed = true
  
      eventEmitter.emit('stopLoseTransition')
      eventEmitter.emit('play', this.level)
  
      if (this.song) {
        this.song.play()

        if (fromZero) {
          this.song.currentTime = this.level?.startFrom || 0
        }
  
        const mousedown = () => console.log(this.song?.currentTime)
        document.addEventListener("mousedown", mousedown)
  
        eventEmitter.on('play', () => {
          document.removeEventListener("mousedown", mousedown)
        })
      }
    }
  }

  getNextEvent() {
    const events = this.level?.events || []

    return events[this.nextEventIndex]
  }

  handleEvents() {
    const nextEvent = this.getNextEvent()
    const currentTime = this.song?.currentTime

    if (nextEvent && currentTime) {
      const { fromSecond } = nextEvent
      
      if (currentTime > fromSecond) {
        if (this.lastEventStopTransitionFn) {
          this.lastEventStopTransitionFn()
        }

        this.nextEventIndex++
        this.handleEvent(nextEvent)
      }
    }
  }

  handleEvent(event: LevelEvent) {
    if (event?.speed && this.level?.speed) {
      if (event.transition) {
        const { stopCalculate } = getSmoothValue(({ value }) => {
          this.setSpeed(value)
        }, {
          ...event.transition,
          fromTo: [this.level.speed, event.speed]
        })

        this.lastEventStopTransitionFn = stopCalculate
      } else {
        this.level.speed = event.speed
      }
    }
  }

  setSpeed(speed: number) {
    if (this.level) {
      this.level.speed = speed
      eventEmitter.emit('speed', speed)
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
      opacity: 1,
      KDPS: this.KDPS
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

  drawColumnEffects() {
    for (let key in this.columnsEffects) {
      const effect = this.columnsEffects[key]

      if (this.level) {
        ctx.save()

        const gap = this.width / this.level.columns
        const x = gap * (effect.columnNumber - 1)
        const y = 0
        const w = gap
        const h = canvas.height
        const initialOpacity = .2

        ctx.globalAlpha = initialOpacity * effect.opacity

        if (effect.type === 'error') {
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, "transparent");
          gradient.addColorStop(1, "rgba(255, 118, 94, 1)");

          ctx.fillStyle = gradient
        } else {
          const gradient = ctx.createLinearGradient(0, y, 0, y + h);
          
          if (effect.KDPS > 4) {
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "rgba(160, 92, 255, .5)");
          } else {
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "rgba(152, 235, 52, .5)");
          }

          ctx.fillStyle = gradient
        }

        ctx.filter = `blur(${20 - 20 * effect.opacity}px)`
        ctx.fillRect(x, y, w, h)

        ctx.restore()
      }
    }
  }

  updateKeydownCounter() {
    this.keydownCount++
  }

  draw() {
    const lobbyIsActive = useSelector(state => state.lobby.isActive)
    if (lobbyIsActive) return

    this.handleEvents()

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