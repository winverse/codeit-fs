import { createSlice } from '@reduxjs/toolkit';
import { logout } from '@/features/auth/authSlice';

const initialState = {
  nickname: '',
  bio: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.nickname = action.payload.nickname;
      state.bio = action.payload.bio;
    },
    clearProfile: (state) => {
      state.nickname = '';
      state.bio = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.nickname = '';
      state.bio = '';
    });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
