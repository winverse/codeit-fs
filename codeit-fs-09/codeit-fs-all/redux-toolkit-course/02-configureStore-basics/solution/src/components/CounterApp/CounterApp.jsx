import { Counter } from './Counter';
import { StoreInfo } from './StoreInfo';
import styles from './CounterApp.module.css';

export function CounterApp() {
  // 이제 상태 관리는 Redux 스토어에서 처리되므로
  // CounterApp 컴포넌트는 단순히 레이아웃만 담당
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Counter />
        <StoreInfo />
      </div>
    </div>
  );
}