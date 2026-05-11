# Zustand 초보자를 위한 강의 목차

> **대상**: React 기초를 알고 있지만 상태관리 라이브러리가 처음인 개발자  
> **목표**: Zustand v5.0.8의 최신 기능을 활용한 현대적인 상태관리 역량 습득  
> **버전**: Zustand 5.0.8 기준 (2024년 최신 버전)  
> **언어**: JavaScript (TypeScript 없이 순수 JavaScript로 진행)

---

## 📚 전체 커리큘럼 개요

### **1. Zustand 시작하기**

- **학습 목표**: Zustand가 무엇인지 이해하고 첫 번째 스토어 만들기
- **핵심 개념**: 상태관리의 필요성, Zustand 소개, `create` 함수로 스토어 생성
- **v5 주요 특징**: 더 간단하고 직관적인 JavaScript API
- **실습**: 간단한 카운터 앱 만들기

### **2. 스토어 사용하기**

- **학습 목표**: 컴포넌트에서 Zustand 스토어를 읽고 업데이트하는 방법 학습
- **핵심 개념**: 상태 선택(selector), 상태 구독, 상태 업데이트
- **v5 주요 특징**: 더 효율적인 리렌더링 최적화
- **실습**: 투두 리스트의 아이템 추가/삭제 기능 구현

### **3. 성능 최적화하기**

- **학습 목표**: `useShallow`를 활용한 리렌더링 최적화 방법 학습
- **핵심 개념**: 얕은 비교, 여러 상태 선택 최적화, 성능 측정
- **v5 주요 특징**: `useShallow` 훅을 통한 성능 최적화
- **실습**: 복잡한 객체 상태를 효율적으로 관리하는 프로필 앱

### **4. 스토어 구조 설계하기**

- **학습 목표**: 복잡한 상태를 체계적으로 관리하는 방법 학습
- **핵심 개념**: 상태 구조화, 액션 함수 분리, 불변성 관리
- **v5 주요 특징**: 더 깔끔한 JavaScript 패턴과 구조화 방식
- **실습**: 장바구니 기능이 있는 쇼핑 앱 만들기

### **5. 비동기 작업 처리하기**

- **학습 목표**: API 호출 등 비동기 작업을 Zustand로 관리하는 방법
- **핵심 개념**: 비동기 액션, 로딩 상태, 에러 처리, Promise 관리
- **v5 주요 특징**: 향상된 비동기 상태 관리 패턴
- **실습**: 사용자 데이터를 가져오고 관리하는 기능 구현

### **6. 미들웨어와 고급 기능**

- **학습 목표**: 미들웨어를 활용한 기능 확장과 스토어 분리 방법
- **핵심 개념**: persist 미들웨어, devtools, 여러 스토어 관리
- **v5 주요 특징**: 개선된 미들웨어 API, 더 나은 개발자 도구 지원
- **실습**: 로컬 저장소 연동과 개발자 도구를 활용한 완전한 앱

---

## 📖 각 챕터별 상세 내용

### **01. Zustand 시작하기**

**왜 배워야 할까?**

- React만으로는 복잡한 상태관리가 어려운 이유
- 기존 상태관리 라이브러리 대비 Zustand의 장점 (간단함, 작은 번들 사이즈 92.4kB)
- Zustand 5.0.8의 새로운 특징과 개선사항

**무엇을 배울까?**

- `npm install zustand` 설치하기
- `create` 함수로 첫 번째 스토어 만들기
- 기본 상태 읽기와 `set` 함수를 통한 업데이트
- JavaScript ES6+ 문법을 활용한 v5 패턴

**v5 핵심 문법**:

```javascript
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

**실습 프로젝트**: 카운터 앱

- 숫자 증가/감소 버튼
- 현재 값 표시
- 리셋 기능

---

### **02. 스토어 사용하기**

**왜 배워야 할까?**

- 컴포넌트에서 상태에 접근하는 올바른 방법
- React의 useState vs Zustand의 전역 상태 관리 비교
- 자동 구독(subscription)과 리렌더링 최적화

**무엇을 배울까?**

- 상태 선택자(selector) 패턴 사용법
- 컴포넌트별 필요한 상태만 구독하기
- 상태 업데이트와 불변성 원칙

**v5 핵심 문법**:

```javascript
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}
```

**실습 프로젝트**: 간단한 투두 리스트

- 할 일 추가하기
- 할 일 삭제하기
- 완료 상태 토글

---

### **03. 성능 최적화하기** ⭐ **v5 신규 기능**

**왜 배워야 할까?**

- 여러 상태를 한번에 선택할 때 발생하는 불필요한 리렌더링 문제
- v5에서 도입된 `useShallow`의 중요성
- 성능 최적화가 사용자 경험에 미치는 영향

**무엇을 배울까?**

- `useShallow` 훅 사용법
- 객체/배열 상태의 얕은 비교 최적화
- 성능 측정과 비교 방법

**v5 핵심 문법**:

```javascript
import { useShallow } from "zustand/react/shallow";

// 여러 상태를 효율적으로 선택
const { name, email } = useStore(
  useShallow((state) => ({ name: state.name, email: state.email }))
);

// 배열 형태로도 가능
const [name, email] = useStore(
  useShallow((state) => [state.name, state.email])
);
```

**실습 프로젝트**: 사용자 프로필 관리

- 개인정보 수정 (이름, 이메일, 전화번호)
- 프로필 이미지 변경
- 알림 설정 관리
- 성능 최적화 before/after 비교

---

### **04. 스토어 구조 설계하기**

**왜 배워야 할까?**

- 복잡한 상태를 어떻게 체계적으로 관리할 것인가?
- 유지보수하기 쉬운 코드 구조의 중요성
- v5의 개선된 TypeScript 타입 추론 활용

**무엇을 배울까?**

- 상태와 액션을 분리하는 방법
- 객체와 배열 상태를 안전하게 다루기
- 불변성을 지키는 업데이트 패턴
- JavaScript ES6+ 구조분해할당과 스프레드 연산자 활용

**v5 핵심 문법**:

```javascript
const useCartStore = create((set, get) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      total: state.total + item.price,
    })),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((item) => item.id !== id);
      return {
        items,
        total: items.reduce((sum, item) => sum + item.price, 0),
      };
    }),
}));
```

**실습 프로젝트**: 장바구니가 있는 쇼핑 앱

- 상품 목록 보기
- 장바구니에 상품 추가/제거
- 장바구니 총 가격 자동 계산
- 수량 변경 기능

---

### **05. 비동기 작업 처리하기**

**왜 배워야 할까?**

- 실제 앱에서는 서버 API와의 통신이 필수
- 로딩, 성공, 실패 상태를 체계적으로 관리하는 방법
- v5의 향상된 비동기 패턴 활용

**무엇을 배울까?**

- `async/await`를 활용한 비동기 액션 작성
- 로딩 상태와 에러 상태 관리 패턴
- API 호출 최적화 기법

**v5 핵심 문법**:

```javascript
const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/users");
      const users = await response.json();
      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
```

**실습 프로젝트**: 사용자 관리 앱

- 사용자 목록 가져오기
- 로딩 스피너 표시
- 에러 메시지 처리
- 재시도(retry) 기능

---

### **06. 미들웨어와 고급 기능** ⭐ **v5 개선사항**

**왜 배워야 할까?**

- 실무에서 필요한 데이터 영속화(persistence) 기능
- 개발 중 디버깅을 위한 Redux DevTools 연동
- 앱이 커질수록 필요한 스토어 분리 및 조합 전략

**무엇을 배울까?**

- `persist` 미들웨어로 로컬 저장소 연동
- `devtools` 미들웨어로 개발자 도구 활용
- 여러 스토어를 조합하는 패턴
- Vanilla 스토어와 React 스토어의 차이점

**v5 핵심 문법**:

```javascript
import { persist, devtools } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

const useAppStore = create(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "app-store" }
  )
);
```

**실습 프로젝트**: 완전한 앱 만들기

- 사용자 인증 스토어 (세션 저장)
- 알림 관리 스토어
- 테마 설정 스토어 (다크/라이트 모드)
- 각 스토어 간의 상호작용
- 개발자 도구를 통한 상태 디버깅

---

## 🎯 학습 후 기대효과

이 강의를 완주하면 다음과 같은 능력을 갖게 됩니다:

1. **Zustand v5의 최신 기능 활용**: `useShallow`, 개선된 미들웨어 API 등을 실무에 적용
2. **성능 최적화된 상태관리**: 리렌더링 최적화와 메모리 효율적인 상태 설계 능력
3. **JavaScript 모던 패턴 숙달**: ES6+ 문법을 활용한 깔끔하고 읽기 쉬운 코드 작성
4. **실무 패턴 숙달**: persist, devtools 등 실제 프로덕션에서 필요한 기능들 활용
5. **확장 가능한 아키텍처**: 앱 규모에 따른 스토어 설계와 분리 전략 수립

---

## 💡 학습 전 준비사항

### **필수 지식**

- **React 기초**: 컴포넌트, Props, State, 이벤트 처리, 훅(Hooks)
- **JavaScript ES6+**: 구조분해할당, 화살표함수, async/await, 모듈 시스템
- **기본 상태관리 개념**: 전역 상태와 로컬 상태의 차이점 이해

### **개발 환경**

- **Node.js**: v18 이상 (Zustand 5.0.8 권장사양)
- **패키지 매니저**: npm 또는 yarn
- **에디터**: VS Code (JavaScript 지원)
- **브라우저**: Chrome (Redux DevTools Extension 설치 권장)

### **선택사항 (도움이 되는 지식)**

- **Vite 또는 Create React App**: 빠른 개발 환경 설정 경험
- **React DevTools**: 컴포넌트 상태 디버깅 경험

---

## 📋 각 챕터별 예상 학습 시간

| 챕터 | 내용                 | 예상 시간 | v5 신규 내용                       |
| ---- | -------------------- | --------- | ---------------------------------- |
| 01   | Zustand 시작하기     | 30분      | ✨ v5 설치 및 기본 JavaScript 문법 |
| 02   | 스토어 사용하기      | 45분      | 기본 개념 학습                     |
| 03   | 성능 최적화하기      | 60분      | ⭐ **useShallow 신규**             |
| 04   | 스토어 구조 설계하기 | 60분      | ✨ JavaScript ES6+ 패턴 활용       |
| 05   | 비동기 작업 처리하기 | 45분      | ✨ 향상된 비동기 패턴              |
| 06   | 미들웨어와 고급 기능 | 90분      | ⭐ **개선된 미들웨어 API**         |

**총 예상 학습 시간**: 약 5시간 30분

---

## 🚀 Zustand v5.0.8 주요 변경사항 및 장점

### **핵심 개선사항**

- **🎯 성능 최적화**: `useShallow`를 통한 불필요한 리렌더링 방지
- **📦 더 작은 번들 크기**: 92.4kB 언팩 크기로 경량화
- **🔧 개선된 JavaScript API**: 더 직관적이고 간결한 문법
- **⚡ 향상된 개발자 경험**: 더 직관적인 API와 에러 메시지

### **기존 라이브러리 대비 장점**

| 특징              | Zustand      | Redux Toolkit | Context API |
| ----------------- | ------------ | ------------- | ----------- |
| 설정 복잡도       | 🟢 매우 간단 | 🟡 보통       | 🟠 복잡함   |
| 번들 크기         | 🟢 92.4kB    | 🟠 크다       | 🟢 내장     |
| JavaScript 친화성 | 🟢 완벽 지원 | 🟢 우수       | � 기본      |
| 성능 최적화       | 🟢 자동화    | 🟡 수동       | 🟠 어려움   |
| 학습 난이도       | 🟢 쉬움      | 🟠 어려움     | 🟡 보통     |

### **v5에서 새롭게 추가된 기능들**

- `useShallow`: 여러 상태 선택 시 성능 최적화
- `createJSONStorage`: 더 유연한 저장소 설정
- 개선된 미들웨어 조합 방식
- React 18 동시성 기능과의 호환성 강화
