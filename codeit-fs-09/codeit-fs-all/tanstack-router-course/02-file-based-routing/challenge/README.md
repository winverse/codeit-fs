# Challenge: File-Based Routing 연습

## 목표
이 챌린지에서는 TanStack Router의 파일 기반 라우팅을 실습하여 복잡한 라우트 구조를 구현합니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```

## 챌린지 과제

### 1. Services 섹션 구현

다음 라우트들을 구현하세요:

- **`/services`** - 서비스 목록 페이지
  - 제공하는 서비스들의 개요 표시
  - 각 서비스로의 링크 포함

- **`/services/web-development`** - 웹 개발 서비스 상세
  - 웹 개발 서비스에 대한 상세 정보
  - 기술 스택, 프로세스 등 포함

- **`/services/mobile-development`** - 모바일 개발 서비스 상세
  - 모바일 앱 개발 서비스 정보
  - iOS/Android 개발 정보 포함

### 2. Company 섹션 구현

다음 라우트들을 구현하세요:

- **`/company`** - 회사 소개 페이지
  - 회사 미션, 비전
  - 회사 히스토리

- **`/company/team`** - 팀 소개 페이지
  - 팀 멤버 소개
  - 각 멤버의 역할과 경험

### 3. 네비게이션 완성

`src/routes/__root.jsx`를 수정하여:
- 모든 새로운 라우트를 네비게이션 메뉴에 추가
- 사용자 친화적인 링크 텍스트 사용
- 논리적인 메뉴 순서 구성

## 구현 힌트

### 파일 구조 예시
```
src/routes/
├── __root.jsx
├── index.jsx
├── about.jsx
├── services/
│   ├── index.jsx              → /services
│   ├── web-development.jsx    → /services/web-development
│   └── mobile-development.jsx → /services/mobile-development
└── company/
    ├── index.jsx              → /company
    └── team.jsx               → /company/team
```

### 라우트 파일 생성 방법
```jsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/')({
  component: () => (
    <div className="page-content">
      <h1>Our Services</h1>
      <p>서비스 내용...</p>
    </div>
  ),
})
```

## 완료 후 확인사항
- [ ] 모든 라우트가 올바른 URL로 접근 가능한가?
- [ ] 네비게이션 링크들이 모두 작동하는가?
- [ ] 각 페이지가 의미 있는 콘텐츠를 표시하는가?
- [ ] 개발 서버에서 라우트 트리가 자동으로 생성되는가?
- [ ] Services 섹션 모든 페이지가 완성되었는가?
- [ ] Company 섹션 모든 페이지가 완성되었는가?

## 추가 도전 과제
1. 각 서비스 페이지에 실제적인 콘텐츠와 이미지 추가
2. 회사 섹션에 연락처 정보 및 위치 정보 포함
3. 일관된 페이지 스타일링 적용

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
