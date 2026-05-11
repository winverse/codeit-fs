import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>Auth Challenge</h1>
          <div className="user-actions">
            {isAuthenticated ? (
              <button onClick={logout} className="btn btn-sm">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
