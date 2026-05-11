import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/analytics/')({
  component: () => <div><h3>Analytics</h3><p>Here are the analytics.</p></div>,
});