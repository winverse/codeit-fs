import { Routes, Route, Link } from 'react-router';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
