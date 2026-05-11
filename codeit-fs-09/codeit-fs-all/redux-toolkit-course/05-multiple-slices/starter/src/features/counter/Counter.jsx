import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset, selectCount } from './counterSlice';
import styles from './Counter.module.css';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  function handleIncrementByAmount() {
    const amount = parseInt(prompt('증가할 값을 입력하세요:'), 10);
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount));
    }
  }

  return (
    <div className={styles.container}>
      <h3>카운터</h3>
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.buttons}>
        <button 
          className="button" 
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
        <button 
          className="button" 
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        <button 
          className="button" 
          onClick={handleIncrementByAmount}
        >
          사용자 정의 증가
        </button>
        <button 
          className="button" 
          onClick={() => dispatch(reset())}
        >
          리셋
        </button>
      </div>
    </div>
  );
}

export default Counter;