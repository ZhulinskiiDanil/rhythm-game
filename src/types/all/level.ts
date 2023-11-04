import { IGetSmoothValueSettings } from '@/common/funcs/getSmoothValue/index';

export type LevelButton = {
  fromSecond: number
  toSecond?: number
  column: number
  type: 'normal' | 'hold'
}

export type LevelEvent = {
  fromSecond: number
  
  speed?: number
  transition?: Omit<IGetSmoothValueSettings, 'fromTo'>
}

export type Level = {
  name: string
  columns: number
  songPath: string
  ignoreLose?: boolean
  startFrom?: number
  speed: number
  buttons: LevelButton[]
  events?: LevelEvent[]
  duration: number
}