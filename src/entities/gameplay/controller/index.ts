import { AudioFrequency } from '@/common/classes/AudioFrequency';
import { useSelector } from '@/hooks/useSelector';
import { canvas, ctx } from "@/canvas";
import { MainEntitie } from "@/entities/main";
import { Level } from "@/types";
import { ControllerButtonData } from "./types";
import eventEmitter from "@/eventEmitter";

export class Controller extends MainEntitie {
  vh: number = 0
  controllerY: number = 0
  controlkeys = useSelector(state => state.settings.controllers)
  pressedKey: (typeof this.controlkeys[number] | null)[] = []
  level: null | Level = null
  ignorePressing: boolean = true
  audioFrequency = new AudioFrequency()
  song: HTMLAudioElement | null = null

  constructor(vh: number) {
    super();
    this.vh = vh

    eventEmitter.on('level', (newLevel: Level) => {
      this.level = newLevel
    })

    const keydown = (e: KeyboardEvent) => {
      if (this.ignorePressing) return

      const key = e.code as typeof this.controlkeys[number]
      
      if (
        this.controlkeys.includes(key) &&
        !this.pressedKey.includes(key)
      ) {
        const keyIndex = this.controlkeys.findIndex(_ => _ === key)
        this.pressedKey[keyIndex] = key

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
        const keyIndex = this.controlkeys.findIndex(_ => _ === key)
        this.pressedKey[keyIndex] = null
      }
    })
  }

  setSong(song: HTMLAudioElement) {
    this.audioFrequency.setAudio(song)
  }

  draw() {
    if (this.level) {
      const songFrequency = this.audioFrequency.getSongFrequency()
      const h = canvas.height * .003 // vh
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

        if (this.pressedKey.includes(this.controlkeys[i])) {
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

      const padding = 20

      ctx.fillStyle = '#ff953b'
      ctx.beginPath()
      ctx.roundRect(x + padding / 2, y, w - padding, h, 5)
      ctx.fill()

      ctx.restore()

      const shadowHeight = canvas.height * songFrequency

      const gradient = ctx.createLinearGradient(
        0, canvas.height - shadowHeight, 0, canvas.height
      )
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(1, 'rgba(255, 150, 64, .2)')
      
      ctx.save()
      ctx.globalAlpha = songFrequency * 2
      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - shadowHeight, w, shadowHeight)
      ctx.restore()
    }
  }
}