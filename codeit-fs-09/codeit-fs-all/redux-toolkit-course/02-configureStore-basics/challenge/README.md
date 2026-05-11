# 챌린지: configureStore 환경별 설정 연습

## 학습 목표

- configureStore의 환경별 설정 방법 이해
- 개발/프로덕션 환경에서 미들웨어 구성의 차이점 파악  
- Redux DevTools의 환경별 활성화/비활성화 제어

## 해야 할 일

### 1. 기본 스토어 설정 완성
- [ ] `src/store/store.js`에서 `configureStore`를 import
- [ ] 기본 스토어 설정을 구현 (reducer 연결)

### 2. 환경별 설정 구현
- [ ] 개발 환경에서는 모든 미들웨어와 DevTools 활성화
- [ ] 프로덕션 환경에서는 필수 미들웨어만 사용, DevTools 비활성화
- [ ] `import.meta.env.DEV` 또는 `process.env.NODE_ENV` 활용

### 3. 환경 정보 표시 개선 (선택사항)
- [ ] `EnvironmentInfo` 컴포넌트에서 DevTools 활성화 여부 표시
- [ ] 현재 적용된 미들웨어 수 표시

## 구현 힌트

### configureStore 기본 구조
```javascript
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // 리듀서 등록
  },
  // 환경별 설정 추가
});
```

### 환경 감지 방법
```javascript
const isDevelopment = import.meta.env.DEV;
// 또는
const isProduction = import.meta.env.PROD;
```

### 미들웨어 설정 옵션
- `middleware: (getDefaultMiddleware) => getDefaultMiddleware()`
- `devTools: boolean` - DevTools 활성화 여부

## 확인하기

### 개발 환경에서 확인
1. `npm run dev`로 개발 서버 실행
2. 브라우저에서 Redux DevTools 확장이 활성화되는지 확인
3. 환경 정보 섹션에서 "개발 환경: Yes" 표시 확인

### 프로덕션 빌드에서 확인  
1. `npm run build`로 프로덕션 빌드 생성
2. `npm run preview`로 프로덕션 빌드 확인
3. Redux DevTools가 비활성화되는지 확인
4. 환경 정보에서 "개발 환경: No" 표시 확인

### 동작 테스트
- [ ] 카운터 버튼들이 정상 작동하는지 확인
- [ ] Redux 상태가 올바르게 업데이트되는지 확인
- [ ] 개발/프로덕션 환경 정보가 올바르게 표시되는지 확인

## 핵심 개념 복습

1. **configureStore의 자동 설정**: Redux Toolkit은 기본적으로 thunk, devTools 등을 자동 설정
2. **환경별 최적화**: 프로덕션에서는 불필요한 도구들을 비활성화하여 번들 크기와 성능 최적화  
3. **미들웨어 커스터마이징**: 필요에 따라 기본 미들웨어를 수정하거나 추가 가능

---

💡 **참고**: 이 챌린지는 Chapter 02에서 배운 configureStore의 핵심 기능만 연습하는 것이 목적입니다. 복잡한 비즈니스 로직보다는 **환경별 스토어 설정**에 집중해보세요!