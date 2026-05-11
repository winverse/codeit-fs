import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/authSlice';
import { profileReducer } from '@/features/profile/profileSlice';
import { notificationsReducer } from '@/features/notifications/notificationsSlice';
import { postsReducer } from '@/features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationsReducer,
    posts: postsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});