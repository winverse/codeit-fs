import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: () => <div><h3>Dashboard Overview</h3><p>Welcome! This is the main dashboard page.</p></div>,
});
