import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  history: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.history.push(`Incremented to ${state.value}`);
    },
    decrement: (state) => {
      state.value -= 1;
      state.history.push(`Decremented to ${state.value}`);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.history.push(`Incremented by ${action.payload} to ${state.value}`);
    },
    reset: (state) => {
      state.value = 0;
      state.history.push("Reset to 0");
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Selectors
export const selectCounter = (state) => state.counter;
export const selectCounterValue = (state) => state.counter.value;
export const selectCounterHistory = (state) => state.counter.history;

export default counterSlice.reducer;