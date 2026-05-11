export const performance =
  (config, options = {}) =>
  (set, get, api) => {
    const {
      enabled = process.env.NODE_ENV === "development",
      slowThreshold = 16, // 16ms (60fps 기준)
      memoryTracking = true,
      maxEntries = 100,
    } = options;

    if (!enabled) {
      return config(set, get, api);
    }

    const performanceData = {
      entries: [],
      totalUpdates: 0,
      slowUpdates: 0,
      avgDuration: 0,
    };

    const performanceSet = (...args) => {
      const startTime = performance.now();
      const startMemory = memoryTracking ? getMemoryUsage() : null;

      const result = set(...args);

      const endTime = performance.now();
      const duration = endTime - startTime;
      const endMemory = memoryTracking ? getMemoryUsage() : null;

      // 성능 데이터 기록
      const entry = {
        timestamp: Date.now(),
        duration,
        action: getActionName(args),
        memoryDelta: endMemory ? endMemory - startMemory : null,
        isSlow: duration > slowThreshold,
      };

      performanceData.entries.push(entry);
      performanceData.totalUpdates++;

      if (entry.isSlow) {
        performanceData.slowUpdates++;
        console.warn(
          `🐌 Slow state update detected: ${
            entry.action
          } took ${duration.toFixed(2)}ms`
        );
      }

      // 최대 항목 수 제한
      if (performanceData.entries.length > maxEntries) {
        performanceData.entries.shift();
      }

      // 평균 계산 업데이트
      performanceData.avgDuration =
        performanceData.entries.reduce((sum, e) => sum + e.duration, 0) /
        performanceData.entries.length;

      return result;
    };

    // 성능 통계 조회 함수 추가
    api.getPerformanceStats = () => ({
      ...performanceData,
      slowUpdateRatio:
        performanceData.slowUpdates / performanceData.totalUpdates,
    });

    return config(performanceSet, get, api);
  };

function getMemoryUsage() {
  return performance.memory ? performance.memory.usedJSHeapSize : 0;
}

function getActionName(args) {
  // logger 미들웨어와 동일한 로직
  if (typeof args[0] === "function") {
    return "Function Update";
  }

  if (typeof args[0] === "object") {
    const keys = Object.keys(args[0]);
    return keys.length === 1 ? keys[0] : `Multiple (${keys.length})`;
  }

  return "Unknown";
}