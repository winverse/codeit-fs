import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/profile")({
  component: () => (
    <div className="page-content">
      <h1>Profile Settings</h1>
      <p>Manage your profile.</p>
    </div>
  ),
});
