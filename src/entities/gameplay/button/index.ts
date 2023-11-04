import { useSelector } from './../../../hooks/useSelector';
import { MainEntitie } from "@/entities/main"
import { canvas, ctx } from "@/canvas"

// Methods
import { Level, LevelButton } from "@/types";
import eventEmitter from "@/eventEmitter";
import { getSmoothValue } from "@/common/funcs/getSmoothValue";

export class Button extends MainEntitie {
  controllers = useSelector(state => state.settings.controllers)
  isPressed: boolean = false
  isHolded: boolean = false
  holdedTime: number  = 0
  pressedAt: number = 0
  level: Level | null = useSelector(state => {
    if (state.level.data) {
      return {...state.level.data}
    } else return null
  })
  data: LevelButton
  song: HTMLAudioElement | null = null
  fillStyle = 'rgb(255, 128, 38, .2)'
  paddingBottomVh: number = 0
  visibility = 1

  constructor(data: LevelButton, paddingBottomVh: number) {
    super();
    this.data = data
    this.paddingBottomVh = paddingBottomVh

    eventEmitter.on('speed', (speed: number) => {
      if (this.level) {
        this.level.speed = speed
      }
    })

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
      this.level = {...newLevel}
    })
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

        if (this.data.type === 'normal') {
          ctx.globalAlpha = .75 * this.visibility
        }

        const radius = this.data.type === 'normal' ? 10 : [0, 0, 10, 10]
        ctx.lineWidth = 2
        ctx.fillStyle = !this.isPressed ? this.fillStyle : '#dced5a'
        
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius)
        ctx.fill();

        const fillStyleGradient = ctx.createLinearGradient(x, y, x + w, y + h)
        fillStyleGradient.addColorStop(0, '#ff7247')
        fillStyleGradient.addColorStop(1, '#ffbc47')

        ctx.strokeStyle = !this.isPressed ? fillStyleGradient : '#dced5a'
        
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius)
        ctx.stroke();

        // ctx.font = '12px Arial'
        // ctx.fillStyle = 'white'
        // ctx.textAlign = 'center'
        // ctx.fillText(String(fromSecond), x + w / 2, y + h / 2 + 4)

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
        gradient.addColorStop(0, 'rgba(255, 171, 99, .3)')
        gradient.addColorStop(1, 'rgba(255, 171, 99, .2)')

        ctx.fillStyle = gradient
        
        ctx.beginPath()
        ctx.roundRect(x, hold.y, w, hold.h, [10, 10, 0, 0])
        ctx.fill()

        const holdFill = {
          h: Math.abs(yOfPressedAt - yOfHoldTime),
          y: hold.y + (hold.h - Math.abs(yOfPressedAt - yOfHoldTime))
        }

        if (holdFill.h > 0) {
          const gradientFill = ctx.createLinearGradient(
            0, holdFill.y,
            0, holdFill.y + holdFill.h
          )
          gradientFill.addColorStop(0, 'rgba(247, 151, 82, .8)')
          gradientFill.addColorStop(1, 'rgba(247, 151, 82, .6)')
          
          ctx.globalAlpha = .5
          ctx.fillStyle = gradientFill

          ctx.beginPath()
          ctx.roundRect(x, Math.max(holdFill.y, hold.y), w, canvas.height * .02, [10, 10, 0, 0])
          ctx.fill()
          
          ctx.globalAlpha = 1
          ctx.fillStyle = gradientFill
        
          ctx.beginPath()
          ctx.roundRect(x, Math.max(holdFill.y, hold.y), w, Math.min(holdFill.h, hold.h), [10, 10, 0, 0])
          ctx.fill()
        }

        ctx.restore()
      }
    }
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

  collision() {
    const isValidButton = this.data.column > 0 &&
      this.data.column <= (this.level?.columns || 0)

    if (isValidButton && this.height + this.y > canvas.height && !this.isPressed) {
      eventEmitter.emit('lose')
    }
  }
}