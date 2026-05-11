import Counter from '@/features/counter/Counter';
import TodoList from '@/features/todos/TodoList';
import UserManager from '@/features/users/UserManager';
import styles from './App.module.css';

function App() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Redux Toolkit - Multiple Slices</h1>
        <p>여러 slice를 조합한 복합 상태 관리 예제입니다.</p>
      </header>

      <main className="grid">
        <section className="section">
          <Counter />
        </section>

        <section className="section">
          <TodoList />
        </section>

        <section className="section">
          <UserManager />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>각 기능은 독립적인 slice로 관리되며, 서로 다른 상태를 가집니다.</p>
      </footer>
    </div>
  );
}

export default App;