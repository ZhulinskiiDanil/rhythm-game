import './index.css'

// Types
import { Level } from '@/types'

// Redux
import { useDispatch } from '@/hooks/useDispatch'
import { levelActions } from '@/store'

const dispatch = useDispatch()

export class LevelComponent {
  title = ''
  percent = 0
  data: Level | null = null
  isActive = false
  onClick: () => void = () => {}

  constructor({ title, data, percent, isActive, onClick }: {
    title: string
    data: Level
    percent: number
    isActive?: boolean
    onClick: () => void
  }) {
    this.title = title
    this.percent = percent
    this.data = data
    this.isActive = !!isActive

    if (onClick instanceof Function) {
      this.onClick = onClick
    }
  }

  element() {
    const level = document.createElement('div')
    level.addEventListener('click', this.onClick)
    level.classList.add('level')

    if (this.isActive) {
      level.classList.add('active')
    }

    level.innerHTML = `
      <div class="data">
        <div class="title">
          ${this.title}
        </div>
        <div class="duration">
          Duration: ${this.data?.duration}s
        </div>
      </div>
      <div class="percent">
        ${this.percent}%
      </div>
    `.trim()

    return level
  }
}

export class Lobby {
  uuid = 'abbe7b4f-587a-4a99-8234-28b003016c88'
  selector = 'Lobby'
  levels: LevelComponent[] = []
  activeLevelIndex = 0
  rendered = false

  constructor() {
    document.addEventListener('keydown', e => {
      const activeLevel = this.levels.find(level => level.isActive)

      if (e.code === 'Enter' && activeLevel) {
        activeLevel.onClick()
      }
    })
  }

  hide() {
    const elm = this.component()
    if (elm) elm.classList.add('hidden')
  }

  show() {
    const elm = this.component()
    if (elm) elm.classList.remove('hidden')
  }

  component() {
    return document.querySelector(`[data-uuid~=${this.uuid}]`)
  }

  render() {
    const elm = this.element()

    if (elm) {
      elm.replaceWith(this.levelsListElm(this.levels))
    }

    this.rendered = true
  }

  rerender() {
    if (this.rendered) {
      this.rerenderLevels()
      this.remove()
      this.render()
    }
  }

  remove() {
    const renderedComponent = document.querySelector('.levels')
  
    if (renderedComponent) {
      renderedComponent.replaceWith(
        document.createElement(this.selector)
      )
    }
  }

  element() {
    return document.querySelector(this.selector || '')
  }

  rerenderLevels() {
    this.levels.forEach((elm, index) => {
      elm.isActive = this.activeLevelIndex === index
    })
  }

  setLevels(levels: Level[]) {
    this.levels = levels.map((level, index) => (
      new LevelComponent({
        title: level.name,
        data: level,
        percent: 0,
        isActive: this.activeLevelIndex === index,
        onClick: () => {
          dispatch(levelActions.setLevel({ level }))

          this.hide()
        }
      })
    ))
  }
  
  setActiveLevelIndex(index: number) {
    if (index >= 0 && index < this.levels.length) {
      this.activeLevelIndex = index
      this.rerender()
    }
  }

  levelsListElm(levels: LevelComponent[]) {
    const levelsElm = document.createElement('div')
    levelsElm.setAttribute('data-uuid', this.uuid)
    levelsElm.classList.add('levels')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.innerText = `Официальные уровни (${levels.length})`
    levelsElm.appendChild(title)

    for (let level of levels) {
      levelsElm.appendChild(level.element())
    }

    return levelsElm
  }
}