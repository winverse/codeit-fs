# TanStack Router Course

이 과정에서는 현대적이고 타입 안전한 TanStack Router를 배웁니다. 파일 기반 라우팅부터 고급 기능까지 단계별로 학습합니다.

## 과정 구성

각 챕터는 다음과 같이 구성되어 있습니다:
- `starter/`: 강의 시작 시점의 코드
- `solution/`: 강의 완료 후 완성된 코드  
- `challenge/`: 학생들의 실습 과제

## 학습 순서

### ✅ 완료된 챕터

1. **01-basic-setup**: TanStack Router 기본 설정과 첫 라우트
2. **02-file-based-routing**: 파일 기반 라우팅 시스템  
3. **03-route-tree-structure**: 라우트 트리와 중첩 구조
4. **04-navigation-and-links**: 내비게이션과 Link 컴포넌트

### 📚 추가 챕터 (README 작성 완료)

5. **05-route-parameters**: 동적 라우트 파라미터 처리
6. **06-search-parameters**: 검색 파라미터 관리와 필터링
7. **07-loading-states**: 로딩 상태 관리와 스켈레톤 UI
8. **08-error-handling**: 에러 바운더리와 404 페이지
9. **09-authentication**: 인증 가드와 보호된 라우트
10. **10-advanced-patterns**: 코드 스플리팅과 성능 최적화

## 챕터별 상세 내용

### Chapter 01: Basic Setup
- TanStack Router 설치 및 설정
- 첫 번째 라우트 생성
- Router Provider 설정
- 기본 내비게이션 구현

### Chapter 02: File-based Routing  
- 파일 기반 라우팅 시스템 이해
- 라우트 파일 명명 규칙
- 자동 라우트 생성
- 중첩 라우팅 기초

### Chapter 03: Route Tree Structure
- 레이아웃 라우트 (`_layout.tsx`)
- 라우트 상속과 중첩
- Outlet 컴포넌트 활용
- 복잡한 라우트 구조 설계

### Chapter 04: Navigation and Links
- Link 컴포넌트 고급 기능
- useNavigate 훅으로 프로그래매틱 내비게이션
- Navigate 컴포넌트로 조건부 리디렉션
- 활성 링크 스타일링과 브레드크럼

### Chapter 05: Route Parameters
- 동적 라우트 (`$parameter`)
- useParams 훅 사용법
- 파라미터 검증과 타입 안전성
- 중첩 파라미터 처리

### Chapter 06: Search Parameters  
- useSearch 훅으로 쿼리 파라미터 관리
- 검색 파라미터 검증 스키마
- 실시간 검색과 필터링
- 페이지네이션 구현

### Chapter 07: Loading States
- 라우트 로더와 데이터 페칭
- 로딩 상태 UI (스피너, 스켈레톤)
- Suspense 경계 활용
- 에러 상태 처리

### Chapter 08: Error Handling
- 에러 바운더리 구현
- 404 페이지와 Not Found 처리
- 에러 복구 메커니즘
- 사용자 친화적 에러 UI

### Chapter 09: Authentication
- 인증 상태 관리
- 보호된 라우트 구현
- 권한 기반 접근 제어
- 로그인/로그아웃 플로우

### Chapter 10: Advanced Patterns
- 코드 스플리팅과 지연 로딩
- 라우트 프리로딩 전략
- 데이터 캐싱 최적화
- 성능 모니터링

## 주요 학습 목표

- ✅ **타입 안전성**: 100% 타입 안전한 라우팅 시스템
- ✅ **파일 기반 라우팅**: 직관적인 파일 구조 기반 라우팅  
- ✅ **현대적 패턴**: 최신 React 패턴과 모범 사례
- ✅ **성능 최적화**: 코드 스플리팅과 지연 로딩
- ✅ **사용자 경험**: 로딩 상태와 에러 처리
- ✅ **실전 적용**: 인증, 권한, 검색 등 실무 기능

## 기술 스택

- **React 18+**: 최신 React 기능 활용
- **TanStack Router**: 타입 안전한 라우팅
- **Vite**: 빠른 개발 환경
- **TypeScript**: 타입 안전성 (선택사항)
- **Zod**: 스키마 검증 (고급 챕터)

## 수강 전 준비사항

- React 기초 지식
- ES6+ JavaScript 문법
- Node.js 및 npm 설치
- 기본적인 TypeScript 지식 (권장)

## 과정 완료 후 역량

이 과정을 완료하면 다음과 같은 역량을 갖추게 됩니다:

1. **현대적 라우팅 시스템 설계**
2. **타입 안전한 React 애플리케이션 개발**  
3. **성능 최적화된 SPA 구축**
4. **사용자 친화적 UI/UX 구현**
5. **실무급 인증 및 권한 시스템 개발**

---

**💡 팁**: 각 챕터의 README를 먼저 읽고, starter → solution → challenge 순서로 학습하시기 바랍니다!