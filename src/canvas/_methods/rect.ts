import { FindCanvas } from "../types";

export function rect(canvas: FindCanvas) {
  return canvas.getBoundingClientRect()
}