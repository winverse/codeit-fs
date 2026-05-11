import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="page-content">
      <h1>Welcome to TanStack Router!</h1>
      <p>This is the home page. Navigate using the links above.</p>
      <div className="info-box">
        <h2>Getting Started</h2>
        <p>
          Edit this file at <code>src/routes/index.tsx</code> to get started!
        </p>
      </div>
    </div>
  ),
});
