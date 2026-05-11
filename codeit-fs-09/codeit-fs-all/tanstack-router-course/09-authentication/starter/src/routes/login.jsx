import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    // TODO: Modify this to navigate to the 'redirect' search param if it exists, or fallback to '/profile'
    navigate({ to: '/profile' });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Click the button below to log in.
      </p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login
      </button>
    </div>
  );
}
