import { createSlice } from '@reduxjs/toolkit';

// 카운터 슬라이스 생성
const counterSlice = createSlice({
  name: 'counter', // 슬라이스 이름
  initialState: {
    value: 0, // 초기 상태
  },
  reducers: {
    // 액션 생성자와 리듀서를 한 번에 정의
    increment: (state) => {
      // Immer가 내장되어 있어서 직접 수정 가능
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// 액션 생성자들을 자동으로 생성
export const { increment, decrement, reset } = counterSlice.actions;

// 리듀서를 기본 내보내기
export const counterReducer = counterSlice.reducer;