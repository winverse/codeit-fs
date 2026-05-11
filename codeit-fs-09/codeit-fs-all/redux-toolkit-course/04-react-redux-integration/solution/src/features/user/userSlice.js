import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    email: "",
    avatar: "",
  },
  preferences: {
    theme: "light",
    language: "ko",
    notifications: true,
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    login: (state, action) => {
      state.profile = action.payload.profile;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.profile = { name: "", email: "", avatar: "" };
      state.isLoggedIn = false;
    },
    toggleTheme: (state) => {
      state.preferences.theme =
        state.preferences.theme === "light" ? "dark" : "light";
    },
  },
});

export const { updateProfile, updatePreferences, login, logout, toggleTheme } =
  userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectUserProfile = (state) => state.user.profile;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectTheme = (state) => state.user.preferences.theme;

export default userSlice.reducer;