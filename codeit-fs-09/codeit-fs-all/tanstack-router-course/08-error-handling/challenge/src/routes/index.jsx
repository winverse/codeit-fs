import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to BlogHub 📝</h1>
        <p>
          A modern blog management system showcasing TanStack Router's powerful
          error handling capabilities.
        </p>
        <div className="hero-actions">
          <a href="/posts" className="btn btn-primary">
            Browse Posts
          </a>
          <a href="/authors" className="btn btn-secondary">
            Meet Authors
          </a>
        </div>
      </section>

      <section className="features">
        <h2>Error Handling Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔄 Retry Mechanisms</h3>
            <p>Automatic retry for failed API calls with exponential backoff</p>
          </div>
          <div className="feature-card">
            <h3>🎭 Fallback UI</h3>
            <p>Graceful degradation with meaningful error messages</p>
          </div>
          <div className="feature-card">
            <h3>📊 Error Boundaries</h3>
            <p>Route-level error handling to prevent app crashes</p>
          </div>
          <div className="feature-card">
            <h3>🚨 Error Recovery</h3>
            <p>Smart error recovery patterns and user guidance</p>
          </div>
        </div>
      </section>

      <section className="demo-scenarios">
        <h2>Try These Error Scenarios</h2>
        <div className="scenario-list">
          <div className="scenario">
            <h4>📄 Posts Section</h4>
            <p>Simulates network failures and loading states</p>
          </div>
          <div className="scenario">
            <h4>👥 Authors Section</h4>
            <p>Demonstrates graceful error handling for missing data</p>
          </div>
          <div className="scenario">
            <h4>⚙️ Admin Section</h4>
            <p>Shows authorization errors and access restrictions</p>
          </div>
        </div>
      </section>
    </div>
  );
}
