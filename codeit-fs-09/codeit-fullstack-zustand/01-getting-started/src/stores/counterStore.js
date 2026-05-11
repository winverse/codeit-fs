import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  count: 0,

  // 액션 (Action)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
