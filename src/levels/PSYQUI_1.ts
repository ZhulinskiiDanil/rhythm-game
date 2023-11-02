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