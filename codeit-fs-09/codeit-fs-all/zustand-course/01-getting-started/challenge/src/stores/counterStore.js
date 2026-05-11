// TODO: zustand에서 create 함수를 import하세요
// import { create } from '???';

// TODO: Zustand 스토어를 생성하세요
// export const useCounterStore = create((???) => ({
//   // TODO: 초기 상태를 정의하세요
//   // count: ???,

//   // TODO: 카운터를 1 증가시키는 액션을 만드세요
//   // increment: () => set(???),

//   // TODO: 카운터를 1 감소시키는 액션을 만드세요
//   // decrement: () => set(???),

//   // TODO: 카운터를 0으로 초기화하는 액션을 만드세요
//   // reset: () => set(???),
// }));

// 💡 힌트:
// 1. create 함수는 상태와 액션을 정의하는 함수를 받습니다
// 2. set 함수를 사용해서 상태를 업데이트할 수 있습니다
// 3. 현재 상태에 접근하려면 set((state) => ({ ... })) 패턴을 사용하세요
// 4. 새로운 값으로 덮어쓰려면 set({ ... }) 패턴을 사용하세요

/* 
완성 예시:
export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
*/
