import { useState } from 'react';
// TODO 1: useSelector와 useDispatch를 react-redux에서 import하기
// import { useSelector, useDispatch } from 'react-redux';
// TODO 2: 액션들을 @/store/counterSlice.js에서 import하기
// import { increment, decrement, reset } from '@/store/counterSlice.js';
import styles from './Counter.module.css';

export function Counter() {
  // TODO 3: useState 대신 Redux 상태 사용하기
  const [count, setCount] = useState(0);
  // const count = useSelector((state) => state.counter.value);
  // const dispatch = useDispatch();

  function handleIncrement() {
    // TODO 4: Redux 액션 디스패치하기
    setCount(count + 1);
    // dispatch(increment());
  }

  function handleDecrement() {
    // TODO 5: Redux 액션 디스패치하기
    setCount(count - 1);
    // dispatch(decrement());
  }

  function handleReset() {
    // TODO 6: Redux 액션 디스패치하기
    setCount(0);
    // dispatch(reset());
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
        📝 TODO를 완성해서 Redux Toolkit을 적용해보세요!
        <br />
        현재는 여전히 useState를 사용하고 있습니다.
      </p>
    </div>
  );
}