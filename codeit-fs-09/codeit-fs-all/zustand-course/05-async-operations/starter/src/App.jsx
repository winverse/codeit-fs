import './App.css';
import { PostFeed } from '@/components/PostFeed/PostFeed';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>소셜 미디어 앱 (비동기 작업)</h1>
        <p>비동기 작업 처리 시작 프로젝트</p>
      </header>
      <main className="main">
        <PostFeed />
      </main>
    </div>
  );
}