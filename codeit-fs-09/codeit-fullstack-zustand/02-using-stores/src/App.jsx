import { TodoInput } from '@/components/TodoInput';
import { TodoFilter } from '@/components/TodoFilter';
import { TodoList } from '@/components/TodoList';
import '@/styles/App.css';

export function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>📝 Zustand Todo App</h1>
        <p>스토어 사용하기 실습</p>
      </header>

      <main className="main">
        <TodoInput />
        <TodoFilter />
        <TodoList />
      </main>

      <footer className="footer">
        <p>📚 Chapter 02: Using Stores - Selector Pattern & State Updates</p>
      </footer>
    </div>
  );
}
