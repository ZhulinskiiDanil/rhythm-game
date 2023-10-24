export type LevelButton = {
  fromSecond: number
  column: number
  type: 'normal'
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