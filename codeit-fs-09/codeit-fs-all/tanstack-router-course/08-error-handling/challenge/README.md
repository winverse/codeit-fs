# Challenge: 글로벌 404 페이지 구현

## 목표
이 챌린지에서는 TanStack Router의 `notFoundRoute` 옵션을 사용하여, 애플리케이션 전역에서 존재하지 않는 경로로 접근했을 때 보여줄 404 페이지를 구현합니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```
   개발 서버가 실행되면, `/some/non-existent/route`와 같이 아무 주소로나 접속하여 404 페이지가 구현되었는지 확인하며 실습을 진행하세요.

## 챌린지 과제

### 1. 404 컴포넌트 생성

`src/routes/__root.jsx` 파일 내에, `NotFound`라는 이름의 새로운 함수 컴포넌트를 만드세요.

- 이 컴포넌트는 "404 - 페이지를 찾을 수 없습니다"라는 제목과 함께, 사용자가 홈으로 돌아갈 수 있는 `<Link to="/">`를 포함해야 합니다.
- `page-content`와 `btn` 등 `index.css`에 정의된 클래스를 사용하여 스타일을 적용하세요.

### 2. `notFoundRoute` 정의 및 export

`__root.jsx` 파일에서, `createRootRoute` 아래에 `NotFoundRoute`를 사용하여 새로운 404 라우트를 정의하고 `export` 하세요.

- `getParentRoute` 옵션을 사용하여 이 라우트의 부모가 `__root.jsx`의 `Route`임을 명시해야 합니다.
- `component` 옵션에는 방금 만든 `NotFound` 컴포넌트를 지정합니다.

```jsx
// HINT: __root.jsx 파일 하단에 추가할 코드 구조
import { ..., NotFoundRoute } from '@tanstack/react-router';

// ...

function NotFound() { /* ... */ }

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => Route,
  component: NotFound,
});
```

### 3. 라우터에 404 라우트 등록

`src/main.jsx` 파일을 열고, `createRouter` 함수의 옵션 객체에 `notFoundRoute`를 등록하세요. `__root.jsx`에서 `export`한 `notFoundRoute`를 `import`해야 합니다.

## 완료 후 확인사항
- [ ] 존재하지 않는 URL(예: `/asdf`)로 접속했을 때, 직접 만든 `NotFound` 컴포넌트가 렌더링되는가?
- [ ] 404 페이지의 "홈으로 돌아가기" 링크가 잘 작동하는가?
- [ ] 기존에 있던 페이지(Home, Posts)들은 여전히 잘 작동하는가?

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
