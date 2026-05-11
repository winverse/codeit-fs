import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/settings/')({
  component: () => <div><h3>Settings</h3><p>Manage your settings here.</p></div>,
});
