import { createSlice } from '@reduxjs/toolkit';
import { login, logout, resetAllData } from '@/features/auth/authSlice';

const initialState = {
  nickname: '',
  bio: '',
  avatar: '',
  settings: {
    theme: 'light',
    notifications: true,
  },
  isEditing: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const { nickname, bio, avatar } = action.payload;
      state.nickname = nickname || state.nickname;
      state.bio = bio || state.bio;
      state.avatar = avatar || state.avatar;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    toggleEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    clearProfile: (state) => {
      state.nickname = '';
      state.bio = '';
      state.avatar = '';
      state.isEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인 시 기본 프로필 설정
      .addCase(login, (state, action) => {
        const user = action.payload;
        state.nickname = user.nickname || user.username;
        state.bio = user.bio || '안녕하세요!';
        state.avatar = user.avatar || '👤';
      })
      // 로그아웃 시 프로필 초기화
      .addCase(logout, (state) => {
        state.nickname = '';
        state.bio = '';
        state.avatar = '';
        state.isEditing = false;
      })
      // 전체 데이터 리셋
      .addCase(resetAllData, (state) => {
        return initialState;
      });
  },
});

export const { setProfile, updateSettings, toggleEditing, clearProfile } =
  profileSlice.actions;
export const profileReducer = profileSlice.reducer;