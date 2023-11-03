import { Lobby } from '@/components/Lobby';
import * as levels from '@/levels'

const levelsList = Object.entries(levels).map(level => level[1])

export class App {
  lobby =  new Lobby()
  levels = levelsList || []

  constructor() {
    document.addEventListener('keydown', e => {
      const isUp = ['ArrowUp', 'KeyW'].includes(e.code)
      const isDown = ['ArrowDown', 'KeyS'].includes(e.code)

      if (isUp) {
        this.setActiveLevelIndex(this.lobby.activeLevelIndex - 1)
      } else if (isDown) {
        this.setActiveLevelIndex(this.lobby.activeLevelIndex + 1)
      }
    })
  }

  setActiveLevelIndex(index: number) {
    this.lobby.setActiveLevelIndex(index)
  }
  
  init() {
    this.lobby.setLevels(this.levels)
    this.lobby.render()
  }
}