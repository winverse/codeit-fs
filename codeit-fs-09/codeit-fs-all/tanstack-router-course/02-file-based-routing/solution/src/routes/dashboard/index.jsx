import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: () => (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </div>
  ),
});
