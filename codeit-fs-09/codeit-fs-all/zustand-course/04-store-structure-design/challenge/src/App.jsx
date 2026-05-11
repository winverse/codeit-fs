import './App.css';
import { BookList } from '@/components/BookList/BookList';
import { BookSearch } from '@/components/BookSearch/BookSearch';
import { BookFilter } from '@/components/BookFilter/BookFilter';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>도서관 관리 시스템 (챌린지)</h1>
        <p>스토어 구조 설계 챌린지</p>
      </header>
      <main className="main">
        <div className="controls">
          <BookSearch />
          <BookFilter />
        </div>
        <BookList />
      </main>
    </div>
  );
}