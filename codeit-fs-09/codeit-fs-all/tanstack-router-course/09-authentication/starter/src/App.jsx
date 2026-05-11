import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.js';
import { useAuth } from './hooks/useAuth';

export function App() {
  const auth = useAuth();
  const router = createRouter({
    routeTree,
    context: {
      auth,
    },
  });

  return <RouterProvider router={router} />;
}
