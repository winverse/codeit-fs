import { useSelector, useDispatch } from 'react-redux';
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset,
  clearHistory,
  undoLastAction,
  selectCounterValue,
  selectRecentHistory 
} from '@/store/counterSlice.js';
import styles from './CounterAdvanced.module.css';

export function CounterAdvanced() {
  const dispatch = useDispatch();
  const count = useSelector(selectCounterValue);
  const recentHistory = useSelector(state => selectRecentHistory(state, 5));

  function handleIncrement() {
    dispatch(increment());
  }

  function handleDecrement() {
    dispatch(decrement());
  }

  function handleIncrementByAmount(amount) {
    dispatch(incrementByAmount(amount));
  }

  function handleReset() {
    dispatch(reset());
  }

  function handleClearHistory() {
    dispatch(clearHistory());
  }

  function handleUndo() {
    dispatch(undoLastAction());
  }

  return (
    <div className={styles.container}>
      <div className={styles.counterSection}>
        <h3 className={styles.title}>고급 카운터</h3>
        
        <div className={styles.display}>
          <span className={styles.count}>{count}</span>
        </div>
        
        <div className={styles.controls}>
          <button onClick={handleDecrement} className={styles.button}>
            -1
          </button>
          <button onClick={() => handleIncrementByAmount(5)} className={styles.amountButton}>
            +5
          </button>
          <button onClick={() => handleIncrementByAmount(10)} className={styles.amountButton}>
            +10
          </button>
          <button onClick={handleIncrement} className={styles.button}>
            +1
          </button>
        </div>

        <div className={styles.resetSection}>
          <button onClick={handleReset} className={styles.resetButton}>
            Reset All
          </button>
          <button onClick={handleUndo} className={styles.undoButton}>
            ↶ Undo
          </button>
          <button onClick={handleClearHistory} className={styles.clearButton}>
            Clear History
          </button>
        </div>

        <div className={styles.status}>
          <p>📊 현재 상태: <strong>Redux Toolkit + createSlice</strong></p>
          <p>✅ 완성: prepare 함수 + 고급 리듀서 패턴</p>
        </div>
      </div>

      <div className={styles.historySection}>
        <h3 className={styles.historyTitle}>액션 히스토리</h3>
        {recentHistory.length === 0 ? (
          <p className={styles.noHistory}>아직 액션이 없습니다.</p>
        ) : (
          <div className={styles.historyList}>
            {recentHistory.map((entry) => (
              <div key={entry.id} className={styles.historyItem}>
                <div className={styles.actionInfo}>
                  <span className={styles.actionName}>{entry.action}</span>
                  {entry.amount && (
                    <span className={styles.actionAmount}>({entry.amount})</span>
                  )}
                  {entry.totalHistoryCleared && (
                    <span className={styles.extraInfo}>
                      ({entry.totalHistoryCleared}개 항목 정리됨)
                    </span>
                  )}
                </div>
                <div className={styles.valueChange}>
                  {entry.previousValue} → {entry.newValue}
                </div>
                <div className={styles.timestamp}>
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}