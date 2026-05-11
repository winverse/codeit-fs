import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import styles from "./__root.module.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            🏪 ShopHub
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/"
              className={styles.navLink}
              activeProps={{
                className: styles.active,
              }}
            >
              🏠 홈
            </Link>
            <Link
              to="/products"
              className={styles.navLink}
              activeProps={{
                className: styles.active,
              }}
            >
              📦 상품 목록
            </Link>
            <Link
              to="/categories"
              className={styles.navLink}
              activeProps={{
                className: styles.active,
              }}
            >
              🏷️ 카테고리
            </Link>
          </nav>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});