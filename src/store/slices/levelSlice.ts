import { Level } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const levelSlice = createSlice({
  name: 'level',
  initialState: {
    data: null as Level | null
  },
  reducers: {
    setLevel(state, action: { payload: { level: Level; } }) {
      if (action.payload.level) {
        state.data = action.payload.level
      }
    }
  }
})

export const {
  reducer: levelReducer,
  actions: levelActions
} = levelSlice