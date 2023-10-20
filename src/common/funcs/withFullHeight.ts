import { canvas, onResize } from "@/canvas";

export function withFullHeight(obj: {
  [key: string]: any; height: number
}) {
  obj.height = canvas.height

  onResize(() => {
    obj.height = canvas.height
  })
}