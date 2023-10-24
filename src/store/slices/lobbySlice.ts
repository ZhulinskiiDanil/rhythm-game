import * as levels from '@/levels'
import { Level } from '@/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const levelsList = Object.entries(levels).map(level => level[1])

const lobbySlice = createSlice({
  name: 'lobby',
  initialState: {
    isActive: false,
    levels: levelsList
  },
  reducers: {
    setLevels(state, action: PayloadAction<{ levels: Level[] }>) {
      if (Array.isArray(action.payload.levels)) {
        state.levels = action.payload.levels
      }
    },
    setVisibility(state, action: PayloadAction<{ isVisible: boolean }>) {
      if (typeof action.payload.isVisible === 'boolean') {
        state.isActive = action.payload.isVisible
      }
    }
  }
})

export const {
  reducer: lobbyReducer,
  actions: lobbyActions
} = lobbySlice