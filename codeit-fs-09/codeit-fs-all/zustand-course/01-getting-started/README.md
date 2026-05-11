# 1. Zustand 시작하기

React의 상태 관리가 복잡해질 때, Zustand가 어떻게 이를 간단하게 해결할 수 있는지 알아보고 첫 번째 스토어를 만들어보겠습니다.

## 학습 목표

이 챕터를 완료하면 다음과 같은 능력을 갖게 됩니다:

- **상태 관리의 필요성 이해**: 왜 전역 상태 관리가 필요한지 실제 예제를 통해 체감
- **Zustand 기본 개념 파악**: 스토어, 상태, 액션의 관계와 역할 이해
- **첫 번째 스토어 생성**: `create` 함수를 사용한 기본 스토어 구현
- **상태 읽기와 업데이트**: 컴포넌트에서 스토어의 상태를 읽고 수정하는 방법 습득

## 주요 개념

### 1. 상태 관리의 필요성

React의 `useState`만으로는 다음과 같은 상황에서 한계가 있습니다:

- **여러 컴포넌트에서 같은 상태 공유**: Props drilling 문제
- **깊은 컴포넌트 트리**: 상태를 여러 레벨을 거쳐 전달해야 하는 복잡성
- **상태의 복잡한 업데이트 로직**: 여러 상태가 연관되어 있을 때의 관리 어려움

### 2. Zustand의 장점

- **📦 작은 번들 크기**: 92.4kB로 Redux 대비 매우 경량
- **🎯 간단한 API**: 복잡한 설정 없이 바로 사용 가능
- **⚡ 높은 성능**: 필요한 컴포넌트만 리렌더링
- **🔧 유연성**: 미들웨어와 플러그인 지원

### 3. 기본 스토어 구조

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  // 상태 (State)
  count: 0,
  
  // 액션 (Actions)
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

### 💡 심화 학습: `set` 함수의 동작 원리

`set` 함수는 두 가지 방식으로 사용할 수 있습니다:

1. **객체 직접 전달**: `set({ count: 0 })` - 해당 속성만 업데이트
2. **함수 전달**: `set((state) => ({ count: state.count + 1 }))` - 이전 상태 기반 업데이트

## 강의 시연 스크립트

### 단계 1: 프로젝트 설정 및 Zustand 설치

먼저 `starter` 프로젝트에 Zustand를 설치합니다:

```bash
npm install zustand
```

### 단계 2: 기본 카운터 스토어 생성

`src/stores/counterStore.js` 파일을 생성하고 다음 코드를 작성합니다:

```javascript
import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
```

**💬 설명 포인트:**
- `create` 함수가 스토어를 생성하는 핵심
- 상태(`count`)와 액션(`increment`, `decrement`, `reset`)을 하나의 객체에 정의
- `set` 함수를 통해 상태를 업데이트

### 단계 3: 컴포넌트에서 스토어 사용

`src/components/Counter/Counter.jsx`에서 스토어를 사용합니다:

```javascript
import { useCounterStore } from '@/stores/counterStore'
import styles from './Counter.module.css'

export function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Zustand 카운터</h1>
      <div className={styles.counter}>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.buttons}>
        <button onClick={decrement} className={styles.button}>
          -1
        </button>
        <button onClick={increment} className={styles.button}>
          +1
        </button>
        <button onClick={reset} className={styles.resetButton}>
          리셋
        </button>
      </div>
    </div>
  )
}
```

**💬 설명 포인트:**
- 스토어에서 필요한 상태와 액션만 선택적으로 가져오기
- 각각을 별도로 구독하여 성능 최적화
- 버튼 클릭 시 액션 함수 직접 호출

### 단계 4: 여러 컴포넌트에서 상태 공유 확인

`src/components/CounterDisplay/CounterDisplay.jsx`를 생성하여 상태 공유를 확인합니다:

```javascript
import { useCounterStore } from '@/stores/counterStore'
import styles from './CounterDisplay.module.css'

export function CounterDisplay() {
  const count = useCounterStore((state) => state.count)

  return (
    <div className={styles.display}>
      <p>다른 컴포넌트에서 보는 카운트: <strong>{count}</strong></p>
      <p className={styles.message}>
        {count === 0 && '카운터를 시작해보세요!'}
        {count > 0 && count < 10 && '좋아요! 계속 세어보세요!'}
        {count >= 10 && '와! 10 이상이네요! 🎉'}
        {count < 0 && '음수도 가능해요!'}
      </p>
    </div>
  )
}
```

### 단계 5: App 컴포넌트에 통합

`src/App.jsx`에서 두 컴포넌트를 함께 사용합니다:

```javascript
import { Counter } from '@/components/Counter'
import { CounterDisplay } from '@/components/CounterDisplay'
import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Zustand 시작하기</h1>
        <p>간단한 상태 관리 라이브러리</p>
      </header>
      <main className={styles.main}>
        <Counter />
        <CounterDisplay />
      </main>
    </div>
  )
}
```

**💬 설명 포인트:**
- Props 전달 없이 두 컴포넌트가 같은 상태를 공유
- 한 컴포넌트에서 상태를 변경하면 다른 컴포넌트도 자동 업데이트
- 이것이 Zustand의 핵심 장점!

## 챌린지 과제

학생들이 `challenge` 폴더에서 수행해야 할 미션입니다.

### 미션

간단한 **좋아요 카운터**를 만들어보세요!

#### 요구사항:
1. **좋아요 스토어 생성**: `src/stores/likeStore.js`
   - `likes`: 좋아요 수 (초기값: 0)
   - `addLike`: 좋아요 +1
   - `removeLike`: 좋아요 -1 (단, 0 미만으로는 내려가지 않음)
   - `resetLikes`: 좋아요 0으로 초기화

2. **LikeButton 컴포넌트**: 좋아요 버튼과 카운트 표시
3. **LikeStatus 컴포넌트**: 좋아요 수에 따른 메시지 표시
   - 0개: "아직 좋아요가 없어요 😢"
   - 1-5개: "좋아요를 받고 있네요! 👍"
   - 6-10개: "인기가 많아요! 🔥"
   - 11개 이상: "대박! 너무 인기 있어요! 🚀"

### 확인하기

다음 기능이 정상적으로 작동하는지 확인하세요:

- [ ] 좋아요 버튼을 누르면 카운트가 증가한다
- [ ] 좋아요 취소 버튼을 누르면 카운트가 감소한다 (0 미만으로는 가지 않음)
- [ ] 리셋 버튼을 누르면 카운트가 0이 된다
- [ ] 좋아요 수에 따라 상태 메시지가 올바르게 표시된다
- [ ] 두 컴포넌트가 실시간으로 같은 상태를 공유한다

### 💡 힌트

- `removeLike` 액션에서 `Math.max(0, state.likes - 1)`를 활용해보세요
- 조건부 렌더링을 위해 삼항 연산자나 논리 연산자를 사용해보세요
- CSS 모듈을 활용해 좋아요 수에 따라 다른 스타일을 적용해보세요

---

## 다음 챕터 미리보기

다음 챕터 **"스토어 사용하기"**에서는:
- 더 효율적인 상태 선택 방법
- 복잡한 상태 구조 다루기
- 투두 리스트를 통한 실무 패턴 학습

지금까지 Zustand의 기본기를 익혔다면, 이제 본격적으로 활용해볼 준비가 되었습니다! 🚀