import { Background } from "@/entities/background";
import { canvas, ctx } from "./canvas";
import { Gameplay } from "./entities/gameplay";

export class Scene {
  background = new Background()
  gameplay = new Gameplay()

  constructor() {
    document.addEventListener('keydown', this.playLevel.bind(this))
    document.addEventListener('mousedown', this.playLevel.bind(this))
  }

  playLevel() {
    if (!this.gameplay.isPlayed && this.gameplay.song) {
      this.gameplay.play()
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    for (let key in this) {
      const elm = this[key] as { draw?: () => void }
      
      if (elm?.draw) {
        elm.draw()
      }
    }
  }
}