import { useTheme } from '../../context/ThemeContext';
import styles from './Content.module.css';

export function Content() {
  const { theme } = useTheme();
  return (
    <main className={styles.content}>
      <h2>{theme === 'light' ? '라이트 모드' : '다크 모드'} 입니다.</h2>
      <p>This is the main content of the page. Welcome to our website!</p>
    </main>
  );
}
