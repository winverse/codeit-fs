import { HomePage } from '@/pages/HomePage/HomePage';
import { PostProvider } from '@/providers/PostProvider';

function App() {
  return (
    <PostProvider>
      <HomePage />
    </PostProvider>
  );
}

export default App;
