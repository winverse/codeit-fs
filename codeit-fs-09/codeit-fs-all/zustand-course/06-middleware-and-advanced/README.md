# 6. 미들웨어와 고급 기능

이번 챕터에서는 Zustand의 미들웨어 시스템을 활용하여 데이터 영속화, 개발자 도구 연동, 복잡한 앱 구조 설계 등 실무에서 필요한 고급 기능들을 학습합니다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있게 됩니다:

- **persist 미들웨어**: 상태를 localStorage에 자동으로 저장하고 복원하기
- **devtools 미들웨어**: Redux DevTools로 상태 변화를 시각적으로 디버깅하기  
- **여러 스토어 조합**: 기능별로 분리된 스토어들을 효과적으로 관리하기
- **커스텀 미들웨어**: 특별한 요구사항을 위한 나만의 미들웨어 작성하기
- **실무 패턴**: 대규모 애플리케이션을 위한 Zustand 아키텍처 설계하기

## 주요 개념

### 1. Persist 미들웨어 (데이터 영속화)

웹 애플리케이션에서 사용자가 페이지를 새로고침하거나 브라우저를 닫았다가 다시 열어도 상태가 유지되어야 하는 경우가 많습니다.

```javascript
import { persist, createJSONStorage } from 'zustand/middleware'

const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ko',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'user-settings', // localStorage 키 이름
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

**핵심 포인트:**
- `persist` 미들웨어는 상태 변화를 자동으로 감지하여 저장소에 저장
- `createJSONStorage`로 localStorage, sessionStorage 등 다양한 저장소 선택 가능
- `name` 속성으로 저장소 키를 지정하여 여러 스토어 구분 가능

### 2. DevTools 미들웨어 (디버깅 강화)

Redux DevTools를 사용하여 상태 변화를 시각적으로 추적하고 디버깅할 수 있습니다.

```javascript
import { devtools } from 'zustand/middleware'

const useCounterStore = create(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
    }),
    { name: 'counter-store' }
  )
)
```

**핵심 포인트:**
- `set` 함수의 세 번째 인자로 액션명을 지정하여 DevTools에서 확인
- `name` 옵션으로 여러 스토어를 구별하여 디버깅
- 시간 여행 디버깅으로 이전 상태로 되돌리기 가능

### 3. 미들웨어 조합 패턴

여러 미들웨어를 함께 사용하여 더 강력한 기능을 구현할 수 있습니다.

```javascript
const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        theme: 'light',
        setUser: (user) => set({ user }, false, 'setUser'),
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ theme: state.theme }), // 일부만 저장
      }
    ),
    { name: 'app-store' }
  )
)
```

### 4. 여러 스토어 분리 전략

복잡한 애플리케이션에서는 기능별로 스토어를 분리하여 관리하는 것이 효과적입니다.

```javascript
// stores/authStore.js
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)

// stores/settingsStore.js  
export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ko',
      notifications: true,
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'settings-storage' }
  )
)
```

💡 **심화 학습: 미들웨어 실행 순서**

미들웨어는 바깥쪽부터 안쪽 순서로 적용됩니다:
```javascript
// devtools -> persist -> 실제 스토어 순서로 실행
create(
  devtools(
    persist(
      (set) => ({ /* 스토어 */ }),
      { /* persist 옵션 */ }
    ),
    { /* devtools 옵션 */ }
  )
)
```

## 강의 시연 스크립트

### 단계 1: 커스텀 미들웨어 개발

실무에서 유용한 커스텀 미들웨어들을 개발해보겠습니다.

#### 1-1. Logger 미들웨어

`src/middleware/logger.js`:

```javascript
// 액션 로깅 미들웨어
export const logger =
  (config, options = {}) =>
  (set, get, api) => {
    const {
      enabled = process.env.NODE_ENV === "development",
      actionFilter = () => true,
      stateFilter = () => true,
      collapsed = true,
      colors = {
        title: "#1976d2",
        prevState: "#9e9e9e",
        action: "#03a9f4",
        nextState: "#4caf50",
        error: "#f20404",
      },
    } = options;

    if (!enabled) {
      return config(set, get, api);
    }

    const loggedSet = (...args) => {
      const prevState = get();
      const start = Date.now();

      try {
        const result = set(...args);
        const nextState = get();
        const duration = Date.now() - start;

        // 상태가 실제로 변경되었을 때만 로그
        if (prevState !== nextState && stateFilter(nextState, prevState)) {
          logStateChange(
            prevState,
            nextState,
            args,
            duration,
            colors,
            collapsed
          );
        }

        return result;
      } catch (error) {
        logError(error, args, colors);
        throw error;
      }
    };

    return config(loggedSet, get, api);
  };

function logStateChange(
  prevState,
  nextState,
  args,
  duration,
  colors,
  collapsed
) {
  const actionName = getActionName(args);
  const groupTitle = `🔄 ${actionName} (${duration}ms)`;

  if (collapsed) {
    console.groupCollapsed(
      `%c${groupTitle}`,
      `color: ${colors.title}; font-weight: bold;`
    );
  } else {
    console.group(
      `%c${groupTitle}`,
      `color: ${colors.title}; font-weight: bold;`
    );
  }

  console.log(
    "%cPrev State:",
    `color: ${colors.prevState}; font-weight: bold;`,
    prevState
  );
  console.log("%cAction:", `color: ${colors.action}; font-weight: bold;`, args);
  console.log(
    "%cNext State:",
    `color: ${colors.nextState}; font-weight: bold;`,
    nextState
  );

  // 상태 차이 하이라이트
  const diff = getStateDiff(prevState, nextState);
  if (Object.keys(diff).length > 0) {
    console.log(
      "%cChanged:",
      `color: ${colors.action}; font-weight: bold;`,
      diff
    );
  }

  console.groupEnd();
}

function logError(error, args, colors) {
  console.group(
    `%c❌ Action Error`,
    `color: ${colors.error}; font-weight: bold;`
  );
  console.log("%cAction:", `color: ${colors.action}; font-weight: bold;`, args);
  console.log("%cError:", `color: ${colors.error}; font-weight: bold;`, error);
  console.groupEnd();
}

function getActionName(args) {
  if (typeof args[0] === "function") {
    return "Function Update";
  }

  if (typeof args[0] === "object") {
    const keys = Object.keys(args[0]);
    return keys.length === 1
      ? `Update ${keys[0]}`
      : `Update Multiple (${keys.join(", ")})`;
  }

  return "Unknown Action";
}

function getStateDiff(prev, next) {
  const diff = {};

  Object.keys(next).forEach((key) => {
    if (prev[key] !== next[key]) {
      diff[key] = { from: prev[key], to: next[key] };
    }
  });

  return diff;
}
```

#### 1-2. Performance 미들웨어

`src/middleware/performance.js`:

```javascript
// 성능 모니터링 미들웨어
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
```

#### 1-3. Validation 미들웨어

`src/middleware/validation.js`:

```javascript
import { z } from "zod"; // 스키마 검증 라이브러리

// 상태 검증 미들웨어
export const validation =
  (schema, options = {}) =>
  (config) =>
  (set, get, api) => {
    const {
      enabled = process.env.NODE_ENV === "development",
      onValidationError = (error) =>
        console.error("State validation failed:", error),
      validateOnSet = true,
      validateOnGet = false,
    } = options;

    if (!enabled) {
      return config(set, get, api);
    }

    const validatedSet = (...args) => {
      const result = set(...args);

      if (validateOnSet) {
        const newState = get();
        const validation = schema.safeParse(newState);

        if (!validation.success) {
          onValidationError(validation.error);

          // 개발 환경에서는 에러 발생
          if (process.env.NODE_ENV === "development") {
            throw new Error(
              `State validation failed: ${validation.error.message}`
            );
          }
        }
      }

      return result;
    };

    const validatedGet = () => {
      const state = get();

      if (validateOnGet) {
        const validation = schema.safeParse(state);

        if (!validation.success) {
          onValidationError(validation.error);
        }
      }

      return state;
    };

    return config(validatedSet, validatedGet, api);
  };

// 사용 예시용 스키마
export const createUserStoreSchema = () =>
  z.object({
    user: z
      .object({
        id: z.number().positive(),
        name: z.string().min(1),
        email: z.string().email(),
      })
      .nullable(),

    preferences: z.object({
      theme: z.enum(["light", "dark"]),
      language: z.string().min(2),
      notifications: z.boolean(),
    }),

    loading: z.boolean(),
    error: z.string().nullable(),
  });
```

### 단계 2: DevTools 통합과 고급 디버깅

Redux DevTools를 활용한 고급 디버깅 환경을 구성해보겠습니다.

`src/stores/debuggableStore.js`:

```javascript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

// DevTools 액션 타입 정의
const ACTIONS = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  UPDATE_PROFILE: "auth/updateProfile",

  ADD_TODO: "todos/add",
  TOGGLE_TODO: "todos/toggle",
  DELETE_TODO: "todos/delete",

  SET_LOADING: "ui/setLoading",
  SET_ERROR: "ui/setError",
};

export const useDebuggableStore = create(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // === 인증 상태 ===
        auth: {
          user: null,
          loading: false,
          error: null,
        },

        // === 할 일 상태 ===
        todos: {
          items: [],
          filter: "all",
        },

        // === UI 상태 ===
        ui: {
          sidebarOpen: false,
          theme: "light",
        },

        // === 인증 액션 ===
        login: (credentials) =>
          set(
            (state) => {
              state.auth.loading = true;
              state.auth.error = null;
            },
            false,
            ACTIONS.LOGIN
          ), // DevTools 액션명 지정

        loginSuccess: (user) =>
          set(
            (state) => {
              state.auth.user = user;
              state.auth.loading = false;
              state.auth.error = null;
            },
            false,
            { type: ACTIONS.LOGIN, payload: user }
          ),

        loginError: (error) =>
          set(
            (state) => {
              state.auth.error = error;
              state.auth.loading = false;
            },
            false,
            { type: ACTIONS.LOGIN, error }
          ),

        logout: () =>
          set(
            (state) => {
              state.auth.user = null;
              state.todos.items = []; // 로그아웃 시 할 일 초기화
            },
            false,
            ACTIONS.LOGOUT
          ),

        // === 할 일 액션 ===
        addTodo: (text) =>
          set(
            (state) => {
              const newTodo = {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString(),
              };
              state.todos.items.push(newTodo);
            },
            false,
            { type: ACTIONS.ADD_TODO, payload: { text } }
          ),

        toggleTodo: (id) =>
          set(
            (state) => {
              const todo = state.todos.items.find((t) => t.id === id);
              if (todo) {
                todo.completed = !todo.completed;
              }
            },
            false,
            { type: ACTIONS.TOGGLE_TODO, payload: { id } }
          ),

        deleteTodo: (id) =>
          set(
            (state) => {
              state.todos.items = state.todos.items.filter((t) => t.id !== id);
            },
            false,
            { type: ACTIONS.DELETE_TODO, payload: { id } }
          ),

        // === UI 액션 ===
        toggleSidebar: () =>
          set(
            (state) => {
              state.ui.sidebarOpen = !state.ui.sidebarOpen;
            },
            false,
            "ui/toggleSidebar"
          ),

        setTheme: (theme) =>
          set(
            (state) => {
              state.ui.theme = theme;
            },
            false,
            { type: "ui/setTheme", payload: { theme } }
          ),
      }))
    ),
    {
      name: "app-store", // DevTools에서 표시될 이름

      // 액션 변환 (더 자세한 정보 제공)
      actionFilter: (action) => {
        // 민감한 액션 필터링 (로그인 정보 등)
        if (action.type === ACTIONS.LOGIN && action.payload?.password) {
          return {
            ...action,
            payload: { ...action.payload, password: "[HIDDEN]" },
          };
        }
        return action;
      },

      // 상태 변환 (민감한 정보 숨기기)
      stateSanitizer: (state) => ({
        ...state,
        auth: {
          ...state.auth,
          // 실제 앱에서는 토큰 등을 숨김
          user: state.auth.user
            ? { ...state.auth.user, token: "[HIDDEN]" }
            : null,
        },
      }),
    }
  )
);

// DevTools 전용 액션 추가 (시간 여행용)
if (process.env.NODE_ENV === "development") {
  // 개발 모드에서만 사용 가능한 디버깅 액션들
  useDebuggableStore.setState = (state) => {
    console.log("🕰️ Time travel state restore:", state);
    return useDebuggableStore.setState(state);
  };
}
```

### 단계 3: 미들웨어 컴포지션 패턴

여러 미들웨어를 효율적으로 조합하는 고급 패턴을 구현해보겠습니다.

`src/utils/storeFactory.js`:

```javascript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

import { logger } from "@/middleware/logger";
import { performance } from "@/middleware/performance";
import { validation } from "@/middleware/validation";

/**
 * 고급 스토어 팩토리
 * 여러 미들웨어를 체계적으로 조합
 */
export function createAdvancedStore(config, options = {}) {
  const {
    name,
    persist: persistConfig,
    devtools: devtoolsConfig,
    validation: validationSchema,
    logger: loggerConfig,
    performance: performanceConfig,
    immer: useImmer = true,
    subscriptions = true,
  } = options;

  let store = config;

  // 1. 기본 기능 미들웨어 (가장 안쪽)
  if (useImmer) {
    store = immer(store);
  }

  if (subscriptions) {
    store = subscribeWithSelector(store);
  }

  // 2. 검증 미들웨어
  if (validationSchema) {
    store = validation(validationSchema, validationConfig)(store);
  }

  // 3. 성능 모니터링 (상태 변경 후 측정)
  if (performanceConfig !== false) {
    store = performance(store, {
      enabled: process.env.NODE_ENV === "development",
      ...performanceConfig,
    });
  }

  // 4. 로깅 (성능 측정 후 로깅)
  if (loggerConfig !== false) {
    store = logger(store, {
      enabled: process.env.NODE_ENV === "development",
      collapsed: true,
      ...loggerConfig,
    });
  }

  // 5. 영구 저장
  if (persistConfig) {
    store = persist(store, {
      name: persistConfig.name || name,
      storage: persistConfig.storage || createJSONStorage(() => localStorage),
      ...persistConfig,
    });
  }

  // 6. DevTools (가장 바깥쪽)
  if (devtoolsConfig !== false && process.env.NODE_ENV === "development") {
    store = devtools(store, {
      name: name || "Store",
      ...devtoolsConfig,
    });
  }

  return create(store);
}

// 전용 팩토리들
export function createUserStore(config, options = {}) {
  return createAdvancedStore(config, {
    name: "UserStore",
    persist: {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
      }),
    },
    validation: createUserStoreSchema(),
    ...options,
  });
}

export function createUIStore(config, options = {}) {
  return createAdvancedStore(config, {
    name: "UIStore",
    persist: {
      name: "ui-store",
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    },
    logger: { collapsed: false }, // UI 변경은 자세히 로깅
    ...options,
  });
}

export function createDataStore(config, options = {}) {
  return createAdvancedStore(config, {
    name: "DataStore",
    persist: false, // 데이터는 보통 영구 저장하지 않음
    performance: { slowThreshold: 50 }, // 데이터 처리는 더 엄격
    ...options,
  });
}

// 사용 예시
export const useAppStore = createAdvancedStore(
  (set, get) => ({
    // 스토어 로직
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),

    // 비동기 액션 예시
    fetchData: async () => {
      set({ loading: true });
      try {
        const data = await api.fetchData();
        set({ data, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
  }),
  {
    name: "AppStore",
    persist: {
      name: "app-store",
      partialize: (state) => ({ count: state.count }),
    },
    devtools: {
      actionFilter: (action) => {
        // 액션 필터링 로직
        return action;
      },
    },
  }
);
```

### 단계 4: 실시간 디버깅 도구

개발 중 실시간으로 스토어 상태를 모니터링할 수 있는 도구를 만들어보겠습니다.

`src/components/DevTools/StoreInspector.jsx`:

```javascript
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
```

## 챌린지 과제

### 미션

**게임 상태 관리 시스템**을 구축하여 모든 고급 미들웨어 패턴을 적용해보세요!

#### 요구사항:

1. **게임 스토어 구현**:

   - 플레이어 상태 (레벨, 경험치, 인벤토리)
   - 게임 진행 상태 (현재 스테이지, 점수)
   - 설정 (사운드, 그래픽 품질)

2. **커스텀 미들웨어**:

   - **Achievement Tracker**: 도전 과제 달성 감지
   - **Save System**: 게임 자동 저장
   - **Anti-Cheat**: 비정상적인 상태 변화 감지
   - **Analytics**: 플레이어 행동 분석

3. **고급 기능**:
   - 실시간 멀티플레이 동기화
   - 시간 여행 디버깅 (이전 상태로 복원)
   - 성능 프로파일링
   - 상태 검증 및 에러 복구

#### 미들웨어 구현 예시:

```javascript
// Achievement 미들웨어
const achievementMiddleware = (config) => (set, get, api) => {
  const achievements = [
    { id: "level_10", condition: (state) => state.player.level >= 10 },
    { id: "score_1000", condition: (state) => state.game.score >= 1000 },
  ];

  const wrappedSet = (...args) => {
    const result = set(...args);
    const newState = get();

    // 도전 과제 확인
    achievements.forEach((achievement) => {
      if (
        !newState.achievements.unlocked.includes(achievement.id) &&
        achievement.condition(newState)
      ) {
        // 도전 과제 달성
        set((state) => ({
          achievements: {
            ...state.achievements,
            unlocked: [...state.achievements.unlocked, achievement.id],
          },
        }));

        // 달성 알림
        api.notifyAchievement?.(achievement);
      }
    });

    return result;
  };

  return config(wrappedSet, get, api);
};
```

### 확인하기

- [ ] 모든 미들웨어가 올바른 순서로 조합되어 있는가?
- [ ] DevTools에서 액션과 상태가 명확하게 표시되는가?
- [ ] 성능 문제가 있는 액션이 감지되는가?
- [ ] 상태 검증이 적절히 작동하는가?
- [ ] 게임 진행 상황이 자동으로 저장되는가?

---

## 미들웨어 개발 베스트 프랙티스

### 1. 미들웨어 순서 고려

```javascript
// 올바른 순서 (안쪽부터 바깥쪽으로)
create(
  devtools(
    // 7. 개발 도구 (가장 바깥)
    persist(
      // 6. 영구 저장
      logger(
        // 5. 로깅
        performance(
          // 4. 성능 측정
          validation(
            // 3. 검증
            immer(
              // 2. 불변성 관리
              subscribeWithSelector(
                // 1. 기본 기능
                storeConfig
              )
            )
          )
        )
      )
    )
  )
);
```

### 2. 에러 처리

```javascript
const errorHandlingMiddleware = (config) => (set, get, api) => {
  const safeSet = (...args) => {
    try {
      return set(...args);
    } catch (error) {
      console.error("Store update failed:", error);

      // 에러 복구 로직
      const currentState = get();
      const backupState = api.getBackupState?.();

      if (backupState) {
        set(backupState, true); // replace 모드
      }

      throw error;
    }
  };

  return config(safeSet, get, api);
};
```

### 3. 타입 안전성 (참고용)

```javascript
// TypeScript 환경에서의 미들웨어 타입 정의 예시
/*
interface MiddlewareApi<T> {
  setState: SetState<T>
  getState: GetState<T>
  subscribe: Subscribe<T>
  destroy: Destroy
}

type Middleware<T> = (
  config: StateCreator<T>,
  impl: MiddlewareApi<T>
) => StateCreator<T>
*/
```

---

## 최종 정리 및 실무 적용

### Zustand 마스터 체크리스트

- [ ] **기본 사용법**: create, set, get의 완벽한 이해
- [ ] **성능 최적화**: useShallow와 셀렉터 패턴 활용
- [ ] **구조 설계**: 모듈화되고 확장 가능한 스토어 아키텍처
- [ ] **비동기 처리**: 로딩, 에러, 캐싱 패턴 구현
- [ ] **고급 기법**: 커스텀 미들웨어와 DevTools 통합

### 실무 프로젝트 적용 로드맵

1. **소규모 프로젝트** (1-2개 스토어)

   - 단일 스토어로 시작
   - persist 미들웨어로 상태 보존
   - 기본적인 비동기 패턴 적용

2. **중간 규모 프로젝트** (3-5개 스토어)

   - 도메인별 스토어 분리
   - 성능 최적화 적용
   - 실시간 데이터 연동

3. **대규모 프로젝트** (5개 이상 스토어)
   - 커스텀 미들웨어 개발
   - 고급 DevTools 활용
   - 마이크로프론트엔드 아키텍처

### 다른 상태 관리 라이브러리와의 비교

| 특성      | Zustand | Redux Toolkit | Recoil | Valtio |
| --------- | ------- | ------------- | ------ | ------ |
| 학습 곡선 | 낮음    | 중간          | 높음   | 낮음   |
| 번들 크기 | 2.4kb   | 12kb+         | 79kb   | 8.5kb  |
| 타입 지원 | 우수    | 우수          | 보통   | 우수   |
| DevTools  | 지원    | 네이티브      | 실험적 | 지원   |
| 미들웨어  | 풍부    | 풍부          | 제한적 | 보통   |

**Zustand를 선택해야 하는 경우:**

- 간단하고 직관적인 API를 원할 때
- 작은 번들 사이즈가 중요할 때
- Redux의 복잡함 없이 강력한 기능을 원할 때
- TypeScript와의 우수한 통합이 필요할 때

**🎉 축하합니다!**

이제 여러분은 Zustand의 모든 기능을 마스터했습니다. 기본 사용법부터 고급 미들웨어 개발까지, 실무에서 요구하는 모든 패턴을 익혔으니 이제 실제 프로젝트에서 Zustand의 진가를 발휘해보세요!

Happy coding with Zustand! 🚀
