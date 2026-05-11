import { Outlet, Link } from '@tanstack/react-router';

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h3>Dashboard</h3>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" activeProps={{ className: 'active' }} activeOptions={{ exact: true }}>
                Overview
              </Link>
            </li>
            <li>
              <Link to="/dashboard/analytics" activeProps={{ className: 'active' }}>
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" activeProps={{ className: 'active' }}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" activeProps={{ className: 'active' }}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
