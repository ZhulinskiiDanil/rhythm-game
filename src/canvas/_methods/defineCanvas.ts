import { FindCanvas } from "../types"
import { defineSizes } from "./defineSizes"

const resizeCallbacks: (() => void)[] = []

export function defineCanvas(
  selector: string
): {
  canvas: FindCanvas
  ctx: CanvasRenderingContext2D
  onResize: (cb: () => void) => any
} {
  const defaultCanvas = document.createElement('canvas')
  const canvas = (document.querySelector(selector) || defaultCanvas) as FindCanvas
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  defineSizes(canvas)

  window.addEventListener('resize', () => {
    // Re define sizes
    defineSizes(canvas)

    resizeCallbacks.forEach(cb => cb())
  })

  function onResize(cb: () => void) {
    resizeCallbacks.push(cb)
  }

  return { canvas, ctx, onResize }
}