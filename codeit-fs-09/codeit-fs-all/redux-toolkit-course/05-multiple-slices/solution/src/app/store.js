import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/usersSlice";
import postsReducer from "@/features/posts/postsSlice";
import commentsReducer from "@/features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Store 타입 추론을 위한 유틸리티
export const selectRootState = (state) => state;