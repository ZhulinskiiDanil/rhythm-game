import './index.css'
import * as levels from '@/levels'

// Types
import { Level } from '@/types'

// Redux
import { useDispatch } from '@/hooks/useDispatch'
import { levelActions } from '@/store'

const dispatch = useDispatch()
const levelsList = Object.entries(levels).map(level => level[1])

export class LevelComponent {
  title: string = ''
  percent: number = 0
  data: Level | null = null
  onClick: () => void = () => {}

  constructor({ title, data, percent, onClick }: {
    title: string,
    data: Level,
    percent: number,
    onClick: () => void
  }) {
    this.title = title
    this.percent = percent
    this.data = data

    if (onClick instanceof Function) {
      this.onClick = onClick
    }
  }

  element() {
    const level = document.createElement('div')
    level.addEventListener('click', this.onClick)
    level.classList.add('level')

    const levelDuration = (
      this.data?.buttons.reduce((acc, btn) => (
        btn.fromSecond > acc ? btn.fromSecond : acc
      ), 0) || 0
    ) - (this.data?.startFrom || 0)

    level.innerHTML = `
      <div class="data">
        <div class="title">
          ${this.title}
        </div>
        <div class="duration">
          Duration: ${Math.floor(levelDuration * 10) / 10}s
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
    const levelsToRender = levelsList.map(level => (
      new LevelComponent({
        title: level.name,
        data: level,
        percent: 0,
        onClick: () => {
          dispatch(levelActions.setLevel({ level }))

          this.hide()
        }
      })
    ))

    if (elm) {
      elm.replaceWith(this.levelsListElm(levelsToRender))
    }
  }

  element() {
    return document.querySelector(this.selector || '')
  }

  levelsListElm(levels: LevelComponent[]) {
    const levelsElm = document.createElement('div')
    levelsElm.setAttribute('data-uuid', this.uuid)
    levelsElm.classList.add('levels')

    for (let level of levels) {
      levelsElm.appendChild(level.element())
    }

    return levelsElm
  }
}