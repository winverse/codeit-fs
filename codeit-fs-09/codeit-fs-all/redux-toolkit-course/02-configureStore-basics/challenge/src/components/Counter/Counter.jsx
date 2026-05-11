import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/store/counterSlice.js';
import styles from '@/components/Counter/Counter.module.css';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className={styles.counter}>
      <h2>카운터 테스트</h2>
      <div className={styles.display}>
        <span className={styles.value}>{count}</span>
      </div>
      <div className={styles.controls}>
        <button 
          className={styles.button}
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
        <button 
          className={styles.button}
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        <button 
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>
    </div>
  );
}