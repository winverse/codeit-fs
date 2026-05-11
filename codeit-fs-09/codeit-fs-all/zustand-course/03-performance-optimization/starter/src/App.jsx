import { UserDashboard } from '@/components/UserDashboard';
import { UserFilter } from '@/components/UserFilter';
import '@/styles/App.css';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>📊 Performance Dashboard</h1>
          <p>Performance Optimization 실습 - 사용자 관리 대시보드</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <UserFilter />
          <UserDashboard />
          
          <div className="debug-info">
            <strong>🐛 성능 디버그 정보:</strong>
            <br />
            • 콘솔을 확인하여 렌더링 횟수를 관찰하세요
            <br />
            • 필터를 변경할 때마다 불필요한 리렌더링이 발생합니다
            <br />
            • TODO 주석을 확인하여 성능 최적화 포인트를 찾아보세요
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>🚀 Challenge: useShallow와 메모이제이션으로 성능을 최적화해보세요!</p>
        </div>
      </footer>
    </div>
  );
}
