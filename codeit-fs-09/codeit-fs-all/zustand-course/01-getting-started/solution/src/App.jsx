import { Counter } from '@/components/Counter'
import { CounterDisplay } from '@/components/CounterDisplay'
import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Zustand 시작하기</h1>
        <p>간단한 상태 관리 라이브러리</p>
      </header>
      <main className={styles.main}>
        <Counter />
        <CounterDisplay />
      </main>
    </div>
  )
}