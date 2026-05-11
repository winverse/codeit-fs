import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminComponent,
  errorComponent: ({ error }) => (
    <div className="error-container admin-error">
      <h2>Access Denied ⚠️</h2>
      <p>You don't have permission to access the admin panel:</p>
      <div className="error-details">
        <code>{error.message}</code>
      </div>
      <div className="error-actions">
        <a href="/posts" className="btn btn-primary">
          📄 Browse Posts
        </a>
        <a href="/" className="btn btn-secondary">
          🏠 Go Home
        </a>
      </div>
      <div className="error-help">
        <h4>Need admin access?</h4>
        <p>Contact your system administrator to request proper permissions.</p>
      </div>
    </div>
  ),
  beforeLoad: () => {
    // Simulate authorization check
    const isAdmin = Math.random() < 0.3; // 30% chance to be admin
    if (!isAdmin) {
      throw new Error("Insufficient permissions: Admin access required");
    }
  },
  loader: async () => {
    return await fetchAdminData();
  },
});

async function fetchAdminData() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    stats: {
      totalPosts: 156,
      totalAuthors: 12,
      totalViews: 45672,
      activeUsers: 1234,
    },
    recentActivity: [
      {
        id: 1,
        type: "post_published",
        message:
          'New post "Advanced Error Patterns" published by Sarah Johnson',
        timestamp: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        type: "user_registered",
        message: "5 new users registered today",
        timestamp: "2024-01-15T09:15:00Z",
      },
      {
        id: 3,
        type: "comment_flagged",
        message: 'Comment flagged for review on "React Best Practices"',
        timestamp: "2024-01-15T08:45:00Z",
      },
    ],
    systemHealth: {
      api: "healthy",
      database: "healthy",
      cdn: "warning",
      monitoring: "healthy",
    },
  };
}

function AdminComponent() {
  const adminData = Route.useLoaderData();

  return (
    <div className="admin">
      <div className="admin-header">
        <h1>Admin Dashboard ⚙️</h1>
        <p>System overview and management tools</p>
      </div>

      <div className="admin-content">
        <section className="admin-stats">
          <h2>Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-info">
                <span className="stat-number">
                  {adminData.stats.totalPosts}
                </span>
                <span className="stat-label">Total Posts</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <span className="stat-number">
                  {adminData.stats.totalAuthors}
                </span>
                <span className="stat-label">Authors</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-info">
                <span className="stat-number">
                  {adminData.stats.totalViews.toLocaleString()}
                </span>
                <span className="stat-label">Total Views</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🟢</div>
              <div className="stat-info">
                <span className="stat-number">
                  {adminData.stats.activeUsers}
                </span>
                <span className="stat-label">Active Users</span>
              </div>
            </div>
          </div>
        </section>

        <section className="admin-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {adminData.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === "post_published" && "📝"}
                  {activity.type === "user_registered" && "👤"}
                  {activity.type === "comment_flagged" && "🚩"}
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-health">
          <h2>System Health</h2>
          <div className="health-grid">
            {Object.entries(adminData.systemHealth).map(([service, status]) => (
              <div key={service} className={`health-item ${status}`}>
                <div className="health-service">{service.toUpperCase()}</div>
                <div className={`health-status ${status}`}>
                  {status === "healthy" && "✅ Healthy"}
                  {status === "warning" && "⚠️ Warning"}
                  {status === "error" && "❌ Error"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-actions">
          <h2>Admin Actions</h2>
          <div className="action-buttons">
            <button className="btn btn-primary">Manage Posts</button>
            <button className="btn btn-secondary">Manage Users</button>
            <button className="btn btn-outline">View Analytics</button>
            <button className="btn btn-danger">System Maintenance</button>
          </div>
        </section>
      </div>
    </div>
  );
}
