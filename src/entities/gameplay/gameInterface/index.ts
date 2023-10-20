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
  }

  setCombo(combo: number) {
    this.combo = combo;
    
    if (combo > this.maxCombo) {
      this.maxCombo = combo
    }
  }

  draw() {
    const duration = this.getDuration()

    this.drawShadow()
    this.initHeadTexts()
    this.drawHeadText('Pressed: ' + this.pressedKeys + '/' + this.keysCount)
    this.drawHeadText('Max combo: ' + this.maxCombo)
    this.drawHeadText('Combo: ' + this.combo)
    this.drawHeadText(duration + 's')
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