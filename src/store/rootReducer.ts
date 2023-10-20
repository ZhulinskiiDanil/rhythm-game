import { levelReducer } from "./slices/levelSlice";

export const rootReducer = {
  level: levelReducer
}

export * from './slices/levelSlice'