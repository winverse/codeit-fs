import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({
  component: () => (
    <div className="page-content">
      <h1>Blog</h1>
      <p>Welcome to our blog!</p>
    </div>
  ),
})
