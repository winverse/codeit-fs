import './App.css';
import { ProductDashboard } from '@/components/ProductDashboard/ProductDashboard';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>상품 관리 대시보드 (챌린지)</h1>
        <p>성능 최적화 챌린지</p>
      </header>
      <main className="main">
        <ProductDashboard />
      </main>
    </div>
  );
}