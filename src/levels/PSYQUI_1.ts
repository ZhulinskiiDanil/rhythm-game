import { Level } from "@/types";

const buttons: Level['buttons'] = [
  { type: 'normal', fromSecond: 57.33, column: 1 },
  { type: 'hold', fromSecond: 57.33, toSecond: 58.16, column: 3 },

  { type: 'normal', fromSecond: 57.68, column: 2 },
  { type: 'normal', fromSecond: 58.16, column: 4 },
  { type: 'normal', fromSecond: 58.54, column: 3 },

  { type: 'normal', fromSecond: 58.89, column: 2 },
  { type: 'hold', fromSecond: 58.89, toSecond: 60.00, column: 4 },

  { type: 'normal', fromSecond: 59.29, column: 3 },
  { type: 'normal', fromSecond: 59.66, column: 1 },
  { type: 'normal', fromSecond: 60.03, column: 2 },

  { type: 'normal', fromSecond: 60.37, column: 1 },
  { type: 'hold', fromSecond: 60.37, toSecond: 61.50, column: 4 },

  { type: 'normal', fromSecond: 60.74, column: 2 },
  { type: 'normal', fromSecond: 61.13, column: 1 },
  { type: 'normal', fromSecond: 61.50, column: 3 },

  { type: 'normal', fromSecond: 61.89, column: 2, },
  { type: 'hold', fromSecond: 61.89, toSecond: 62.99, column: 4 },
  
  { type: 'normal', fromSecond: 62.26, column: 3 },
  { type: 'normal', fromSecond: 62.64, column: 1 },
  { type: 'normal', fromSecond: 62.99, column: 2 },

  { type: 'normal', fromSecond: 63.37, column: 1 },
  { type: 'hold', fromSecond: 63.37, toSecond: 64.49, column: 4 },

  { type: 'normal', fromSecond: 63.76, column: 2 },
  { type: 'normal', fromSecond: 64.11, column: 1 },
  { type: 'normal', fromSecond: 64.49, column: 3 },

  { type: 'normal', fromSecond: 64.84, column: 2, },
  { type: 'hold', fromSecond: 64.84, toSecond: 65.96, column: 4 },

  { type: 'normal', fromSecond: 65.22, column: 3 },
  { type: 'normal', fromSecond: 65.60, column: 1 },
  { type: 'normal', fromSecond: 65.96, column: 2 },

  { type: 'normal', fromSecond: 66.33, column: 2 },
  { type: 'hold', fromSecond: 66.33, toSecond: 67.64, column: 3 },

  { type: 'hold', fromSecond: 69.47, toSecond: 69.60, column: 4 },
  { type: 'hold', fromSecond: 69.80, toSecond: 69.94, column: 2 },
  { type: 'hold', fromSecond: 70.16, toSecond: 70.35, column: 3 },
  { type: 'hold', fromSecond: 70.55, toSecond: 70.70, column: 1 },
  { type: 'hold', fromSecond: 70.90, toSecond: 71.10, column: 4 },
  { type: 'hold', fromSecond: 71.30, toSecond: 71.48, column: 2 },
  { type: 'hold', fromSecond: 71.68, toSecond: 71.80, column: 3 },
  { type: 'hold', fromSecond: 72.00, toSecond: 72.40, column: 1 },

  { type: 'normal', fromSecond: 72.60, column: 1 },
  { type: 'normal', fromSecond: 72.77, column: 2 },
  { type: 'normal', fromSecond: 72.96, column: 3 },
  { type: 'normal', fromSecond: 73.12, column: 4 },
  { type: 'normal', fromSecond: 73.30, column: 3 },
  { type: 'normal', fromSecond: 73.49, column: 2 },
  { type: 'normal', fromSecond: 73.64, column: 1 },
  { type: 'normal', fromSecond: 73.81, column: 3 },
  { type: 'normal', fromSecond: 74.20, column: 2 },
  { type: 'normal', fromSecond: 74.59, column: 3 },
  { type: 'normal', fromSecond: 74.78, column: 1 },
  { type: 'normal', fromSecond: 74.92, column: 4 },
  { type: 'normal', fromSecond: 75.09, column: 3 },
];

export const PSYQUI_1: Level = {
  name: 'PSYQUI - ヒステリックナイトガール',
  columns: 4,
  songPath: '/tracks/PSYQUI - ヒステリックナイトガール (Awakening) (ft. SUCH).mp3',
  speed: 2.5,
  ignoreLose: false,
  startFrom: 57,
  buttons
}