# 9. 인증과 보호된 라우트 (Authentication)

이번 챕터에서는 TanStack Router의 `beforeLoad` 라이프사이클 훅을 사용하여, 사용자가 특정 라우트에 접근하기 전에 인증 상태를 확인하는 '인증 가드'를 구현합니다. 이를 통해 로그인한 사용자만 접근할 수 있는 보호된 라우트를 만드는 방법을 배웁니다.

## 학습 목표

- `beforeLoad` 라우트 가드의 개념과 작동 방식을 이해할 수 있다.
- `beforeLoad` 내에서 `redirect` 유틸리티를 사용하여, 인증되지 않은 사용자를 로그인 페이지로 리디렉션시킬 수 있다.
- 라우터 컨텍스트를 통해 인증 상태를 `beforeLoad` 가드에 전달할 수 있다.
- 로그인 성공 후, 사용자가 원래 접근하려던 페이지로 다시 이동시키는 로직을 구현할 수 있다.

## 주요 개념

- **`beforeLoad`**: 라우트의 `loader`가 실행되기 전에 호출되는 라이프사이클 훅입니다. 라우트 접근 권한을 확인하기에 가장 이상적인 위치입니다.
- **`redirect`**: `beforeLoad` 내에서 `throw redirect(...)` 형태로 사용되어, 현재 네비게이션을 중단하고 사용자를 다른 페이지로 즉시 이동시키는 유틸리티입니다.
- **Router Context**: `createRouter` 시점에 생성되어 라우터 전반에 걸쳐 공유되는 데이터입니다. 인증 상태와 같은 전역적인 정보를 담아 `beforeLoad`와 같은 훅에서 접근할 수 있습니다.
- **`search.redirect`**: 로그인 페이지로 리디렉션될 때, 원래 가려던 경로를 `redirect` 검색 파라미터에 담아 전달할 수 있습니다. 이를 통해 로그인 후 원래의 목적지로 사용자를 돌려보낼 수 있습니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 라우터에 인증 컨텍스트 주입

`src/main.jsx` 파일에서 `createRouter`를 수정하여, `auth` 객체를 라우터의 컨텍스트로 주입합니다. 이렇게 하면 모든 라우트의 `beforeLoad` 훅에서 인증 상태에 접근할 수 있습니다.

```jsx
// src/main.jsx (수정)
// ...
const router = createRouter({
  routeTree,
  context: {
    // auth 객체를 context에 등록
    auth: undefined,
  },
});

// ...
```

### 2단계: 보호된 라우트에 `beforeLoad` 가드 추가

`src/routes/profile.jsx` 파일을 수정하여, `beforeLoad` 가드를 추가합니다. 이 가드는 페이지를 로드하기 전에 컨텍스트의 인증 상태를 확인하고, 로그인하지 않은 사용자는 `/login` 페이지로 리디렉션시킵니다.

이때, 원래 가려던 경로(`location.href`)를 `redirect` 검색 파라미터에 담아 로그인 페이지로 전달합니다.

```jsx
// src/routes/profile.jsx (수정)
import { createFileRoute, redirect } from '@tanstack/react-router';
// ...

export const Route = createFileRoute('/profile')({
  // beforeLoad 가드 추가
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          // 로그인 후 돌아올 경로를 전달
          redirect: location.href,
        },
      });
    }
  },
  component: ProfilePage,
});

// ...
```

### 3단계: 로그인 페이지 로직 수정

`src/routes/login.jsx` 파일을 수정하여, 로그인 성공 후의 동작을 개선합니다. `redirect` 검색 파라미터가 있다면 해당 경로로, 없다면 기본 경로(예: `/profile`)로 이동하도록 만듭니다.

```jsx
// src/routes/login.jsx (수정)
import { createFileRoute, useNavigate } from '@tanstack/react-router';
// ...

// search 파라미터 스키마 정의
const fallback = '/profile';
const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(fallback),
});

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const handleLogin = () => {
    login();
    // 로그인 성공 후, redirect 경로로 이동
    navigate({ to: redirect });
  };

  // ...
}
```

이 과정을 통해 사용자가 보호된 페이지에 접근 시 자동으로 로그인 페이지로 안내되고, 로그인 후에는 원래 보려던 페이지로 자연스럽게 돌아가는 이상적인 인증 흐름을 완성할 수 있습니다.
