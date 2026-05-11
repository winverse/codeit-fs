import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import counterReducer from "@/features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});