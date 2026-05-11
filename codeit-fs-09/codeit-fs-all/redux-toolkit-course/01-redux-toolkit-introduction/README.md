# 1. Redux Toolkit 소개

이 챕터에서는 전통적인 Redux의 문제점을 파악하고, Redux Toolkit이 어떻게 이러한 문제들을 해결하는지 학습합니다. 두 접근 방식의 차이점을 직접 비교해보며 Redux Toolkit의 필요성을 체감해봅시다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있습니다:

- 전통적인 Redux의 보일러플레이트 문제점 이해하기
- Redux Toolkit이 해결하는 핵심 문제들 파악하기
- Redux Toolkit 설치 및 기본 설정하기
- 두 방식의 코드 작성량과 복잡성 비교하기

## 주요 개념

### 전통적인 Redux의 문제점

전통적인 Redux 사용 시 발생하는 주요 문제점들:

1. **과도한 보일러플레이트 코드**: Action types, action creators, reducers 등을 모두 수동으로 작성
2. **복잡한 스토어 설정**: 미들웨어, DevTools 등을 수동으로 설정
3. **불변성 관리의 어려움**: 객체나 배열 업데이트 시 spread 연산자 남용
4. **타입 안전성 부족**: TypeScript 사용 시 복잡한 타입 정의 필요

### Redux Toolkit의 해결책

Redux Toolkit은 다음과 같이 문제들을 해결합니다:

1. **`createSlice`**: Action types와 creators를 자동 생성
2. **`configureStore`**: 미들웨어와 DevTools 자동 설정
3. **Immer 내장**: 불변성을 자동으로 관리
4. **타입 추론**: TypeScript 타입을 자동으로 생성

💡 **심화 학습: Immer란?**
Immer는 불변성을 유지하면서도 마치 가변적인 코드처럼 작성할 수 있게 해주는 라이브러리입니다. Redux Toolkit에 내장되어 있어 `state.count++` 같은 직관적인 코드 작성이 가능합니다.

## 강의 시연 스크립트

### 1단계: 전통적인 Redux 카운터 구현

먼저 `starter` 프로젝트에서 전통적인 Redux로 간단한 카운터를 구현해봅시다.

#### Action Types 정의

`src/store/actionTypes.js` 파일을 생성하고 다음을 입력합니다:

```javascript
export const INCREMENT = "counter/increment";
export const DECREMENT = "counter/decrement";
export const INCREMENT_BY_AMOUNT = "counter/incrementByAmount";
```

#### Action Creators 정의

`src/store/actions.js` 파일을 생성합니다:

```javascript
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT } from "./actionTypes";

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}

export function incrementByAmount(amount) {
  return {
    type: INCREMENT_BY_AMOUNT,
    payload: amount,
  };
}
```

#### Reducer 정의

`src/store/reducer.js` 파일을 생성합니다:

```javascript
import { INCREMENT, DECREMENT, INCREMENT_BY_AMOUNT } from "./actionTypes";

const initialState = {
  value: 0,
};

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1,
      };
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    default:
      return state;
  }
}
```

#### 스토어 설정

`src/store/store.js` 파일을 생성합니다:

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { counterReducer } from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  counterReducer,
  composeEnhancers(applyMiddleware(thunk))
);
```

### 2단계: Redux Toolkit으로 리팩터링

이제 같은 기능을 Redux Toolkit으로 구현해봅시다.

#### Redux Toolkit 설치

터미널에서 다음 명령어를 실행합니다:

```bash
npm install @reduxjs/toolkit react-redux
```

#### Slice 생성

`src/store/counterSlice.js` 파일을 생성합니다:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
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
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 스토어 설정 (Redux Toolkit)

`src/store/store.js` 파일을 다음과 같이 수정합니다:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

### 3단계: 컴포넌트에서 사용

`src/components/Counter/Counter.jsx` 파일을 생성합니다:

```javascript
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/store/counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

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
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Add 5
        </button>
      </div>
    </div>
  );
}
```

### 4단계: App 컴포넌트 업데이트

`src/App.jsx` 파일을 다음과 같이 수정합니다:

```javascript
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Counter } from "@/components/Counter";
import "./App.css";

export function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Redux Toolkit Counter</h1>
          <Counter />
        </header>
      </div>
    </Provider>
  );
}
```

## 챌린지 과제

### 미션

`challenge` 폴더에서 다음 과제를 수행해보세요:

1. **전통적인 Redux 방식으로 구현된 할 일 관리자를 Redux Toolkit으로 마이그레이션하기**

   - 할 일 추가, 삭제, 완료 토글 기능이 있는 간단한 앱이 제공됩니다
   - 기존의 action types, action creators, reducer를 하나의 slice로 통합해보세요

2. **코드 비교 분석하기**
   - 마이그레이션 전후의 코드 라인 수 비교
   - 파일 개수와 복잡성 비교
   - 타입 안전성 개선 사항 확인

### 확인하기

- [ ] 할 일 추가 기능이 정상 작동하는가?
- [ ] 할 일 삭제 기능이 정상 작동하는가?
- [ ] 할 일 완료 토글 기능이 정상 작동하는가?
- [ ] Redux DevTools에서 액션과 상태 변화를 확인할 수 있는가?
- [ ] 전체 코드 라인 수가 기존 대비 30% 이상 감소했는가?
