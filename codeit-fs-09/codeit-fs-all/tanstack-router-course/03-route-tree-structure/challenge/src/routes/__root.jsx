import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="root-nav">
        <ul>
          <li>
            <Link to="/" activeProps={{ className: "active" }}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/about" activeProps={{ className: "active" }}>
              ℹ️ About
            </Link>
          </li>
          {/* TODO: Admin 섹션 링크를 여기에 추가하세요 */}
        </ul>
      </nav>
      <main className="root-main">
        <Outlet />
      </main>
    </>
  ),
});
