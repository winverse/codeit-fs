import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice.js';

// configureStore의 다양한 옵션들을 살펴보자
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  // 기본적으로 다음 미들웨어들이 자동으로 포함됨:
  // - redux-thunk (비동기 액션 처리)
  // - immutableCheck (개발 모드: 불변성 검사)
  // - serializableCheck (개발 모드: 직렬화 가능성 검사)
  // - actionCreatorCheck (개발 모드: 액션 생성자 검사)
  
  // Redux DevTools Extension은 자동으로 활성화됨 (프로덕션에서는 비활성화)
  
  // 추가 옵션들 (필요시 사용):
  // preloadedState: {}, // 초기 상태
  // enhancers: [], // 추가 store enhancer
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // 미들웨어 커스터마이징
  // devTools: process.env.NODE_ENV !== 'production', // DevTools 설정
});

// 타입 정의 (TypeScript 사용시 필요)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;