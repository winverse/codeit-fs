import { Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';
import { NotFoundPage } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* /legacy-profile 경로로 접속하면 /profile 로 리다이렉트합니다. */}
      <Route
        path="/legacy-profile"
        element={<Navigate to="/profile" replace />}
      />
      {/* 실습 과제: /home 경로를 / 로 리다이렉트 */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      {/* 위의 어떤 경로와도 일치하지 않으면 NotFoundPage를 보여줍니다. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
