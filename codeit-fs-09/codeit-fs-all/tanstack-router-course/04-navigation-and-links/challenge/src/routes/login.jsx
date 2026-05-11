import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  // TODO: useAuth 훅에서 login 함수를 가져오세요.
  const { login } = useAuth();
  // TODO: useNavigate 훅을 사용하여 navigate 함수를 가져오세요.

  const handleLogin = () => {
    // TODO: login 함수를 호출하세요.
    // TODO: 로그인이 성공하면, navigate 함수를 사용하여 '/profile' 경로로 이동시키세요.
    login();
    console.log('TODO: Navigate to /profile');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="text-center mb-2">
        Click the button below to log in.
      </p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login as Student
      </button>
    </div>
  );
}
