import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  return (
    <div className="page-content">
      <h2>Profile</h2>
      <p>Welcome! You are logged in.</p>
    </div>
  );
}
