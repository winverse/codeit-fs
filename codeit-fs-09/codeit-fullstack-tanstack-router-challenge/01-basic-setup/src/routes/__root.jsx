import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <ul>
          <li>
            {/* TODO: Add activeProps to apply active styles */}
            <Link to="/" activeProps={{ className: 'active' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" activeProps={{ className: 'active' }}>
              About
            </Link>
          </li>
          {/* TODO: Add a link to the Contact page here */}
          <li>
            <Link to="/contact" activeProps={{ className: 'active' }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  ),
});
