import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '@/store/counterSlice.js';
import styles from './Counter.module.css';

export function Counter() {
  // Redux 스토어에서 상태 읽기
  const count = useSelector((state) => state.counter.value);
  // 액션을 디스패치하기 위한 함수
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

      <p className={styles.note}>
        🎉 Redux Toolkit 적용 완료!
        <br />
        createSlice로 action과 reducer를 한 번에 생성했습니다.
      </p>
    </div>
  );
}