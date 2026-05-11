# 🎯 Zustand 시작하기 - 실습 챌린지

## 📋 해야 할 일 (Tasks)

### 1단계: Zustand 스토어 생성하기

`src/stores/counterStore.js` 파일에서 다음을 완성하세요:

1. `zustand`에서 `create` 함수를 import하기
2. 초기 상태 `count: 0` 정의하기
3. 카운터를 증가시키는 `increment` 액션 구현하기
4. 카운터를 감소시키는 `decrement` 액션 구현하기
5. 카운터를 초기화하는 `reset` 액션 구현하기

### 2단계: 컴포넌트에서 스토어 사용하기

`src/App.jsx` 파일에서 다음을 완성하세요:

1. `counterStore`에서 `useCounterStore` import하기
2. 훅을 사용해서 `count`, `increment`, `decrement`, `reset` 가져오기
3. 임시 상태와 함수들을 제거하고 Zustand 스토어 사용하기

### 3단계: 동작 확인하기

모든 TODO를 완성한 후:

1. `npm run dev`로 개발 서버 실행
2. 브라우저에서 `http://localhost:5173` 접속
3. 버튼 클릭시 카운터가 정상 동작하는지 확인

## ✅ 확인하기 (Check Points)

완성 후 다음 항목들이 모두 정상적으로 작동하는지 확인하세요:

- [ ] +1 버튼 클릭시 숫자가 증가한다
- [ ] -1 버튼 클릭시 숫자가 감소한다
- [ ] 초기화 버튼 클릭시 숫자가 0으로 돌아간다
- [ ] 페이지 새로고침해도 카운터가 초기화된다 (상태가 유지되지 않음)
- [ ] 콘솔에 오류가 표시되지 않는다

## 💡 힌트 (Hints)

### Zustand 스토어 기본 패턴:

```javascript
import { create } from 'zustand';

export const useStore = create(set => ({
  // 상태
  value: initialValue,

  // 액션
  updateValue: newValue => set({ value: newValue }),
  incrementValue: () => set(state => ({ value: state.value + 1 })),
}));
```

### 컴포넌트에서 사용:

```javascript
import { useStore } from './store';

function Component() {
  const { value, updateValue, incrementValue } = useStore();

  return <button onClick={incrementValue}>Count: {value}</button>;
}
```

## 🎉 완성 기준

모든 TODO가 해결되고 위의 확인사항이 모두 통과하면 실습이 완료됩니다!

다음 챕터에서는 더 복잡한 상태 관리와 성능 최적화를 학습해보겠습니다.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
