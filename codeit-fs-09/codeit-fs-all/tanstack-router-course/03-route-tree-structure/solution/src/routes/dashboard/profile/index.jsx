import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/profile/')({
  component: () => <div><h3>Profile</h3><p>This is your user profile.</p></div>,
});
