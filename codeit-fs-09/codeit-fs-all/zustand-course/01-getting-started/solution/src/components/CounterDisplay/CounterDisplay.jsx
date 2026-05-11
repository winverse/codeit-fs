import { useCounterStore } from '@/stores/counterStore'
import styles from './CounterDisplay.module.css'

export function CounterDisplay() {
  const count = useCounterStore((state) => state.count)

  return (
    <div className={styles.display}>
      <p>다른 컴포넌트에서 보는 카운트: <strong>{count}</strong></p>
      <p className={styles.message}>
        {count === 0 && '카운터를 시작해보세요!'}
        {count > 0 && count < 10 && '좋아요! 계속 세어보세요!'}
        {count >= 10 && '와! 10 이상이네요! 🎉'}
        {count < 0 && '음수도 가능해요!'}
      </p>
    </div>
  )
}