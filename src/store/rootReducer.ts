import { levelReducer } from "./slices/levelSlice";
import { lobbyReducer } from "./slices/lobbySlice";
import { settingsReducer } from "./slices/settingsSlice";

export const rootReducer = {
  level: levelReducer,
  lobby: lobbyReducer,
  settings: settingsReducer
}

export * from './slices/levelSlice'
export * from './slices/lobbySlice'
export * from './slices/settingsSlice'