import { MainEntitie } from "@/entities/main"
import { ctx } from "@/canvas"

// Methods
import { withFullWidth } from "@/common/funcs/withFullWidth"
import { withFullHeight } from "@/common/funcs/withFullHeight";

export class Background extends MainEntitie {
  color: string

  constructor() {
    super();
    withFullHeight(this)
    withFullWidth(this)

    this.color = "#1e1e1e"
  }

  draw() {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }
}