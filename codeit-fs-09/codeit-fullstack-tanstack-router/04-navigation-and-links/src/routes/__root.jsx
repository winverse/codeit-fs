import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <nav className="nav">
        <ul></ul>
        <div className="auth-status"></div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
