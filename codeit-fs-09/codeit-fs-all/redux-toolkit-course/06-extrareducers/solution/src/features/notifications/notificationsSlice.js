import { createSlice } from '@reduxjs/toolkit';
import { login, logout, resetAllData } from '@/features/auth/authSlice';

const initialState = {
  items: [],
  unreadCount: 0,
  isEnabled: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        timestamp: new Date().toISOString(),
        read: false,
      };
      state.items.unshift(notification);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.items.find((item) => item.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((item) => {
        item.read = true;
      });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
    toggleEnabled: (state) => {
      state.isEnabled = !state.isEnabled;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인 시 환영 알림 추가
      .addCase(login, (state, action) => {
        const welcomeNotification = {
          id: Date.now(),
          message: `환영합니다, ${action.payload.username}님!`,
          type: 'success',
          timestamp: new Date().toISOString(),
          read: false,
        };
        state.items.unshift(welcomeNotification);
        state.unreadCount += 1;
      })
      // 로그아웃 시 알림 초기화
      .addCase(logout, (state) => {
        state.items = [];
        state.unreadCount = 0;
      })
      // 전체 데이터 리셋
      .addCase(resetAllData, (state) => {
        return initialState;
      });
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  toggleEnabled,
} = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;