import { Counter } from '@/components/Counter';
import styles from './App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Redux Toolkit 소개</h1>
        <p className={styles.subtitle}>
          전통적인 Redux vs Redux Toolkit 비교
        </p>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <h2>전통적인 Redux의 문제점</h2>
          <ul className={styles.problems}>
            <li>복잡한 보일러플레이트 코드</li>
            <li>수동으로 설정해야 하는 여러 미들웨어</li>
            <li>불변성 관리의 어려움</li>
            <li>Action과 Reducer의 분산된 관리</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Redux Toolkit의 해결책</h2>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <h3>configureStore</h3>
              <p>자동 미들웨어 설정과 DevTools 연동</p>
            </div>
            <div className={styles.benefit}>
              <h3>createSlice</h3>
              <p>Action과 Reducer를 한 번에 생성</p>
            </div>
            <div className={styles.benefit}>
              <h3>Immer 내장</h3>
              <p>불변성 관리 자동화</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>카운터 예제 (Redux Toolkit 적용 완료 ✅)</h2>
          <Counter />
          
          <div className={styles.codeComparison}>
            <h3>코드 비교</h3>
            <div className={styles.comparison}>
              <div className={styles.before}>
                <h4>Before: useState</h4>
                <code>const [count, setCount] = useState(0);</code>
              </div>
              <div className={styles.after}>
                <h4>After: Redux Toolkit</h4>
                <code>const count = useSelector(state =&gt; state.counter.value);</code>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}