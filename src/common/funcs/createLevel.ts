import { Level } from "@/types";

export function createLevel(data: Omit<Level, 'duration'>) {
  const level: Level = { ...data, duration: 0 }
  
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