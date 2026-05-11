import { UserDashboard } from '@/components/UserDashboard';
import '@/styles/App.css';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>✅ Performance Dashboard (최적화됨)</h1>
          <p>Performance Optimization 솔루션 - 최적화된 사용자 관리 대시보드</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <UserDashboard />
          
          <div className="debug-info">
            <strong>✅ 성능 최적화 적용됨:</strong>
            <br />
            • useShallow를 사용한 선택적 구독
            <br />
            • 메모이제이션된 셀렉터로 계산 최적화
            <br />
            • React.memo를 사용한 컴포넌트 메모이제이션
            <br />
            • 액션 함수만 구독하여 불필요한 리렌더링 방지
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>🎉 최적화 완료: useShallow, 메모이제이션, React.memo 적용!</p>
        </div>
      </footer>
      <PerformanceMonitor />
    </div>
  );
}
��용!</p>
        </div>
      </footer>
    </div>
  );
}
