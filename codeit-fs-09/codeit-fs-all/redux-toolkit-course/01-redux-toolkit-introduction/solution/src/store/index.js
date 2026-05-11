import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice.js';

// Redux Toolkit의 configureStore 사용
export const store = configureStore({
  reducer: {
    counter: counterReducer, // 카운터 리듀서 등록
  },
  // 미들웨어는 자동으로 설정됨 (redux-thunk, DevTools 등)
});