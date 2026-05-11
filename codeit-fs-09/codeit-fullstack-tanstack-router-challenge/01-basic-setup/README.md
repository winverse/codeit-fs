# Challenge: Basic TanStack Router Setup

## 목표

이 챌린지에서는 TanStack Router의 기본 사용법을 연습하고 새로운 라우트를 추가해보겠습니다.

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

### 1. Contact 페이지 만들기

`src/routes/contact.jsx` 파일을 **새로 생성**하고 다음 요구사항을 만족하는 Contact 페이지를 구현하세요:

- 페이지 제목: "Contact Us"
- 페이지 내용: "Contact Page

### 2. 네비게이션에 Contact 링크 추가

`src/routes/__root.jsx` 파일을 수정하여:

- 네비게이션 메뉴에 Contact 페이지로 가는 `<Link>`를 추가하세요.
- 다른 링크들과 마찬가지로 `activeProps`를 사용하여 활성화 스타일을 적용하는 것을 잊지 마세요.

## 힌트

- `createFileRoute` 함수를 사용하여 새로운 라우트를 정의합니다.
- TanStack Router는 파일 기반 라우팅을 사용합니다.
- 네비게이션에서 `Link` 컴포넌트를 사용합니다.

## 완료 후 확인사항

- [ ] `/contact` 경로로 이동할 수 있는가?
- [ ] Contact 페이지가 올바르게 렌더링되는가?
- [ ] 네비게이션의 모든 링크가 정상적으로 작동하는가?