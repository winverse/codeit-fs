import { CounterAdvanced } from '@/components/CounterAdvanced';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>createSlice 심화 학습</h1>
        <p className={styles.subtitle}>
          prepare 함수와 복잡한 리듀서 로직 구현
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2>createSlice의 고급 기능들</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🛠 prepare 함수</h3>
              <p>액션 페이로드를 사전 처리하고 메타데이터 추가</p>
            </div>
            <div className={styles.feature}>
              <h3>🔄 복잡한 리듀서</h3>
              <p>여러 상태를 동시에 업데이트하는 로직</p>
            </div>
            <div className={styles.feature}>
              <h3>📝 Immer 활용</h3>
              <p>중첩된 객체와 배열의 불변성 관리</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>고급 카운터 예제</h2>
          <p className={styles.description}>
            incrementByAmount 액션과 타임스탬프를 포함한 히스토리 기능을 
            구현해보겠습니다.
          </p>
          <CounterAdvanced />
        </div>
      </main>
    </div>
  );
}