import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "Navigate",
  initialState: {
    notification: false,
    messages: false,
    theme: false,
    favorites: false,
    settings: false,
  },
  reducers: {
    Notification: (state, action) => {
      state.notification = !state.notification;
    },
    Messages: (state, action) => {
      state.messages = !state.messages;
    },
    Theme: (state, action) => {
      state.theme = true;
    },
    Favorite: (state, action) => {
      state.theme = !state.favorites;
    },
    SettingsRedux: (state, action) => {
      state.settings = !state.settings;
    },
    closeTheme: (state) => {
      state.theme = false;
    },
  },
});

export const {
  closeTheme,
  Notification,
  Theme,
  Messages,
  Favorite,
  SettingsRedux,
} = userSlice.actions;
export default userSlice.reducer;
