// TODO: likeStore에서 useLikeStore를 import하세요
// import { useLikeStore } from '@/stores/likeStore';
// TODO: 컴포넌트들을 import하세요
// import { LikeButton } from '@/components/LikeButton';
// import { LikeStatus } from '@/components/LikeStatus';
import '@/styles/App.css';
import { LikeStatus } from './components/LikeStatus';
import { LikeButton } from './components/LikeButton';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>❤️ Zustand 좋아요 챌린지</h1>
        <p>좋아요 카운터를 완성해보세요!</p>
      </header>

      <main className="main">
        {/* TODO: LikeButton 컴포넌트를 여기에 추가하세요 */}
        <div className="placeholder-component">
          <h3>🔧 LikeButton 컴포넌트가 들어갈 자리</h3>

          <LikeButton />
        </div>

        {/* TODO: LikeStatus 컴포넌트를 여기에 추가하세요 */}
        <div className="placeholder-component">
          <h3>📊 LikeStatus 컴포넌트가 들어갈 자리</h3>
          <LikeStatus />
        </div>
      </main>
    </div>
  );
}
