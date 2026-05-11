import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import styles from './__root.module.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            <Link to="/" className={styles.logo}>
              🛍️ TechMart
            </Link>
            <nav className={styles.nav}>
              <Link 
                to="/" 
                className={styles.navLink}
                activeProps={{
                  className: styles.active
                }}
              >
                🏠 Home
              </Link>
              <Link 
                to="/products" 
                className={styles.navLink}
                activeProps={{
                  className: styles.active
                }}
              >
                📦 Products
              </Link>
              <Link 
                to="/categories" 
                className={styles.navLink}
                activeProps={{
                  className: styles.active
                }}
              >
                📂 Categories
              </Link>
            </nav>
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.userAction}>
              🛒 Cart (0)
            </div>
            <div className={styles.userAction}>
              👤 Account
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
      
      <TanStackRouterDevtools />
    </>
  ),
})
