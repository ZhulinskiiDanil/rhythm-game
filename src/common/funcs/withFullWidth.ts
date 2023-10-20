import { canvas, onResize } from "@/canvas";

export function withFullWidth(obj: {
  [key: string]: any; width: number
}) {
  obj.width = canvas.width

  onResize(() => {
    obj.width = canvas.width
  })
}