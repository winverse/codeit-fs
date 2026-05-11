import { createSlice, createAction } from '@reduxjs/toolkit';

// 공유 액션 정의 (다른 slice에서도 사용)
export const resetAllData = createAction('app/resetAllData');

const initialState = {
  isLoggedIn: false,
  user: null,
  loginCount: 0,
  lastLoginTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loginCount += 1;
      state.lastLoginTime = new Date().toISOString();
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // resetAllData 액션에 반응
    builder.addCase(resetAllData, (state) => {
      return initialState;
    });
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export const authReducer = authSlice.reducer;