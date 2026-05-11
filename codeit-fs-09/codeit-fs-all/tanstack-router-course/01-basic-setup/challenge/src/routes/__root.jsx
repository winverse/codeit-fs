import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <ul>
          <li>
            {/* TODO: Add activeProps to apply active styles */}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {/* TODO: Add a link to the Contact page here */}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  ),
});
