import { useCounterStore } from '@/stores/counterStore'
import styles from './Counter.module.css'

export function Counter() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Zustand 카운터</h1>
      <div className={styles.counter}>
        <span className={styles.count}>{count}</span>
      </div>
      <div className={styles.buttons}>
        <button onClick={decrement} className={styles.button}>
          -1
        </button>
        <button onClick={increment} className={styles.button}>
          +1
        </button>
        <button onClick={reset} className={styles.button}>
          리셋
        </button>
      </div>
    </div>
  )
}