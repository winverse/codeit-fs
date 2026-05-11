import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '@/store/counterSlice.js';
import styles from './Counter.module.css';

export function Counter() {
  // Redux 스토어에서 상태 읽기
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleReset() {
    dispatch(reset());
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>카운터</h3>
      
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      
      <div className={styles.controls}>
        <button onClick={handleDecrement} className={styles.button}>
          -1
        </button>
        <button onClick={handleReset} className={styles.resetButton}>
          Reset
        </button>
        <button onClick={handleIncrement} className={styles.button}>
          +1
        </button>
      </div>

      <div className={styles.status}>
        <p>✅ 현재 상태: <strong>Redux Toolkit Store</strong></p>
        <p>� configureStore 적용 완료!</p>
      </div>
    </div>
  );
}