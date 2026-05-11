import { Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';
import { NotFoundPage } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* TODO: /legacy-profile 경로로 접속하면 /profile 로 리다이렉트 시키세요. */}
      {/* HINT: Navigate 컴포넌트를 사용하고, replace prop을 true로 설정하세요. */}

      {/* TODO: 위의 어떤 경로와도 일치하지 않으면 NotFoundPage를 보여주세요. */}
      {/* HINT: path="*" 를 사용하면 모든 경로와 일치시킬 수 있습니다. */}
    </Routes>
  );
}