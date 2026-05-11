import { useState } from 'react';
// TODO: React-Redux 연동을 위해 필요한 import 추가
// import { Provider } from 'react-redux';
// import { store } from '@/app/store.js';

// TODO: 컴포넌트들 import 추가
// import { Counter } from '@/features/counter/Counter.jsx';

import styles from './App.module.css';

// 아직 React-Redux 연동이 안 된 상태
export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>React-Redux 통합 시작하기</h1>
        <p>Redux Toolkit과 React를 연동해봅시다!</p>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2>현재 상태: 로컬 useState 사용 중</h2>
          <div className={styles.counter}>
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>카운트: {count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p className={styles.note}>
            ↑ 이것을 Redux로 바꿔봅시다!
          </p>
        </div>

        <div className={styles.todo}>
          <h3>📝 구현할 것들</h3>
          <ul>
            <li>✅ Redux Store 설정 완료</li>
            <li>❌ Provider 컴포넌트 설정</li>
            <li>❌ useSelector로 상태 읽기</li>
            <li>❌ useDispatch로 액션 디스패치</li>
            <li>❌ 커스텀 훅 (useAppSelector, useAppDispatch) 생성</li>
            <li>❌ 사용자 프로필 기능 추가</li>
            <li>❌ 성능 최적화 적용</li>
          </ul>
        </div>
      </main>
    </div>
  );
}