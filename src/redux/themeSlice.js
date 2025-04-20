import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false, // Завантажуємо тему
};

export const themeSlice = createSlice({
  name: "theme",
  initialState, // Використовуємо `initialState` з локал стореджу
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode; // Змінюємо стан теми
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode)); // Зберігаємо зміну
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
