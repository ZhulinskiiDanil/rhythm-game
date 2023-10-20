import { canvas, ctx } from "@/canvas";
import { MainEntitie } from "@/entities/main";
import { Level } from "@/types";
import { ControllerButtonData } from "./types";
import eventEmitter from "@/eventEmitter";

export class Controller extends MainEntitie {
  vh: number = 0
  controllerY: number = 0
  controlkeys = [
    "KeyD", "KeyF", "KeyJ", "KeyK"
  ] as const
  pressedKey: null | typeof this.controlkeys[number] = null
  level: null | Level = null
  ignorePressing: boolean = true

  constructor(vh: number) {
    super();
    this.vh = vh

    eventEmitter.on('level', (newLevel: Level) => {
      this.level = newLevel
    })

    const keydown = (e: KeyboardEvent) => {
      if (this.ignorePressing) return

      const key = e.code as typeof this.controlkeys[number]
      
      if (this.controlkeys.includes(key) && this.pressedKey !== key) {
        this.pressedKey = key

        if (this.level) {
          const gap = this.width / this.level.columns
          const keyIndex = this.controlkeys.findIndex(elm => elm === key)
          
          const controllerBtnData: ControllerButtonData = {
            keyIndex,
            x: gap * keyIndex,
            y: this.y,
            width: gap,
            height: canvas.height * this.vh
          }
          
          eventEmitter.emit('controllerKeyDown', controllerBtnData)
        }
      }
    }

    const mousedown = (e: MouseEvent) => {
      if (this.ignorePressing) return
      
      if (this.level) {
        const gap = this.width / this.level.columns
        const keyIndex = Math.floor(e.offsetX / gap)

        const controllerBtnData: ControllerButtonData = {
          keyIndex,
          x: gap * keyIndex,
          y: this.y,
          width: gap,
          height: canvas.height * this.vh
        }
  
        eventEmitter.emit('controllerKeyDown', controllerBtnData)
      }
    }

    eventEmitter.on('controllerKeyDown', () => {
      const audio = new Audio()
      audio.src = '/assets/hit-sound.wav'
      audio.volume = .08

      audio.play()
    })

    document.addEventListener('keydown', keydown)
    document.addEventListener('mousedown', mousedown)

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      const key = e.code as typeof this.controlkeys[number]

      if (this.controlkeys.includes(key)) {
        this.pressedKey = null
      }
    })
  }

  draw() {
    if (this.level) {
      const h = canvas.height * .002 // vh
      const w = canvas.width
      const x = 0
      const y = canvas.height - h - canvas.height * this.vh

      this.height = h
      this.width = w
      this.y = y
      this.x = x
      
      const gap = canvas.width / this.level.columns

      for (let i = 0; i < this.level.columns; i++) {
        const x = i * gap
        const w = gap
        const h = canvas.height - y
        const fontSize = 16

        ctx.save()

        ctx.globalAlpha = .2
        ctx.font = `200 ${fontSize}px sans-serif`
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        
        if (this.pressedKey === this.controlkeys[i]) {
          ctx.globalAlpha = 1
          ctx.fillStyle = 'tomato'
        }

        ctx.fillText(
          this.controlkeys[i],
          x + w / 2,
          y + h / 2 + fontSize * .4
        )
      
        ctx.restore()
      }

      ctx.save()

      ctx.fillStyle = '#ffc187'
      ctx.fillRect(x, y, w, h)

      ctx.restore()
    }
  }
}