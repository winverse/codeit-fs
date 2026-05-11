import styles from './Counter.module.css';

export function Counter({ count, onIncrement, onDecrement, onReset }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>카운터</h3>
      
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      
      <div className={styles.controls}>
        <button onClick={onDecrement} className={styles.button}>
          -1
        </button>
        <button onClick={onReset} className={styles.resetButton}>
          Reset
        </button>
        <button onClick={onIncrement} className={styles.button}>
          +1
        </button>
      </div>

      <div className={styles.status}>
        <p>📊 현재 상태: <strong>로컬 useState</strong></p>
        <p>🎯 목표: Redux Toolkit 스토어로 변환</p>
      </div>
    </div>
  );
}