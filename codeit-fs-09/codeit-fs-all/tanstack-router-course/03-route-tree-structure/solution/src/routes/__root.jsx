// src/routes/__root.jsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="root-nav">
        <ul>
          <li>
            <Link to="/" activeProps={{ className: 'active' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" activeProps={{ className: 'active' }}>
              About
            </Link>
          </li>
          <li>
            <Link to="/dashboard" activeProps={{ className: 'active' }}>
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <main className="root-main">
        <Outlet />
      </main>
    </>
  ),
});
