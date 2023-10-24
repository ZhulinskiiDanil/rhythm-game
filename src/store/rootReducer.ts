import { levelReducer } from "./slices/levelSlice";
import { lobbyReducer } from "./slices/lobbySlice";

export const rootReducer = {
  level: levelReducer,
  lobby: lobbyReducer
}

export * from './slices/levelSlice'
export * from './slices/lobbySlice'