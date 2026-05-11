import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  history: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: {
      reducer(state) {
        const previousValue = state.value;
        state.value += 1;
        
        // 히스토리 추가
        state.history.push({
          id: nanoid(),
          action: 'increment',
          previousValue,
          newValue: state.value,
          timestamp: new Date().toISOString(),
        });
      },
    },
    
    decrement: {
      reducer(state) {
        const previousValue = state.value;
        state.value -= 1;
        
        // 히스토리 추가
        state.history.push({
          id: nanoid(),
          action: 'decrement',
          previousValue,
          newValue: state.value,
          timestamp: new Date().toISOString(),
        });
      },
    },
    
    incrementByAmount: {
      // prepare 함수: 액션 페이로드를 사전 처리
      prepare(amount) {
        return {
          payload: {
            amount,
            timestamp: new Date().toISOString(),
            id: nanoid(),
          },
        };
      },
      reducer(state, action) {
        const { amount, timestamp, id } = action.payload;
        const previousValue = state.value;
        state.value += amount;
        
        // 히스토리 추가 (prepare에서 생성한 메타데이터 활용)
        state.history.push({
          id,
          action: 'incrementByAmount',
          amount,
          previousValue,
          newValue: state.value,
          timestamp,
        });
      },
    },
    
    // 복잡한 리듀서: 여러 상태를 동시에 업데이트
    reset: {
      prepare() {
        return {
          payload: {
            timestamp: new Date().toISOString(),
            id: nanoid(),
          },
        };
      },
      reducer(state, action) {
        const { timestamp, id } = action.payload;
        
        // 리셋 이전 상태를 히스토리에 저장
        state.history.push({
          id,
          action: 'reset',
          previousValue: state.value,
          newValue: 0,
          timestamp,
          totalHistoryCleared: state.history.length,
        });
        
        // 상태 초기화
        state.value = 0;
        // 히스토리는 마지막 reset 액션만 남김
        state.history = [state.history[state.history.length - 1]];
      },
    },
    
    // 히스토리 관리 액션들
    clearHistory: {
      reducer(state) {
        state.history = [];
      },
    },
    
    undoLastAction: {
      reducer(state) {
        if (state.history.length > 0) {
          const lastAction = state.history[state.history.length - 1];
          
          // 마지막 액션이 reset이 아닌 경우에만 되돌리기
          if (lastAction.action !== 'reset') {
            state.value = lastAction.previousValue;
            state.history.pop(); // 마지막 히스토리 제거
          }
        }
      },
    },
  },
});

// 액션 생성자들 내보내기
export const { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  clearHistory,
  undoLastAction,
} = counterSlice.actions;

// 셀렉터들
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterHistory = (state) => state.counter.history;
export const selectRecentHistory = (state, limit = 5) => 
  state.counter.history.slice(-limit);

// 기본 리듀서 내보내기
export default counterSlice.reducer;