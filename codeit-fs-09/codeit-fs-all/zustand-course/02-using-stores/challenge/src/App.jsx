import { MemoForm } from '@/components/MemoForm';
import { MemoFilter } from '@/components/MemoFilter';
import { MemoSearch } from '@/components/MemoSearch';
import { MemoList } from '@/components/MemoList';
import '@/styles/App.css';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🗂️ Memo Manager</h1>
        <p>Using Stores 실습 - 메모 관리 앱</p>
      </header>

      <main className="main">
        <div className="sidebar">
          <MemoForm />
          <MemoFilter />
        </div>

        <div className="content">
          <MemoSearch />
          <MemoList />
        </div>
      </main>

      <footer className="footer">
        <p>📚 Challenge: Selector Pattern & State Management Practice</p>
      </footer>
    </div>
  );
}
