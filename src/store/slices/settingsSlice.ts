import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    controllers: ["KeyD", "KeyF", "KeyJ", "KeyK"] as const
  },
  reducers: {
    
  }
})

export const {
  reducer: settingsReducer,
  actions: settingsActions
} = settingsSlice