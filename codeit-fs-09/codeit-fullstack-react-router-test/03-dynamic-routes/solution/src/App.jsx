import { Routes, Route, Navigate } from 'react-router';
import { PostListPage } from './pages/PostList';
import { PostDetailPage } from './pages/PostDetail';
import { UserPage } from './pages/User';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/users/:userId" element={<UserPage />} />
    </Routes>
  );
}
