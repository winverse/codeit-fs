# 4. 고급 네비게이션과 링크

이번 챕터에서는 TanStack Router의 고급 네비게이션 기능을 배웁니다. `createRootRouteWithContext`를 사용하여 라우터에 전역 컨텍스트를 제공하고, 인증 상태에 따른 동적 라우팅, 활성 링크 스타일링, 그리고 프로그래매틱 네비게이션과 네비게이션 가드를 구현하는 방법을 익힙니다.

## 학습 목표

- `createRootRouteWithContext`를 사용하여 라우터 컨텍스트를 설정할 수 있다.
- `activeProps`와 `inactiveProps`를 활용해 커스텀 `NavLink` 컴포넌트를 만들고 활성 상태 스타일링을 구현할 수 있다.
- 인증 상태에 따라 동적으로 네비게이션 메뉴를 제어할 수 있다.
- `<Navigate>` 컴포넌트를 사용해 특정 조건에서 라우트를 리디렉션(가드)할 수 있다.
- `useNavigate` 훅을 사용해 프로그래매틱하게 페이지를 이동시킬 수 있다.

## 주요 개념

- **Router Context**: 라우터 전체에서 공유되는 데이터(예: 인증 상태)와 상태를 관리하는 시스템입니다.
- **`createRootRouteWithContext`**: 컨텍스트를 포함한 루트 라우트를 생성하는 함수입니다.
- **Active Link Styling**: 현재 활성화된 라우트의 링크에 `activeProps`를 사용해 선언적으로 스타일을 적용하는 기능입니다.
- **Conditional Navigation**: 사용자 상태나 권한에 따라 네비게이션 UI를 동적으로 변경하는 패턴입니다.
- **Navigation Guard**: 특정 라우트에 접근하기 전에 조건을 확인하고, 조건이 맞지 않으면 다른 라우트로 리디렉션하는 기능입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 인증 컨텍스트 생성 (`AuthContext.jsx`)

`src/contexts/AuthContext.jsx` 파일을 생성하여 애플리케이션의 인증 상태를 관리합니다.

```jsx
// src/contexts/AuthContext.jsx (새로 생성)
// ... (이전과 동일한 내용)
```

### 2단계: 커스텀 NavLink 컴포넌트 생성 (`NavLinks.jsx`)

`src/components/NavLinks.jsx` 파일을 생성하여 재사용 가능한 링크 컴포넌트를 만듭니다.

```jsx
// src/components/NavLinks.jsx (새로 생성)
// ... (이전과 동일한 내용)
```

### 3단계: Router Context와 함께 Root Route 업데이트 (`__root.jsx`)

`src/routes/__root.jsx`를 수정하여 `createRootRouteWithContext`로 `AuthContext`를 라우터에 주입하고, 인증 상태에 따라 네비게이션 메뉴를 동적으로 렌더링합니다. 모든 스타일은 `className`을 통해 적용합니다.

```jsx
// src/routes/__root.jsx (수정)
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { NavLink } from '../components/NavLinks'

export const Route = createRootRouteWithContext()({
  component: RootComponent,
})

function RootComponent() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="app-layout">
      <header className="header">
        <div className="header-content">
          <h1>TanStack Router Advanced</h1>
          <div className="user-actions">
            {isAuthenticated ? (
              <>
                <div className="user-info">안녕하세요, {user.name}님!</div>
                <button className="btn btn-sm" onClick={logout}>로그아웃</button>
              </>
            ) : (
              <NavLink to="/auth/login" className="btn btn-sm">로그인</NavLink>
            )}
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/categories">Categories</NavLink></li>
            {isAuthenticated && (
              <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                {user?.role === 'admin' && (
                  <li><NavLink to="/admin">Admin</NavLink></li>
                )}
              </>
            )}
            <li><NavLink to="/about">About</NavLink></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
```

### 4단계: 인증 페이지 생성 (`login.jsx`)

로그인 페이지(`src/routes/auth/login.jsx`)를 생성합니다. 네비게이션 가드와 프로그래매틱 네비게이션을 모두 실습하며, 모든 스타일은 `className`으로 적용합니다.

```jsx
// src/routes/auth/login.jsx (새로 생성)
import { createFileRoute, useNavigate, Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage
})

function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(credentials.username, credentials.password)
    if (result.success) {
      navigate({ to: '/dashboard' })
    } else {
      setError(result.error)
    }
  }

  const handleInputChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">사용자명</label>
          <input
            type="text" id="username" name="username"
            value={credentials.username} onChange={handleInputChange}
            className="form-control" placeholder="admin 또는 user"
            required disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input
            type="password" id="password" name="password"
            value={credentials.password} onChange={handleInputChange}
            className="form-control" placeholder="password"
            required disabled={isLoading}
          />
        </div>
        <button type="submit" className="btn btn-full-width" disabled={isLoading}>
          {isLoading ? <><span className="spinner"></span>로그인 중...</> : '로그인'}
        </button>
      </form>
      <div className="alert alert-info">
        <h4>테스트 계정</h4>
        <p><strong>관리자:</strong> admin / password</p>
        <p><strong>일반 사용자:</strong> user / password</p>
      </div>
    </div>
  )
}
```
