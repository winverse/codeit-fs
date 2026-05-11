# Redux Toolkit 완전 마스터 과정

## 🎯 과정 개요

이 과정은 Redux Toolkit을 처음부터 고급 활용까지 체계적으로 학습할 수 있도록 구성된 실습 중심의 교육 과정입니다. 각 챕터마다 starter, solution, challenge 프로젝트를 제공하여 단계적 학습을 지원합니다.

## 📚 과정 구성

### Chapter 01: Redux Toolkit 소개 ✅
**목표**: Redux Toolkit의 기본 개념과 전통적인 Redux와의 차이점 이해
- `createSlice`와 `configureStore` 기본 사용법
- Immer를 통한 불변성 관리
- Redux DevTools 연동

### Chapter 02: configureStore 기초 ✅  
**목표**: 스토어 설정과 미들웨어 자동 구성 이해
- 기본 미들웨어 자동 적용
- 커스텀 미들웨어 추가
- 개발/프로덕션 환경별 설정

### Chapter 03: createSlice 기본 ✅
**목표**: createSlice의 고급 기능 활용
- prepare 함수를 통한 액션 페이로드 전처리
- 복잡한 리듀서 로직 구현
- 액션 생성자 커스터마이징

### Chapter 04: React-Redux 통합 ✅
**목표**: React 컴포넌트에서 Redux 상태 효율적 관리
- Provider, useSelector, useDispatch 패턴
- 성능 최적화 (memo, useCallback, useMemo)
- 타입 안전한 커스텀 훅 생성

### Chapter 05: 여러 Slice 관리 ✅
**목표**: 복합적인 애플리케이션 상태 아키텍처 설계
- 정규화된 상태 구조 설계
- 여러 slice 간 상호작용 패턴
- 복잡한 selector 조합 기법

### Chapter 06: extraReducers
**목표**: slice 간 액션 공유와 크로스 도메인 로직 구현
- builder callback 패턴 활용
- 다른 slice의 액션에 반응하는 리듀서
- 액션 타입 매칭과 조건부 로직

### Chapter 07: createAsyncThunk 기초
**목표**: 비동기 작업을 위한 Redux Toolkit 패턴
- API 호출과 상태 관리 통합
- pending, fulfilled, rejected 상태 처리
- 로딩 상태와 에러 처리

### Chapter 08: 고급 비동기 패턴
**목표**: 복잡한 비동기 시나리오 처리
- 조건부 thunk 실행
- 병렬/순차 API 호출
- 재시도 로직과 에러 복구

### Chapter 09: thunk API 유틸리티
**목표**: thunk의 고급 기능과 최적화 기법
- getState, dispatch, rejectWithValue 활용
- signal을 통한 요청 취소
- 동적 thunk 생성과 조합

## 🚀 학습 방법

### 1. 단계별 접근
1. **starter** 프로젝트로 기본 구조 이해
2. **solution** 프로젝트로 완성된 구현 학습  
3. **challenge** 과제로 응용력 향상

### 2. 실습 중심 학습
- 각 챕터마다 실제 동작하는 애플리케이션 구현
- 점진적 복잡도 증가로 자연스러운 학습 곡선
- 실무에서 바로 적용 가능한 패턴 학습

### 3. 최적화 중점
- 성능 최적화 기법 체계적 학습
- 메모이제이션과 렌더링 최적화
- 상태 구조 설계 베스트 프랙티스

## 🛠️ 기술 스택

- **React 18**: 최신 React 기능 활용
- **Redux Toolkit 2.0**: 최신 버전의 모든 기능
- **Vite**: 빠른 개발 환경
- **CSS Modules**: 컴포넌트 스타일링
- **JavaScript**: 접근성 높은 순수 JS 구현

## 📖 학습 순서

1. 각 챕터의 README.md를 통해 학습 목표 확인
2. starter 프로젝트를 실행하여 기본 구조 파악
3. 직접 구현해보고 solution과 비교
4. challenge 과제로 심화 학습
5. 다음 챕터로 진행

## ✅ 완성된 챕터

- [x] **Chapter 01-05**: 완전 구현됨 (starter/solution/challenge 모두 완성)
- [x] **빌드 테스트**: 모든 완성된 챕터가 정상 빌드 확인
- [x] **실행 테스트**: 기본 기능 동작 확인

## 🎓 학습 성과

이 과정을 완료하면 다음을 할 수 있게 됩니다:

1. **Redux Toolkit 마스터**: 모든 핵심 기능을 실무 수준으로 활용
2. **성능 최적화**: React-Redux 애플리케이션의 성능 문제 해결
3. **아키텍처 설계**: 확장 가능한 상태 관리 구조 설계
4. **비동기 패턴**: 복잡한 API 통신과 상태 동기화 처리
5. **베스트 프랙티스**: 실무에서 검증된 패턴과 기법 적용

---

**💡 팁**: 각 챕터를 충분히 이해한 후 다음으로 넘어가세요. 특히 Chapter 04-05는 이후 모든 챕터의 기반이 되므로 확실히 숙지하는 것이 중요합니다.