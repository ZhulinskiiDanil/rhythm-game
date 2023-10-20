import { FindCanvas } from "../types";

export function defineSizes(canvas: FindCanvas) {
  canvas.width = Math.min(window.innerWidth, 500)
  canvas.height = window.innerHeight
}