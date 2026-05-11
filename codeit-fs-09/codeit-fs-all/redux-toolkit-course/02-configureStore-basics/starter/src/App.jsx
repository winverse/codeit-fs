import { CounterApp } from '@/components/CounterApp';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>configureStore 기초</h1>
        <p className={styles.subtitle}>
          Redux 스토어 설정과 미들웨어 자동 구성 학습
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2>전통적인 Redux createStore vs Redux Toolkit configureStore</h2>
          <div className={styles.comparison}>
            <div className={styles.traditional}>
              <h3>전통적인 방식</h3>
              <ul className={styles.issues}>
                <li>복잡한 미들웨어 설정</li>
                <li>Redux DevTools Extension 수동 설정</li>
                <li>개발/운영 환경별 다른 설정</li>
                <li>직렬화 가능성 수동 검증</li>
              </ul>
            </div>
            <div className={styles.toolkit}>
              <h3>Redux Toolkit 방식</h3>
              <ul className={styles.benefits}>
                <li>✅ 자동 미들웨어 설정</li>
                <li>✅ DevTools Extension 자동 연동</li>
                <li>✅ 환경별 최적화 자동화</li>
                <li>✅ 개발 모드 안전성 검사 내장</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>카운터 예제</h2>
          <p className={styles.description}>
            아래 카운터는 현재 로컬 상태로 작동합니다. 
            이를 configureStore를 사용한 Redux 스토어로 변환해보겠습니다.
          </p>
          <CounterApp />
        </div>
      </main>
    </div>
  );
}