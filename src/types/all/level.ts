export type LevelButton = {
  fromSecond: number
  toSecond?: number
  column: number
  type: 'normal' | 'hold'
}

export type Level = {
  name: string
  columns: number
  songPath: string
  ignoreLose?: boolean
  startFrom?: number
  speed: number
  buttons: LevelButton[]
}