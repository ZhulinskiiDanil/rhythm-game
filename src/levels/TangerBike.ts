import { LevelButton } from "@/types";
import { createLevel } from "@/common/funcs/createLevel";

const buttons: LevelButton[] = [
  { type: 'normal', fromSecond: 0.77, column: 4 },
  { type: 'normal', fromSecond: 1.05, column: 1 },
  { type: 'normal', fromSecond: 1.22, column: 4 },
  { type: 'normal', fromSecond: 1.34, column: 1 },
  { type: 'normal', fromSecond: 1.63, column: 4 },
  { type: 'normal', fromSecond: 1.91, column: 1 },
  { type: 'normal', fromSecond: 2.16, column: 4 },
  { type: 'normal', fromSecond: 2.38, column: 3 },
  { type: 'normal', fromSecond: 2.78, column: 4 },
  { type: 'normal', fromSecond: 2.60, column: 2 },
  { type: 'normal', fromSecond: 2.96, column: 1 },
  { type: 'normal', fromSecond: 3.12, column: 3 },
  { type: 'normal', fromSecond: 3.27, column: 4 },
  { type: 'normal', fromSecond: 3.41, column: 2 },
  { type: 'normal', fromSecond: 3.55, column: 3 },
  { type: 'normal', fromSecond: 3.68, column: 2 },
  { type: 'normal', fromSecond: 3.85, column: 3 },
  { type: 'normal', fromSecond: 4.00, column: 2 },
  { type: 'normal', fromSecond: 4.15, column: 3 },
  { type: 'normal', fromSecond: 4.30, column: 2 },
  { type: 'normal', fromSecond: 4.46, column: 3 },

  
  { type: 'normal', fromSecond: 5.89, column: 3 },
  { type: 'normal', fromSecond: 6.03, column: 4 },
  { type: 'normal', fromSecond: 6.17, column: 2 },
  { type: 'normal', fromSecond: 6.32, column: 1 },

  { type: 'normal', fromSecond: 6.46, column: 2 },
  { type: 'normal', fromSecond: 6.60, column: 1 },
  { type: 'normal', fromSecond: 6.75, column: 3 },
  { type: 'normal', fromSecond: 6.90, column: 4 },

  { type: 'normal', fromSecond: 7.03, column: 1 },
  { type: 'normal', fromSecond: 7.17, column: 2 },
  { type: 'normal', fromSecond: 7.32, column: 3 },
  { type: 'normal', fromSecond: 7.46, column: 4 },
  { type: 'normal', fromSecond: 7.60, column: 3 },
  { type: 'normal', fromSecond: 7.75, column: 2 },
  { type: 'normal', fromSecond: 7.89, column: 1 },
  { type: 'normal', fromSecond: 8.03, column: 3 },
  { type: 'normal', fromSecond: 8.17, column: 2 },

  { type: 'normal', fromSecond: 8.31, column: 2 },
  { type: 'normal', fromSecond: 8.40, column: 3 },
  { type: 'normal', fromSecond: 8.46, column: 4 },

  { type: 'normal', fromSecond: 8.60, column: 2 },
  { type: 'normal', fromSecond: 8.75, column: 1 },
  { type: 'normal', fromSecond: 8.88, column: 3 },
  { type: 'normal', fromSecond: 9.03, column: 4 },
  
  { type: 'normal', fromSecond: 9.17, column: 3 },
  { type: 'normal', fromSecond: 9.32, column: 2 },
  { type: 'normal', fromSecond: 9.46, column: 1 },
  { type: 'normal', fromSecond: 9.60, column: 3 },
  { type: 'normal', fromSecond: 9.75, column: 4 },
  { type: 'normal', fromSecond: 9.90, column: 3 },
  { type: 'normal', fromSecond: 10.03, column: 4 },
  { type: 'normal', fromSecond: 10.17, column: 2 },
  { type: 'normal', fromSecond: 10.31, column: 3 },
  { type: 'normal', fromSecond: 10.45, column: 4 },
  { type: 'normal', fromSecond: 10.60, column: 2 },
  { type: 'normal', fromSecond: 10.75, column: 1 },
  { type: 'normal', fromSecond: 10.88, column: 3 },
  { type: 'normal', fromSecond: 11.03, column: 2 },
  { type: 'normal', fromSecond: 11.17, column: 1 },
  { type: 'normal', fromSecond: 11.31, column: 3 },
  { type: 'normal', fromSecond: 11.45, column: 4 },
  { type: 'normal', fromSecond: 11.60, column: 3 },
  { type: 'normal', fromSecond: 11.74, column: 4 },
  { type: 'normal', fromSecond: 11.88, column: 2 },
  { type: 'normal', fromSecond: 12.02, column: 3 },
  { type: 'normal', fromSecond: 12.17, column: 4 },
  { type: 'normal', fromSecond: 12.31, column: 2 },
  { type: 'normal', fromSecond: 12.45, column: 1 },
  { type: 'normal', fromSecond: 12.60, column: 3 },
  { type: 'normal', fromSecond: 12.74, column: 2 },
  { type: 'normal', fromSecond: 12.88, column: 1 },
  { type: 'normal', fromSecond: 13.03, column: 3 },
  { type: 'normal', fromSecond: 13.17, column: 4 },
  { type: 'normal', fromSecond: 13.31, column: 3 },
  { type: 'normal', fromSecond: 13.46, column: 4 },
  { type: 'normal', fromSecond: 13.60, column: 2 },
  { type: 'normal', fromSecond: 13.74, column: 3 },
  { type: 'normal', fromSecond: 13.88, column: 4 },
  
  { type: 'normal', fromSecond: 14.42, column: 1 },
  { type: 'normal', fromSecond: 14.48, column: 2 },
  { type: 'normal', fromSecond: 14.54, column: 1 },
  { type: 'normal', fromSecond: 14.60, column: 2 },

  { type: 'normal', fromSecond: 14.74, column: 4 },
  { type: 'normal', fromSecond: 14.80, column: 3 },
  { type: 'normal', fromSecond: 14.86, column: 4 },
  { type: 'normal', fromSecond: 14.92, column: 3 },

  { type: 'hold', fromSecond: 15.02, toSecond: 15.46, column: 2 },
  { type: 'normal', fromSecond: 15.10, column: 3 },
  { type: 'normal', fromSecond: 15.26, column: 1 },
  { type: 'normal', fromSecond: 15.46, column: 3 },
  { type: 'hold', fromSecond: 15.60, toSecond: 15.70, column: 1 },
  { type: 'hold', fromSecond: 15.75, toSecond: 15.85, column: 2 },
  { type: 'hold', fromSecond: 15.60, toSecond: 16.03, column: 4 },
  { type: 'normal', fromSecond: 15.95, column: 1 },
  { type: 'hold', fromSecond: 16.17, toSecond: 16.61, column: 3 },
  
  { type: 'normal', fromSecond: 16.80, column: 1 },

  { type: 'normal', fromSecond: 16.95, column: 3 },
  { type: 'normal', fromSecond: 17.05, column: 2 },

  { type: 'normal', fromSecond: 17.44, column: 1 },
  { type: 'normal', fromSecond: 17.54, column: 2 },
  { type: 'normal', fromSecond: 17.74, column: 3 },
  { type: 'normal', fromSecond: 17.84, column: 4 },
  { type: 'normal', fromSecond: 17.95, column: 3 },
  { type: 'normal', fromSecond: 18.05, column: 2 },
  { type: 'normal', fromSecond: 18.15, column: 3 },
]

export const TangerBike = createLevel({
  name: 'Tanger - BIKE',
  columns: 4,
  songPath: '/tracks/tanger-bike.mp3',
  speed: 1, // 1
  startFrom: 0,
  ignoreLose: false,
  buttons,
  events: [
    { speed: 0, fromSecond: 0 },
    {
      speed: 3,
      fromSecond: 0,
      transition: { duration: 4000, timingFunction: 'ease' }
    }
  ]
})