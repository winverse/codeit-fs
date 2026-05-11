import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/archive')({
  component: () => (
    <div className="page-content">
      <h1>Blog Archive</h1>
      <p>Browse all our previous blog posts.</p>
    </div>
  ),
})
