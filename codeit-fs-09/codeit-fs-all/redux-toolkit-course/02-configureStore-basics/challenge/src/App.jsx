import { EnvironmentInfo } from '@/components/EnvironmentInfo/EnvironmentInfo.jsx';
import { Counter } from '@/components/Counter/Counter.jsx';
import styles from '@/App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Chapter 02 Challenge: configureStore 환경별 설정</h1>
        <p>개발/프로덕션 환경에서 스토어 설정이 어떻게 달라지는지 확인해보세요</p>
      </header>

      <main className={styles.main}>
        <EnvironmentInfo />
        <Counter />
      </main>
    </div>
  );
}