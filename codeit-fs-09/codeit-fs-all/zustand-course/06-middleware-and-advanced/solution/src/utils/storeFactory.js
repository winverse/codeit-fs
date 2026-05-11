import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

import { logger } from "@/middleware/logger";
import { performance } from "@/middleware/performance";
import { validation, createUserStoreSchema } from "@/middleware/validation";

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
    store = validation(validationSchema)(store);
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