import { useState } from 'react';
import styles from './Counter.module.css';

export function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      
      <div className={styles.controls}>
        <button onClick={decrement} className={styles.button}>
          -1
        </button>
        <button onClick={reset} className={styles.resetButton}>
          Reset
        </button>
        <button onClick={increment} className={styles.button}>
          +1
        </button>
      </div>

      <p className={styles.note}>
        현재는 useState를 사용한 로컬 상태입니다.
        <br />
        다음 챕터에서 Redux Toolkit으로 변환해보겠습니다!
      </p>
    </div>
  );
}