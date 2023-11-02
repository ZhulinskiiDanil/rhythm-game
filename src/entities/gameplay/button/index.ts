import { useSelector } from './../../../hooks/useSelector';
import { MainEntitie } from "@/entities/main"
import { canvas, ctx } from "@/canvas"

// Methods
import { Level, LevelButton } from "@/types";
import eventEmitter from "@/eventEmitter";
import { store } from "@/store";
import { getSmoothValue } from "@/common/funcs/getSmoothValue";

export class Button extends MainEntitie {
  controllers = useSelector(state => state.settings.controllers)
  isPressed: boolean = false
  isHolded: boolean = false
  holdedTime: number  = 0
  pressedAt: number = 0
  level: Level | null = store.getState().level.data || null
  data: LevelButton
  song: HTMLAudioElement | null = null
  fillStyle = '#ff8845'
  paddingBottomVh: number = 0
  visibility = 1

  constructor(data: LevelButton, paddingBottomVh: number) {
    super();
    this.data = data
    this.paddingBottomVh = paddingBottomVh

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      const controllerKey = this.controllers[this.data.column - 1]
      const keyUp = e.code

      this.holdUp.call(this, controllerKey, keyUp)
    })
    
    document.addEventListener('mouseup', (e: MouseEvent) => {
      const controllerKey = this.controllers[this.data.column - 1]

      const columns = this.level?.columns || 1
      const column = e.offsetX / (columns / canvas.width)
      const keyUp = this.controllers[column - 1]

      this.holdUp.call(this, controllerKey, keyUp)
    })

    eventEmitter.on('play', this.restore.bind(this))

    eventEmitter.on('level', (newLevel: Level) => {
      this.level = newLevel
    })
  }

  restore() {
    this.isPressed = false
    this.visibility = 1
    this.holdedTime = 0
    this.pressedAt = 0
  }

  holdUp(
    controllerKey: KeyboardEvent['code'],
    keyUp: KeyboardEvent['code']
  ) {
    if (controllerKey === keyUp) {
      this.isHolded = false
    }
  }

  press() {
    if (!this.isPressed) {
      this.isHolded = true
    }

    this.isPressed = true
    this.pressedAt = this.song?.currentTime || 0

    getSmoothValue(({ value }) => {
      this.visibility = value
    }, {
      fromTo: [1, 0],
      timingFunction: 'ease',
      duration: 100
    })
  }

  getProgress(currentTime: number) {
    if (currentTime) {
      // range from 0 to 1
      return currentTime / this.data.fromSecond
    }
  
    return 0
  }

  getHeight() {
    return canvas.height * .04
  }

  getYByTime(
    seconds: number, currentTime: number = 0
  ): number {
    if (this.level && currentTime) {
      const from = seconds * canvas.height
      const fromWithSpeed = from * .5 * this.level.speed - canvas.height
  
      const progress = this.getProgress(currentTime)
      const paddingBottom = canvas.height * this.paddingBottomVh
      const h = this.getHeight()
      const y = canvas.height * progress - h - (fromWithSpeed - fromWithSpeed * progress) - paddingBottom
  
      return y
    }

    return 0
  }

  draw(song: HTMLAudioElement | null) {
    const { fromSecond, toSecond } = this.data
    if (!this.song) this.song = song

    if (this.isHolded) {
      this.holdedTime = song?.currentTime || 0
    }

    if (this.level && song) {
      this.collision()

      const gap = canvas.width / this.level.columns
      const padding = gap * .05
      const w = gap - padding * 2
      const h = this.getHeight()
      const y = this.getYByTime(fromSecond, song.currentTime)
      const x = (this.data.column - 1) *  gap + padding
      
      this.width = w
      this.height = h
      this.x = x
      this.y = y

      if (this.y + this.height > 0) {
        ctx.save()

        ctx.globalAlpha = .75 * this.visibility
        ctx.fillStyle = !this.isPressed ? this.fillStyle : 'lightgreen'
        ctx.fillRect(x, y, w, h)
  
        ctx.font = '12px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(String(fromSecond), x + w / 2, y + h / 2 + 4)

        ctx.restore()
      }

      if (this.data.type === 'hold' && toSecond) {
        const yFrom = this.getYByTime(fromSecond, toSecond)
        const yTo = this.getYByTime(toSecond, fromSecond)
        const yOfPressedAt = this.getYByTime(this.pressedAt, this.pressedAt)
        const yOfHoldTime = this.getYByTime(this.holdedTime, this.holdedTime)
        const heightByTime = Math.abs(yFrom - yTo)
        const hold = {
          y: y - heightByTime,
          h: heightByTime
        }

        ctx.save()
        
        const gradient = ctx.createLinearGradient(0, hold.y, 0, hold.y + hold.h)
        gradient.addColorStop(0, '#ffd01a')
        gradient.addColorStop(1, '#ff772a')

        ctx.globalAlpha = .2
        ctx.fillStyle = gradient
        ctx.fillRect(x, hold.y, w, hold.h)

        const holdFill = {
          h: Math.abs(yOfPressedAt - yOfHoldTime),
          y: hold.y + (hold.h - Math.abs(yOfPressedAt - yOfHoldTime))
        }

        const gradientFill = ctx.createLinearGradient(0, holdFill.y, 0, Math.min(holdFill.y + holdFill.h, holdFill.y + 400))
        gradientFill.addColorStop(0, '#ff9045')
        gradientFill.addColorStop(1, 'transparent')

        ctx.filter = 'blur(10px)'
        ctx.globalAlpha = .7
        ctx.fillStyle = gradientFill
        ctx.fillRect(x, Math.max(holdFill.y, hold.y), w, Math.max(holdFill.h, hold.h))

        ctx.restore()
      }
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