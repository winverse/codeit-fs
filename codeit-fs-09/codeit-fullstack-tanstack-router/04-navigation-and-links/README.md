# 4. 고급 네비게이션과 링크

이번 챕터에서는 TanStack Router의 고급 네비게이션 기능을 배웁니다. React의 `useContext`를 사용해 앱 전역에 걸쳐 인증 상태를 관리하고, 이 상태에 따른 동적 라우팅, 활성 링크 스타일링, 프로그래매틱 네비게이션과 네비게이션 가드를 구현하는 방법을 익힙니다.

## 학습 목표

- React Context API (`useContext`)를 라우터와 함께 사용하여 전역 상태를 관리할 수 있다.
- `activeProps`를 활용해 활성 상태 링크 스타일링을 구현할 수 있다.
- 인증 상태에 따라 동적으로 네비게이션 메뉴를 제어할 수 있다.
- `<Navigate>` 컴포넌트를 사용해 특정 조건에서 라우트를 리디렉션(가드)할 수 있다.
- `useNavigate` 훅을 사용해 프로그래매틱하게 페이지를 이동시킬 수 있다.

## 주요 개념

- **React Context & State Management**: React의 `useContext` 훅을 사용하여 라우터 외부에서 상태(예: 인증)를 관리하고 앱 전역에 공유합니다.
- **Active Link Styling**: 현재 활성화된 라우트의 링크에 `activeProps`를 사용해 선언적으로 스타일을 적용하는 기능입니다.
- **Conditional Navigation**: 사용자 상태나 권한에 따라 네비게이션 UI를 동적으로 변경하는 패턴입니다.
- **Navigation Guard**: 특정 라우트에 접근하기 전에 컴포넌트 내부에서 조건을 확인하고, 조건이 맞지 않으면 다른 라우트로 리디렉션하는 기능입니다.

---

## 프로젝트 구현 과정

현재 프로젝트는 아래 단계에 따라 구현되었습니다.

### 1단계: 인증 컨텍스트 생성 (`AuthContext.jsx`)

`src/AuthContext.jsx` 파일을 생성하여 애플리케이션의 인증 상태를 관리하는 `AuthProvider`와 `useAuth` 훅을 정의합니다.

```jsx
// src/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### 2단계: `main.jsx`에 `AuthProvider` 적용

`src/main.jsx`를 수정하여 앱 전체를 `AuthProvider`로 감싸, 모든 컴포넌트가 인증 컨텍스트에 접근할 수 있도록 합니다.

```jsx
// src/main.jsx (수정)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.js'
import { AuthProvider } from './AuthContext'
import './index.css'

const router = createRouter({ routeTree })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
```

### 3단계: Root Route 업데이트 (`__root.jsx`)

`src/routes/__root.jsx`를 수정하여 `useAuth` 훅으로 인증 상태를 가져오고, 이에 따라 'Profile' 링크와 'Login'/'Logout' 버튼을 동적으로 렌더링합니다. `activeProps`를 사용해 활성 링크 스타일링을 적용합니다.

```jsx
// src/routes/__root.jsx (수정)
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useAuth } from '../AuthContext'

function RootComponent() {
  const auth = useAuth()
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="nav-link" activeProps={{ className: 'active' }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link"
              activeProps={{ className: 'active' }}
            >
              About
            </Link>
          </li>
          {auth.isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="nav-link"
                activeProps={{ className: 'active' }}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
        <div className="auth-status">
          {auth.isAuthenticated ? (
            <button onClick={() => auth.logout()}>Logout</button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
```

### 4단계: 로그인 페이지 및 프로그래매틱 네비게이션 (`login.jsx`)

로그인 페이지(`src/routes/login.jsx`)를 생성합니다. 여기서 `useNavigate` 훅을 사용한 프로그래매틱 네비게이션과, 이미 로그인된 사용자를 위한 리디렉션 가드(`Navigate` 컴포넌트)를 구현합니다.

```jsx
// src/routes/login.jsx (새로 생성)
import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../AuthContext'

function LoginComponent() {
  const auth = useAuth()
  const navigate = useNavigate()

  if (auth.isAuthenticated) {
    return <Navigate to="/profile" />
  }

  const handleLogin = () => {
    auth.login()
    navigate({ to: '/profile' })
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <p>Click the button to log in.</p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login
      </button>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})
```

### 5단계: 보호된 라우트와 네비게이션 가드 (`profile.jsx`)

로그인한 사용자만 접근할 수 있는 `profile` 페이지(`src/routes/profile.jsx`)를 생성합니다. 컴포넌트 내부에서 `useAuth` 훅으로 인증 상태를 확인하고, 비로그인 시 `Navigate` 컴포넌트를 통해 로그인 페이지로 리디렉션하는 네비게이션 가드를 구현합니다.

```jsx
// src/routes/profile.jsx (새로 생성)
import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../AuthContext'

function ProfileComponent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div className="page-content">
      <h2>Profile</h2>
      <p>Welcome! You are logged in.</p>
    </div>
  )
}

export const Route = createFileRoute('/profile')({
  component: ProfileComponent,
})
```

### 6단계: `useNavigate` 추가 예시 (`about.jsx`)

`about.jsx` 페이지에 `useNavigate` 훅을 사용하여 프로그래밍 방식으로 홈으로 돌아가는 버튼을 추가합니다.

```jsx
// src/routes/about.jsx (일부)
// ...
import { createFileRoute, useNavigate } from '@tanstack/react-router'

function AboutComponent() {
  const navigate = useNavigate()

  return (
    <div>
      {/* ... */}
      <button className="btn mt-2" onClick={() => navigate({ to: '/' })}>
        Go Home (useNavigate)
      </button>
    </div>
  )
}
// ...
```