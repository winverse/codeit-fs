import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import { HomePage } from './pages/Home';
import { CommunityPage } from './pages/Community';
import { CommunityHomePage } from './pages/CommunityHome';
import { NewPostPage } from './pages/NewPost';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<HomePage />} />
        <Route path="community" element={<CommunityPage />}>
          {/* TODO: CommunityPage의 자식 경로들을 설정하세요. */}
          {/* HINT: index route와 new-post 경로를 추가합니다. */}
        </Route>
      </Route>
    </Routes>
  );
}
