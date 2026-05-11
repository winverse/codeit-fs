import { useAuth } from '@/contexts/AuthContext';
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, logout } = useAuth();
  // TODO: useAuth 훅을 사용하여 isAuthenticated, logout 함수를 가져오세요.
  return (
    <div className="app-layout">
      <header className="header">
        <div className="header-content">
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              Auth Challenge
            </Link>
          </h1>
          <div className="user-actions">
            {/* TODO: isAuthenticated 상태에 따라 조건부 렌더링을 구현하세요. */}
            {/* 로그인 상태: "Profile" 링크와 "Logout" 버튼 */}
            {/* 로그아웃 상태: "Login" 링크 */}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="btn btn-sm">
                  Profile
                </Link>
                <button onClick={logout} className="btn btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm">
                Login
              </Link>
            )}
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* TODO: 로그인 상태일 때만 "Profile" 링크를 여기에 렌더링하세요. */}
            {isAuthenticated && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
