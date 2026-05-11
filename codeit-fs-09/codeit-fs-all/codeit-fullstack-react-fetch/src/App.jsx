import { PostProvider } from '@/providers/PostProvider';
import { PostList } from './pages/HomePage/PostList';
import { AddPostForm } from './pages/HomePage/AddPostForm';
import { HomeLayout } from './pages/HomePage/HomeLayout';

function App() {
  return (
    <PostProvider>
      <HomeLayout />
    </PostProvider>
  );
}

export default App;
