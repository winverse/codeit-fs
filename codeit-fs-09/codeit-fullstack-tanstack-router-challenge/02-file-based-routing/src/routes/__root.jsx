import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
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
          {/* TODO: Add links to the Services and Company pages here */}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  ),
});
