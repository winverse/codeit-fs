import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';
import { z } from 'zod';

// 로그인 성공 후 돌아갈 기본 경로
const fallback = '/profile';

// `redirect` 검색 파라미터에 대한 스키마를 정의합니다.
const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(fallback),
});

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  // validateSearch로 검증된 search 파라미터를 가져옵니다.
  const { redirect } = Route.useSearch();

  const handleLogin = () => {
    login();
    // 로그인 후, `redirect` 경로로 이동합니다.
    navigate({ to: redirect });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Click the button below to log in and access protected pages.
      </p>
      <button onClick={handleLogin} className="btn btn-full-width">
        Login
      </button>
    </div>
  );
}
