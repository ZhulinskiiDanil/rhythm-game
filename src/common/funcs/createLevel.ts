import { Level } from "@/types";

type CreateLevelDTO = Omit<Level, 'duration' | 'id'>

export function createLevel(data: CreateLevelDTO) {
  const level: Level = {
    ...data,
    duration: 0,
    id: self.crypto.randomUUID()
  }
  
  level.buttons.sort((a, b) => a.fromSecond - b.fromSecond)
  level.duration = Math.floor(
    ((level?.buttons.reduce((acc, btn) => {
      const value = Math.max(btn.fromSecond, (btn?.toSecond || 0))
      
      return value > acc ? value : acc
    }, 0) || 0) - (level?.startFrom || 0)) * 100
  ) / 100

  if (level.events) {
    level.events.sort((a, b) => a.fromSecond - b.fromSecond)
  }
  
  return level
}