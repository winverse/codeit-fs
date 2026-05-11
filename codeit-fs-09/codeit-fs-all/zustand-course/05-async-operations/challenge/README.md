# Chapter 05 Challenge: Blog Post Management System

## 🎯 목표
JSONPlaceholder API를 활용하여 완전한 블로그 포스트 관리 시스템을 구현해보세요. 이 challenge에서는 Zustand를 사용한 고급 async 상태 관리 패턴들을 직접 구현하게 됩니다.

## 📋 요구사항

### 1. 기본 CRUD 기능
- [ ] **포스트 목록 조회** (`GET /posts`)
- [ ] **포스트 상세 조회** (`GET /posts/:id`) 
- [ ] **포스트 생성** (`POST /posts`)
- [ ] **포스트 수정** (`PUT /posts/:id`)
- [ ] **포스트 삭제** (`DELETE /posts/:id`)

### 2. 사용자 경험 개선
- [ ] **로딩 상태** - 모든 async 작업에 대한 로딩 표시
- [ ] **에러 처리** - 네트워크 에러 및 API 에러 처리
- [ ] **에러 복구** - 재시도 버튼 및 자동 재시도
- [ ] **토스트 알림** - 성공/실패 피드백
- [ ] **빈 상태** - 데이터가 없을 때의 UI

### 3. 고급 기능 (선택사항)
- [ ] **검색 기능** - 제목/내용 검색 (디바운싱 적용)
- [ ] **필터링** - 작성자별 필터링
- [ ] **정렬** - 최신순, 제목순, 작성자순
- [ ] **페이지네이션** - 페이지 단위 로딩
- [ ] **캐싱** - API 응답 캐싱 (5분 TTL)
- [ ] **Optimistic Updates** - 즉시 UI 업데이트
- [ ] **오프라인 지원** - 로컬스토리지 백업

## 🛠 구현 가이드

### 1단계: blogStore.js 완성하기

```javascript
// src/store/blogStore.js에서 TODO 주석들을 찾아 구현하세요

// 필수 구현 항목:
- fetchPosts() - 포스트 목록 로드
- fetchPost(id) - 개별 포스트 로드  
- createPost(data) - 새 포스트 생성
- updatePost(id, data) - 포스트 수정
- deletePost(id) - 포스트 삭제

// 고급 구현 항목:
- 로딩/에러 상태 관리
- 캐싱 메커니즘
- 요청 중복 제거
- Optimistic Updates
```

### 2단계: UI 컴포넌트 개선

```javascript
// 각 컴포넌트의 TODO 주석을 찾아 구현하세요

PostList.jsx - 목록 표시, 검색, 필터링
PostCard.jsx - 개별 포스트 카드, 액션 버튼
PostDetail.jsx - 상세 페이지, 삭제/수정
PostForm.jsx - 생성/수정 폼, 유효성 검사
```

### 3단계: 고급 기능 구현

```javascript
// 선택적으로 구현할 수 있는 고급 기능들

1. 실시간 검색
   - 디바운싱 (300ms)
   - 검색어 하이라이팅
   - 검색 히스토리

2. 스마트 캐싱
   - 5분 TTL 캐시
   - 백그라운드 새로고침
   - 캐시 무효화

3. 오프라인 지원
   - 로컬스토리지 동기화
   - 네트워크 상태 감지
   - 오프라인 알림
```

## 🔗 API 엔드포인트

### JSONPlaceholder API 사용법

```javascript
// Base URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// 포스트 목록 (100개)
GET /posts
// 응답: [{ id, title, body, userId }, ...]

// 포스트 상세
GET /posts/1
// 응답: { id: 1, title: "...", body: "...", userId: 1 }

// 포스트 생성 (가상)
POST /posts
// 본문: { title, body, userId }
// 응답: { id: 101, title, body, userId }

// 포스트 수정 (가상)
PUT /posts/1
// 본문: { id: 1, title, body, userId }
// 응답: { id: 1, title, body, userId }

// 포스트 삭제 (가상)
DELETE /posts/1
// 응답: {}
```

### 사용자 정보 API (선택사항)

```javascript
// 사용자 목록
GET /users
// 응답: [{ id, name, username, email, ... }, ...]

// 특정 사용자의 포스트
GET /posts?userId=1
// 응답: [포스트 배열]
```

## ✅ 완성 체크리스트

### 기본 기능
- [ ] 포스트 목록이 로드되는가?
- [ ] 개별 포스트를 볼 수 있는가?
- [ ] 새 포스트를 작성할 수 있는가?
- [ ] 포스트를 수정할 수 있는가?
- [ ] 포스트를 삭제할 수 있는가?

### 사용자 경험
- [ ] 로딩 상태가 적절히 표시되는가?
- [ ] 에러가 발생했을 때 사용자에게 알려주는가?
- [ ] 재시도 기능이 작동하는가?
- [ ] 성공/실패 피드백이 표시되는가?

### 코드 품질
- [ ] 에러 처리가 모든 async 함수에 있는가?
- [ ] 로딩 상태가 적절히 관리되는가?
- [ ] 컴포넌트가 재사용 가능한가?
- [ ] 코드가 읽기 쉽고 이해하기 쉬운가?

### 고급 기능 (선택사항)
- [ ] 검색 기능이 작동하는가?
- [ ] 필터링이 작동하는가?
- [ ] 캐싱이 구현되었는가?
- [ ] Optimistic Updates가 구현되었는가?

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 💡 힌트

1. **시작하기 전에**: starter와 solution 프로젝트를 참고하여 패턴을 이해하세요.

2. **단계별 접근**: 기본 CRUD부터 시작하고 점진적으로 고급 기능을 추가하세요.

3. **에러 처리**: 모든 API 호출에 try-catch를 사용하고 적절한 에러 메시지를 표시하세요.

4. **상태 관리**: Zustand store에서 모든 상태를 중앙 집중식으로 관리하세요.

5. **사용자 피드백**: 모든 액션에 대해 적절한 로딩/성공/에러 피드백을 제공하세요.

## 🎉 완성 후

모든 기능을 구현한 후에는:

1. **코드 리뷰**: 다른 사람이 이해할 수 있는 코드인지 확인
2. **테스트**: 다양한 시나리오에서 앱이 잘 작동하는지 테스트
3. **성능 확인**: 네트워크 탭에서 불필요한 요청이 없는지 확인
4. **사용자 경험**: 실제 사용자 관점에서 앱을 사용해보기

성공적으로 완성하면 production-ready한 블로그 관리 시스템을 구축한 것입니다! 🎊