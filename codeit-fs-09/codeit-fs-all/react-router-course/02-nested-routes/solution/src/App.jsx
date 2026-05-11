import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import { HomePage } from './pages/Home';
import { CommunityPage } from './pages/Community';
import { CommunityHomePage } from './pages/CommunityHome';
import { NewPostPage } from './pages/NewPost';
import { ProfilePage } from './pages/Profile';
import { MyInfoPage } from './pages/MyInfo';
import { EditProfilePage } from './pages/EditProfile';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="community" element={<CommunityPage />}>
          <Route index element={<CommunityHomePage />} />
          <Route path="new-post" element={<NewPostPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<MyInfoPage />} />
          <Route path="edit" element={<EditProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
