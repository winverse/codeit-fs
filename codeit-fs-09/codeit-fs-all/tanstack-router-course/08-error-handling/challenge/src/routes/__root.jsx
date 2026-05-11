import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouter();
  const isLoading = router.state.isLoading;

  return (
    <>
      <div className={`global-loader ${isLoading ? 'active' : ''}`}></div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="nav-link" activeProps={{ className: 'active' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="nav-link" activeProps={{ className: 'active' }}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

// TODO: 1. 여기에 NotFound 컴포넌트를 생성하세요.

// TODO: 2. 여기에 notFoundRoute를 정의하고 export 하세요.
