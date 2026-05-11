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
          <h1>Authentication</h1>
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
      <div className="container">
        <nav className="nav">
          <ul>
            <li><Link to="/" className="nav-link" activeProps={{ className: 'active' }}>Home</Link></li>
            <li><Link to="/profile" className="nav-link" activeProps={{ className: 'active' }}>Profile</Link></li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
