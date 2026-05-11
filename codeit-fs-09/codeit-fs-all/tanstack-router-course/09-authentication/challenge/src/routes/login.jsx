import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  // TODO: 3. useAuth 훅에서 login 함수를 가져오세요.
  const { login } = useAuth();
  // TODO: 3. useNavigate 훅을 사용하여 navigate 함수를 가져오세요.
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: 3. login 함수를 호출한 후, navigate 함수를 사용하여 '/dashboard'로 이동시키세요.
    login();
    console.log('TODO: Navigate to /dashboard');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login Required</h1>
      <p className="text-center mb-2">
        You need to log in to access the dashboard.
      </p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login
      </button>
    </div>
  );
}
