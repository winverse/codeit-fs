import { Counter } from '@/components/Counter';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>챌린지: Redux Toolkit 기본 설정</h1>
        <p className={styles.subtitle}>
          스스로 Redux Toolkit을 설정해보세요!
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2>🎯 미션</h2>
          <div className={styles.todoList}>
            <div className={styles.todo}>
              <h3>1. Redux Toolkit 설정</h3>
              <ul>
                <li>✅ @reduxjs/toolkit과 react-redux 설치 완료</li>
                <li>📝 counterSlice.js 파일 생성 (TODO 완성하기)</li>
                <li>📝 store/index.js 파일 생성 (TODO 완성하기)</li>
              </ul>
            </div>
            <div className={styles.todo}>
              <h3>2. React와 연결</h3>
              <ul>
                <li>📝 main.jsx에서 Provider 설정하기</li>
                <li>📝 Counter 컴포넌트를 Redux로 변환하기</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>카운터 예제</h2>
          <Counter />
          <div className={styles.hint}>
            <p>💡 <strong>힌트:</strong></p>
            <p>TODO 주석을 찾아서 Redux Toolkit 코드를 완성해보세요!</p>
          </div>
        </div>
      </main>
    </div>
  );
}