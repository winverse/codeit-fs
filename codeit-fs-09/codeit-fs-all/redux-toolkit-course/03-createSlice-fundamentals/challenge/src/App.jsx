import { GameScore } from '@/components/GameScore/GameScore.jsx';
import styles from '@/App.module.css';

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Chapter 03 Challenge: 게임 점수 관리 시스템</h1>
        <p>createSlice의 prepare 함수와 고급 리듀서 패턴을 연습해보세요</p>
      </header>

      <main className={styles.main}>
        <div className={styles.instructions}>
          <h2>🎯 학습 목표</h2>
          <ul>
            <li><strong>prepare 함수</strong>: 액션 페이로드를 사전 처리하고 메타데이터 추가</li>
            <li><strong>고급 리듀서</strong>: 여러 상태를 동시에 업데이트하는 복잡한 로직</li>
            <li><strong>Immer 활용</strong>: 중첩된 객체와 배열의 불변성 관리</li>
          </ul>
        </div>

        <GameScore />
      </main>
    </div>
  );
}