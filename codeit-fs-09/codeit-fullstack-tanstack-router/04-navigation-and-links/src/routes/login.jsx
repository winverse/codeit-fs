import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const handleLogin = () => {};
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <p>Click the button to log in.</p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login
      </button>
    </div>
  );
}
