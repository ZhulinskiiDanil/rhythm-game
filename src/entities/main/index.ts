export class MainEntitie {
  public width: number = 0
  public height: number = 0
  public x: number = 0
  public y: number = 0

  get rect() {
    return {
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y
    }
  }
}