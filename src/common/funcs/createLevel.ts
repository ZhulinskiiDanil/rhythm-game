import { Level } from "@/types";

export function createLevel(level: Level) {
  level.buttons.sort((a, b) => a.fromSecond - b.fromSecond)

  if (level.events) {
    level.events.sort((a, b) => a.fromSecond - b.fromSecond)
  }
  
  return level
}