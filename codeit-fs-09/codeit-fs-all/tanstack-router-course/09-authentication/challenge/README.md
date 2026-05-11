# Challenge: 보호된 라우트와 인증 가드 구현

## 목표
이 챌린지에서는 `beforeLoad` 라우트 가드를 사용하여, 로그인한 사용자만 접근할 수 있는 "보호된 라우트"를 구현합니다. 인증되지 않은 사용자는 로그인 페이지로 리디렉션시키는 핵심 인증 흐름을 실습합니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```
   개발 서버가 실행되면, `/dashboard` 경로로 직접 접근을 시도하며 실습을 진행하세요.

## 챌린지 과제

### 1. 라우터에 인증 컨텍스트 제공
`src/main.jsx` 파일을 수정하여, `createRouter`의 `context` 옵션을 통해 `auth` 객체를 라우터에 주입하세요. 이 `auth` 객체는 `useAuth` 훅에서 반환된 값을 사용해야 합니다.

### 2. `beforeLoad` 인증 가드 구현
`src/routes/dashboard.jsx` 파일을 열고, `// TODO:` 주석으로 표시된 `beforeLoad` 함수를 완성하세요.

- `beforeLoad` 함수는 `context` 객체를 통해 인증 상태(`context.auth.isAuthenticated`)를 확인해야 합니다.
- 만약 인증되지 않았다면(`false`), TanStack Router의 `redirect` 유틸리티를 `throw`하여 사용자를 `/login` 페이지로 리디렉션시키세요.

### 3. 로그인 페이지 기능 완성
`src/routes/login.jsx` 파일을 수정하여, "Login" 버튼을 클릭했을 때의 동작을 구현하세요.

- `useAuth` 훅을 사용하여 `login` 함수를 가져옵니다.
- `useNavigate` 훅을 사용하여 `navigate` 함수를 가져옵니다.
- "Login" 버튼의 `onClick` 핸들러에서 `login()` 함수를 호출한 후, `navigate({ to: '/dashboard' })`를 호출하여 사용자를 대시보드 페이지로 이동시키세요.

## 완료 후 확인사항
- [ ] 로그아웃 상태에서 `/dashboard` 경로로 직접 접근 시, `/login` 페이지로 자동으로 리디렉션되는가?
- [ ] 로그인 페이지에서 "Login" 버튼을 누르면 "Dashboard" 페이지로 성공적으로 이동하는가?
- [ ] 로그인 후에는 `/dashboard` 페이지에 자유롭게 접근할 수 있는가?

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
