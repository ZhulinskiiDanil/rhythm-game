import { canvas, ctx } from "@/canvas";
import { MainEntitie } from "@/entities/main";
import { Level } from "@/types";

export class GameInterface extends MainEntitie {
  song: HTMLAudioElement | null = null
  level: Level | null = null
  padding = 32
  textsGap = 16
  texts: string[] = []
  combo = 0
  maxCombo = 0
  keysCount = 0
  pressedKeys = 0
  font = { size: 16 }
  FPS = 0
  initAt = new Date()
  completedFrames = 0
  levelDuration = 0

  constructor() {
    super();

    this.initAt = new Date()
    setInterval(this.calcFPS.bind(this), 1000/60)

    const loop = () => {
      this.completedFrames++

      requestAnimationFrame(loop.bind(this))
    }; loop()
  }

  calcFPS() {
    const dateDiff = +new Date() - +this.initAt
    this.FPS = Math.floor(
      this.completedFrames / dateDiff * 1000 * 10
    ) / 10
  }

  setKeysCount(n: number) {
    this.keysCount = n
  }

  setPressedKeys(n: number) {
    this.pressedKeys = n
  }

  setSong(song: HTMLAudioElement) {
    this.song = song
  }

  setLevel(level: Level) {
    this.level = level

    this.levelDuration = this.level.buttons.reduce((acc, btn) => {
      return acc < btn.fromSecond ? btn.fromSecond : acc
    }, 0)
  }

  setCombo(combo: number) {
    this.combo = combo;
    
    if (combo > this.maxCombo) {
      this.maxCombo = combo
    }
  }

  draw() {
    this.drawShadow()
    this.initHeadTexts()
    this.drawHeadText('Pressed: ' + this.pressedKeys + '/' + this.keysCount)
    this.drawHeadText('Max combo: ' + this.maxCombo)
    this.drawHeadText('Combo: ' + this.combo)
    this.drawHeadText(this.FPS + ' FPS')
    this.drawProgressLine()
  }

  drawProgressLine() {
    const currentTime = (
      this.song?.currentTime || 0
    ) - (this.level?.startFrom || 0)
    const levelDuration = (
      this.levelDuration || 0
    ) - (this.level?.startFrom || 0)

    if (currentTime > 0) {
      const progress = currentTime / levelDuration
      const w = canvas.width * progress
      const h = canvas.height * .01
      
      ctx.save()

      ctx.filter = 'blur(2px)'
      ctx.fillRect(0, 0, canvas.width * progress, 10)

      ctx.filter = 'blur(0px)'
      ctx.fillStyle = 'orange'
      ctx.fillRect(0, 0, w, h)

      ctx.restore()
    }
  }

  getDuration() {
    const currentTime = this.song?.currentTime || 0
    
    if (typeof currentTime === 'number') {
      const value = Math.floor(currentTime * 10) / 10
      return value % 1 === 0 ? value + '.0' : String(value)
    }

    return null
  }

  initHeadTexts() {
    this.texts = []
  }

  drawShadow() {
    const w = canvas.width
    const h = canvas.height * .25
    const gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, 'rgba(20, 20, 20, 1)')
    gradient.addColorStop(1, 'rgba(25, 25, 25, 0)')

    ctx.save()

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
    
    ctx.restore()
  }

  drawHeadText(text: string | null) {
    if (!text) return
    this.texts.push(text)

    ctx.save()

    ctx.font = `${this.font.size}px Arial`
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'

    const textWidth = this.texts.slice(0, -1).reduce((acc, text) => (
      acc + ctx.measureText(String(text)).width
    ), 0)
    const x = canvas.width - this.padding - this.textsGap * (this.texts.length - 1) - textWidth
    const y = this.font.size + this.padding

    ctx.fillText(text, x, y)

    ctx.restore()
    
  }
}