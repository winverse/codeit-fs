import { useState } from 'react';
import styles from './CounterAdvanced.module.css';

export function CounterAdvanced() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  function increment() {
    const newCount = count + 1;
    setCount(newCount);
    setHistory(prev => [...prev, {
      action: 'increment',
      previousValue: count,
      newValue: newCount,
      timestamp: new Date().toISOString()
    }]);
  }

  function decrement() {
    const newCount = count - 1;
    setCount(newCount);
    setHistory(prev => [...prev, {
      action: 'decrement', 
      previousValue: count,
      newValue: newCount,
      timestamp: new Date().toISOString()
    }]);
  }

  function incrementByAmount(amount) {
    const newCount = count + amount;
    setCount(newCount);
    setHistory(prev => [...prev, {
      action: 'incrementByAmount',
      amount,
      previousValue: count,
      newValue: newCount,
      timestamp: new Date().toISOString()
    }]);
  }

  function reset() {
    setCount(0);
    setHistory([]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.counterSection}>
        <h3 className={styles.title}>고급 카운터</h3>
        
        <div className={styles.display}>
          <span className={styles.count}>{count}</span>
        </div>
        
        <div className={styles.controls}>
          <button onClick={decrement} className={styles.button}>
            -1
          </button>
          <button onClick={() => incrementByAmount(5)} className={styles.amountButton}>
            +5
          </button>
          <button onClick={() => incrementByAmount(10)} className={styles.amountButton}>
            +10
          </button>
          <button onClick={increment} className={styles.button}>
            +1
          </button>
        </div>

        <div className={styles.resetSection}>
          <button onClick={reset} className={styles.resetButton}>
            Reset All
          </button>
        </div>

        <div className={styles.status}>
          <p>📊 현재 상태: <strong>로컬 useState</strong></p>
          <p>🎯 목표: createSlice + prepare 함수로 변환</p>
        </div>
      </div>

      <div className={styles.historySection}>
        <h3 className={styles.historyTitle}>액션 히스토리</h3>
        {history.length === 0 ? (
          <p className={styles.noHistory}>아직 액션이 없습니다.</p>
        ) : (
          <div className={styles.historyList}>
            {history.slice(-5).map((entry, index) => (
              <div key={index} className={styles.historyItem}>
                <div className={styles.actionInfo}>
                  <span className={styles.actionName}>{entry.action}</span>
                  {entry.amount && (
                    <span className={styles.actionAmount}>({entry.amount})</span>
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