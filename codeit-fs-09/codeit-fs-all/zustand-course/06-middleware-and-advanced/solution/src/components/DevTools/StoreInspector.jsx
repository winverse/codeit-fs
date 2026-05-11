import { useState, useEffect } from "react";
import { useAppStore } from "@/stores";
import styles from "./StoreInspector.module.css";

export function StoreInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("state");
  const [stateHistory, setStateHistory] = useState([]);
  const [performanceStats, setPerformanceStats] = useState(null);

  // 현재 상태 구독
  const currentState = useAppStore();

  // 상태 변경 히스토리 추적
  useEffect(() => {
    const unsubscribe = useAppStore.subscribe((newState, prevState) => {
      setStateHistory((prev) => [
        ...prev.slice(-9), // 최근 10개만 유지
        {
          timestamp: Date.now(),
          state: newState,
          changes: getStateChanges(prevState, newState),
        },
      ]);
    });

    return unsubscribe;
  }, []);

  // 성능 통계 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      if (useAppStore.getState().getPerformanceStats) {
        setPerformanceStats(useAppStore.getState().getPerformanceStats());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  if (!isOpen) {
    return (
      <div className={styles.trigger}>
        <button
          onClick={() => setIsOpen(true)}
          className={styles.openButton}
          title="Store Inspector 열기"
        >
          🔍
        </button>
      </div>
    );
  }

  return (
    <div className={styles.inspector}>
      <div className={styles.header}>
        <h3>Store Inspector</h3>
        <div className={styles.tabs}>
          {["state", "history", "performance"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${styles.tab} ${
                selectedTab === tab ? styles.active : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
          ✕
        </button>
      </div>

      <div className={styles.content}>
        {selectedTab === "state" && <StateView state={currentState} />}

        {selectedTab === "history" && <HistoryView history={stateHistory} />}

        {selectedTab === "performance" && (
          <PerformanceView stats={performanceStats} />
        )}
      </div>
    </div>
  );
}

function StateView({ state }) {
  const [expandedKeys, setExpandedKeys] = useState(new Set());

  const toggleExpand = (key) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.stateView}>
      <div className={styles.stateTree}>
        {Object.entries(state).map(([key, value]) => (
          <StateNode
            key={key}
            name={key}
            value={value}
            level={0}
            expanded={expandedKeys.has(key)}
            onToggle={() => toggleExpand(key)}
          />
        ))}
      </div>
    </div>
  );
}

function StateNode({ name, value, level, expanded, onToggle }) {
  const isObject = value && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isFunction = typeof value === "function";

  const indent = { paddingLeft: `${level * 20}px` };

  return (
    <div className={styles.stateNode}>
      <div
        className={styles.nodeHeader}
        style={indent}
        onClick={isObject || isArray ? onToggle : undefined}
      >
        <span className={styles.nodeKey}>{name}:</span>
        {isFunction ? (
          <span className={styles.functionValue}>ƒ {name}</span>
        ) : isObject || isArray ? (
          <span className={styles.objectValue}>
            {expanded ? "▼" : "▶"}
            {isArray ? `Array(${value.length})` : "Object"}
          </span>
        ) : (
          <span className={`${styles.primitiveValue} ${styles[typeof value]}`}>
            {JSON.stringify(value)}
          </span>
        )}
      </div>

      {expanded && (isObject || isArray) && (
        <div className={styles.nodeChildren}>
          {Object.entries(value).map(([childKey, childValue]) => (
            <StateNode
              key={childKey}
              name={childKey}
              value={childValue}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryView({ history }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className={styles.historyView}>
      <div className={styles.historyList}>
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className={`${styles.historyItem} ${
              selectedIndex === index ? styles.selected : ""
            }`}
            onClick={() =>
              setSelectedIndex(selectedIndex === index ? null : index)
            }
          >
            <div className={styles.historyTime}>
              {new Date(entry.timestamp).toLocaleTimeString()}
            </div>
            <div className={styles.historyChanges}>
              {Object.keys(entry.changes).join(", ") || "No changes"}
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && history[selectedIndex] && (
        <div className={styles.historyDetails}>
          <h4>State Changes</h4>
          <pre>{JSON.stringify(history[selectedIndex].changes, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function PerformanceView({ stats }) {
  if (!stats) {
    return <div>Performance monitoring not available</div>;
  }

  return (
    <div className={styles.performanceView}>
      <div className={styles.statGrid}>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>Total Updates</div>
          <div className={styles.statValue}>{stats.totalUpdates}</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statLabel}>Slow Updates</div>
          <div className={styles.statValue}>{stats.slowUpdates}</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statLabel}>Avg Duration</div>
          <div className={styles.statValue}>
            {stats.avgDuration.toFixed(2)}ms
          </div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statLabel}>Slow Ratio</div>
          <div className={styles.statValue}>
            {(stats.slowUpdateRatio * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className={styles.performanceChart}>
        <h4>Recent Performance</h4>
        <div className={styles.chartContainer}>
          {stats.entries.slice(-20).map((entry, index) => (
            <div
              key={index}
              className={`${styles.chartBar} ${
                entry.isSlow ? styles.slow : ""
              }`}
              style={{ height: `${Math.min(entry.duration * 2, 100)}px` }}
              title={`${entry.action}: ${entry.duration.toFixed(2)}ms`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function getStateChanges(prev, next) {
  const changes = {};

  Object.keys(next).forEach((key) => {
    if (prev[key] !== next[key]) {
      changes[key] = {
        from: prev[key],
        to: next[key],
      };
    }
  });

  return changes;
}