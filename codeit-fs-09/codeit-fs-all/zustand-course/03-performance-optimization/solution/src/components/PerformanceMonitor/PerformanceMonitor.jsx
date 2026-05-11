import { useState, useEffect } from "react";
import { getRenderStats, resetRenderStats } from "@/utils/performanceMonitor";
import styles from "./PerformanceMonitor.module.css";

export function PerformanceMonitor() {
  const [stats, setStats] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getRenderStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={styles.toggleButton}
      >
        📊 성능 모니터
      </button>
    );
  }

  return (
    <div className={styles.monitor}>
      <div className={styles.header}>
        <h3>렌더링 통계</h3>
        <div>
          <button onClick={resetRenderStats}>초기화</button>
          <button onClick={() => setIsVisible(false)}>닫기</button>
        </div>
      </div>

      <div className={styles.stats}>
        {Object.entries(stats).map(([component, count]) => (
          <div key={component} className={styles.stat}>
            <span>{component}: </span>
            <span className={styles.count}>{count}회</span>
          </div>
        ))}
      </div>

      <div className={styles.tips}>
        💡 렌더링 횟수가 많다면 useShallow나 메모이제이션을 고려해보세요
      </div>
    </div>
  );
}