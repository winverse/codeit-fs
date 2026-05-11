import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // TODO: useAuth 훅을 사용하여 isAuthenticated, login, logout 함수를 가져오세요.
  const isAuthenticated = false; // Placeholder
  const logout = () => {}; // Placeholder

  return (
    <div className="app-layout">
      <header className="header">
        <div className="header-content">
          <h1>Auth Challenge</h1>
          <div className="user-actions">
            {/* TODO: isAuthenticated 상태에 따라 조건부 렌더링을 구현하세요. */}
            {/* 로그인 상태: "Profile" 링크와 "Logout" 버튼 */}
            {/* 로그아웃 상태: "Login" 링크 */}
            <Link to="/login" className="btn btn-sm">Login</Link>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {/* TODO: 로그인 상태일 때만 "Profile" 링크를 여기에 렌더링하세요. */}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
