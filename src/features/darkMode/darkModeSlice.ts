import { createSlice } from "@reduxjs/toolkit";
import { DarkModeState, rootState } from "../../types";

const initialState: DarkModeState = {
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;

export const selectDarkMode = (state: rootState) => state.darkMode.isDarkMode;
