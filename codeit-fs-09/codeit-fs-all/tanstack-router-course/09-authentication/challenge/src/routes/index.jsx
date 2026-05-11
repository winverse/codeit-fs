import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="page-content">
      <h1>Welcome to the Authentication Challenge!</h1>
      <p>
        Try accessing the protected <strong>Dashboard</strong> page. You should be redirected to the login page.
      </p>
    </div>
  );
}
