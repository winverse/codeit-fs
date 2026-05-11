import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/profile')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your protected profile page. You can only see this if you are logged in.</p>
    </div>
  );
}
