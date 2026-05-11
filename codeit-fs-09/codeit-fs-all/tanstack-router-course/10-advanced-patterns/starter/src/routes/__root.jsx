import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="nav-link" activeProps={{ className: 'active' }}>
              Home
            </Link>
          </li>
          {/* TODO: Add a link to the Heavy Component page here */}
        </ul>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
