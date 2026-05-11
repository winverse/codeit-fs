import { useState } from 'react';
import { Counter } from './Counter';
import { StoreInfo } from './StoreInfo';
import styles from './CounterApp.module.css';

export function CounterApp() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(prev => prev + 1);
  }

  function decrement() {
    setCount(prev => prev - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Counter 
          count={count}
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
        />
        <StoreInfo />
      </div>
    </div>
  );
}