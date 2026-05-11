import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="page-content">
      <h1>About Page</h1>
      <p>
        This is the about page. You can learn more about TanStack Router here.
      </p>
      <div className="info-box about">
        <h2>Key Features</h2>
        <ul>
          <li>File-based routing</li>
          <li>Type-safe navigation</li>
          <li>Built-in code splitting</li>
          <li>Search parameter management</li>
        </ul>
      </div>
    </div>
  ),
});
