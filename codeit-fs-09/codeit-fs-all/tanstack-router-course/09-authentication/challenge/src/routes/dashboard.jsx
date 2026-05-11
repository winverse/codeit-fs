import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  // TODO: 2. 여기에 beforeLoad 가드를 구현하세요.
  // HINT: context.auth.isAuthenticated를 확인하고, false이면 '/login'으로 리디렉션시키세요.
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>Welcome! You can only see this page if you are logged in.</p>
    </div>
  );
}
