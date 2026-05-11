import { memo, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectCounterValue, increment, decrement } from "@/features/counter/counterSlice";
import styles from "./OptimizedCounter.module.css";

// 메모이제이션된 컴포넌트
export const OptimizedCounter = memo(function OptimizedCounter() {
  const count = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();

  // 액션 생성자들을 메모이제이션
  const handleIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  // 계산된 값 메모이제이션
  const isEven = useMemo(() => count % 2 === 0, [count]);
  const displayText = useMemo(() => `현재 카운트: ${count}`, [count]);

  return (
    <div className={styles.container}>
      <h3>최적화된 카운터</h3>
      <div className={styles.display}>
        <span className={styles.count}>{displayText}</span>
        <span className={styles.status}>{isEven ? "짝수" : "홀수"}</span>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
});