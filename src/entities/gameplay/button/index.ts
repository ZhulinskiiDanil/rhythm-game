import { MainEntitie } from "@/entities/main"
import { canvas, ctx } from "@/canvas"

// Methods
import { Level, LevelButton } from "@/types";
import eventEmitter from "@/eventEmitter";
import { store } from "@/store";
import { getSmoothValue } from "@/common/funcs/getSmoothValue";

export class Button extends MainEntitie {
  isPressed: boolean = false
  level: Level | null = store.getState().level.data || null
  data: LevelButton
  fillStyle = '#fc9e68'
  paddingBottomVh: number = 0
  visibility = 1

  constructor(data: LevelButton, paddingBottomVh: number) {
    super();
    this.data = data
    this.paddingBottomVh = paddingBottomVh

    eventEmitter.on('play', () => {
      this.isPressed = false
      this.visibility = 1
    })

    eventEmitter.on('level', (newLevel: Level) => {
      this.level = newLevel
    })
  }

  press() {
    this.isPressed = true

    getSmoothValue(({ value }) => {
      this.visibility = value
    }, {
      fromTo: [1, 0],
      timingFunction: 'ease',
      duration: 100
    })
  }

  getProgress(song: HTMLAudioElement | null) {
    const currentTime = song?.currentTime

    if (currentTime) {
      // range from 0 to 1
      return currentTime / this.data.fromSecond
    }
  
    return 0
  }

  draw(song: HTMLAudioElement | null) {
    if (this.level && song) {
      this.collision()

      const from = this.data.fromSecond * canvas.height
      const fromWithSpeed = from * .5 * this.level.speed - canvas.height
  
      ctx.save()
  
      const progress = this.getProgress(song)
      const gap = canvas.width / this.level.columns
      const paddingBottom = canvas.height * this.paddingBottomVh
      const padding = gap * .05
      const w = gap - padding * 2
      const h = canvas.height * .04
      const x = (this.data.column - 1) *  gap + padding
      const y = canvas.height * progress - h - (fromWithSpeed - fromWithSpeed * progress) - paddingBottom
      
      this.width = w
      this.height = h
      this.x = x
      this.y = y

      if (this.y + this.height > 0) {
        ctx.globalAlpha = .75 * this.visibility
        ctx.fillStyle = !this.isPressed ? this.fillStyle : 'lightgreen'
        ctx.fillRect(x, y, w, h)
  
        ctx.font = '12px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(String(this.data.fromSecond), x + w / 2, y + h / 2 + 4)
      }

      ctx.restore()
    }
  }

  collision() {
    const isValidButton = this.data.column > 0 &&
      this.data.column <= (this.level?.columns || 0)

    if (isValidButton && this.height + this.y > canvas.height && !this.isPressed) {
      eventEmitter.emit('lose')
    }
  }
}