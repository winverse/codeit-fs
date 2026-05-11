# 2. configureStore 기초

이 챕터에서는 Redux Toolkit의 `configureStore` 함수를 사용하여 간단하고 강력한 Redux 스토어를 설정하는 방법을 학습합니다. 전통적인 Redux 스토어 설정과 비교하여 얼마나 간편해졌는지 체험해봅시다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있습니다:

- `configureStore` 함수의 기본 사용법 이해하기
- 자동 미들웨어 설정 (Redux DevTools, thunk 등) 활용하기
- TypeScript 타입 정의 (`RootState`, `AppDispatch`) 설정하기
- 기본 카운터 앱의 Redux 스토어 구성하기

## 주요 개념

### configureStore의 장점

`configureStore`는 전통적인 `createStore`를 대체하는 Redux Toolkit의 핵심 함수입니다:

1. **자동 미들웨어 설정**: redux-thunk가 기본으로 포함
2. **Redux DevTools 자동 연결**: 별도 설정 없이 사용 가능
3. **개발 모드 검증**: 직렬화 가능성과 불변성 검사
4. **간편한 reducer 결합**: `combineReducers` 자동 호출

### 기본 구조

```javascript
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // 여기에 slice reducer들을 추가
  },
});
```

💡 **심화 학습: 미들웨어란?**
미들웨어는 액션이 디스패치된 후 reducer에 도달하기 전에 실행되는 함수입니다. 비동기 작업, 로깅, 에러 처리 등에 활용됩니다. `configureStore`는 개발에 필요한 미들웨어들을 자동으로 설정해줍니다.

## 강의 시연 스크립트

### 1단계: 기본 카운터 slice 생성

먼저 간단한 카운터 slice를 만들어봅시다.

`src/features/counter/counterSlice.js` 파일을 생성합니다:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
```

### 2단계: configureStore로 스토어 설정

`src/app/store.js` 파일을 생성합니다:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// TypeScript를 위한 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3단계: 타입 안전한 훅 생성 (TypeScript)

`src/app/hooks.js` 파일을 생성합니다:

```javascript
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 타입이 적용된 useDispatch와 useSelector 훅
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### 4단계: Provider로 앱 감싸기

`src/main.jsx` 파일을 다음과 같이 수정합니다:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 5단계: 카운터 컴포넌트 생성

`src/features/counter/Counter.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <button className={styles.button} onClick={() => dispatch(increment())}>
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          type="number"
          id="incrementAmount"
          defaultValue="2"
        />
        <button
          className={styles.button}
          onClick={() => {
            const amount = Number(
              document.getElementById("incrementAmount").value
            );
            dispatch(incrementByAmount(amount));
          }}
        >
          Add Amount
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

### 6단계: 컴포넌트 index 파일 생성

`src/features/counter/index.js` 파일을 생성합니다:

```javascript
export { Counter } from "./Counter";
export { default as counterReducer } from "./counterSlice";
export * from "./counterSlice";
```

### 7단계: App 컴포넌트 업데이트

`src/App.jsx` 파일을 다음과 같이 수정합니다:

```javascript
import { Counter } from "@/features/counter";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>Redux Toolkit Counter</h1>
        <p>configureStore 기초 학습</p>
        <Counter />
      </header>
    </div>
  );
}
```

### 8단계: DevTools 확인

브라우저에서 Redux DevTools Extension을 열어 다음을 확인해봅시다:

1. 액션 디스패치 시 상태 변화 관찰
2. Time-travel debugging 기능 사용
3. 액션 타입과 페이로드 확인
4. 상태 트리 구조 파악

## 챌린지 과제

### 미션

`challenge` 폴더에서 다음 과제를 수행해보세요:

1. **설정 관리 slice 추가하기**

   - 테마 (light/dark), 언어 (ko/en), 폰트 크기 설정을 관리하는 slice 생성
   - configureStore에 새로운 reducer 추가
   - 설정 변경 UI 컴포넌트 구현

2. **스토어 구조 최적화하기**
   - 각 feature별로 폴더 구조 정리
   - TypeScript 타입 정의 완성
   - 적절한 초기값과 validation 추가

### 확인하기

- [ ] 카운터 증가/감소 기능이 정상 작동하는가?
- [ ] 임의의 숫자로 증가 기능이 정상 작동하는가?
- [ ] 리셋 기능이 정상 작동하는가?
- [ ] Redux DevTools에서 모든 액션을 추적할 수 있는가?
- [ ] 설정 slice가 정상적으로 추가되었는가?
- [ ] TypeScript 타입 에러가 없는가?
- [ ] 빌드가 성공적으로 완료되는가?
