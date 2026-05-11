import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="page-content">
      <h1>Welcome, {user.name}!</h1>
      <p>This is your protected profile page.</p>
    </div>
  );
}
