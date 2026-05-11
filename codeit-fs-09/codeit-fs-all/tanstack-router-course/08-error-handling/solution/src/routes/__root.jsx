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
                <div className="user-info">
                  안녕하세요, {user.name}님!
                </div>
                <button className="btn btn-sm" onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <NavLink to="/auth/login" className="btn btn-sm">
                로그인
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <ul>
            <li>
              <NavLink to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories">
                Categories
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                {user?.role === 'admin' && (
                  <li>
                    <NavLink to="/admin">
                      Admin
                    </NavLink>
                  </li>
                )}
              </>
            )}
            <li>
              <NavLink to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}