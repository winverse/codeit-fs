import { Routes, Route, Navigate } from 'react-router';
import { PostListPage } from './pages/PostList';
import { PostDetailPage } from './pages/PostDetail';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<PostListPage />} />
      {/* TODO: /posts/:postId 경로를 설정하세요. */}
      {/* HINT: path prop에 ':'를 사용하여 동적 세그먼트를 정의할 수 있습니다. */}
    </Routes>
  );
}