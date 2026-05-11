# 3. Performance Optimization

Zustand 애플리케이션의 성능을 최적화하는 다양한 기법을 학습하고, 리렌더링을 최소화하여 더 빠르고 효율적인 앱을 만드는 방법을 배웁니다.

## 학습 목표

이 챕터를 완료하면 다음과 같은 능력을 갖게 됩니다:

- **useShallow 훅 마스터**: 얕은 비교를 통한 불필요한 리렌더링 방지
- **셀렉터 최적화**: 효율적인 상태 선택과 메모이제이션 기법
- **렌더링 성능 측정**: React DevTools와 성능 분석 도구 활용
- **실무 최적화 패턴**: 대규모 애플리케이션에서 사용하는 성능 최적화 전략

## 주요 개념

### 1. useShallow 훅 (Zustand v5 핵심 기능)

Zustand v5에서 새롭게 추가된 `useShallow`는 얕은 비교를 통해 객체나 배열의 참조가 바뀌어도 내용이 같다면 리렌더링을 방지합니다.

```javascript
import { useShallow } from "zustand/shallow";

// ❌ 매번 새 객체 참조로 인한 리렌더링
const { name, age } = useStore((state) => ({
  name: state.user.name,
  age: state.user.age,
}));

// ✅ useShallow로 최적화
const { name, age } = useStore(
  useShallow((state) => ({
    name: state.user.name,
    age: state.user.age,
  }))
);
```

### 2. 리렌더링이 발생하는 경우

#### 리렌더링 O (피해야 할 패턴)

```javascript
// 매번 새 객체 생성
const user = useStore((state) => state.user); // user 객체 내부가 바뀔 때마다

// 매번 새 배열 생성
const activeItems = useStore((state) =>
  state.items.filter((item) => item.active)
);

// 불필요한 전체 스토어 구독
const store = useStore();
```

#### 리렌더링 X (권장 패턴)

```javascript
// 원시값 선택
const userName = useStore((state) => state.user.name);

// useShallow 활용
const userInfo = useStore(
  useShallow((state) => ({ name: state.user.name, age: state.user.age }))
);

// 메모이제이션된 셀렉터
const activeItems = useStore(getActiveItems);
```

### 3. 셀렉터 메모이제이션

복잡한 계산이나 필터링이 필요한 경우 별도의 셀렉터 함수로 추출하여 메모이제이션을 활용할 수 있습니다:

```javascript
// 셀렉터 함수 (컴포넌트 외부에 정의)
const getActiveItems = (state) => state.items.filter((item) => item.active);
const getItemStats = (state) => ({
  total: state.items.length,
  active: state.items.filter((item) => item.active).length,
});

// 컴포넌트에서 사용
function ItemList() {
  const activeItems = useStore(getActiveItems); // 메모이제이션됨
  const stats = useStore(useShallow(getItemStats));

  // ...
}
```

## 강의 시연 스크립트

### 단계 1: 성능 문제가 있는 코드 작성

먼저 성능 문제를 보여주기 위해 최적화되지 않은 코드를 작성합니다:

`src/stores/dashboardStore.js`:

```javascript
import { create } from "zustand";

export const useDashboardStore = create((set, get) => ({
  // 대량의 데이터
  users: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    isActive: Math.random() > 0.5,
    department: ["Engineering", "Marketing", "Sales"][
      Math.floor(Math.random() * 3)
    ],
    joinedAt: new Date(
      2020 + Math.random() * 4,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ),
    score: Math.floor(Math.random() * 100),
  })),

  filters: {
    department: "all",
    activeOnly: false,
    searchQuery: "",
  },

  sortBy: "name",
  sortOrder: "asc",

  // 액션
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  setSorting: (sortBy, sortOrder = "asc") => {
    set({ sortBy, sortOrder });
  },

  updateUser: (userId, updates) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      ),
    }));
  },
}));
```

**💬 설명 포인트:**

- 1000명의 사용자 데이터로 성능 이슈 시뮬레이션
- 복잡한 필터링과 정렬 로직
- 상태 업데이트 시 대량 데이터 처리

### 단계 2: 성능 문제가 있는 컴포넌트

`src/components/UserDashboard/UserDashboard.jsx` (최적화 전):

```javascript
import { useDashboardStore } from "@/stores/dashboardStore";
import { UserCard } from "./UserCard";
import styles from "./UserDashboard.module.css";

export function UserDashboard() {
  // ❌ 성능 문제: 매번 새 배열과 객체 생성
  const filteredAndSortedUsers = useDashboardStore((state) => {
    let filtered = state.users;

    // 부서 필터링
    if (state.filters.department !== "all") {
      filtered = filtered.filter(
        (user) => user.department === state.filters.department
      );
    }

    // 활성 사용자 필터링
    if (state.filters.activeOnly) {
      filtered = filtered.filter((user) => user.isActive);
    }

    // 검색 쿼리 필터링
    if (state.filters.searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(state.filters.searchQuery.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(state.filters.searchQuery.toLowerCase())
      );
    }

    // 정렬
    return filtered.sort((a, b) => {
      const multiplier = state.sortOrder === "asc" ? 1 : -1;
      return a[state.sortBy].localeCompare(b[state.sortBy]) * multiplier;
    });
  });

  // ❌ 매번 새 객체 생성
  const stats = useDashboardStore((state) => ({
    total: state.users.length,
    active: state.users.filter((u) => u.isActive).length,
    departments: [...new Set(state.users.map((u) => u.department))],
  }));

  console.log("🔄 UserDashboard 렌더링됨"); // 성능 측정용

  return (
    <div className={styles.dashboard}>
      <div className={styles.stats}>
        <p>총 사용자: {stats.total}</p>
        <p>활성 사용자: {stats.active}</p>
        <p>부서 수: {stats.departments.length}</p>
      </div>

      <div className={styles.users}>
        {filteredAndSortedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
```

### 단계 3: 성능 최적화 적용

이제 `useShallow`와 메모이제이션을 적용해 최적화해보겠습니다:

`src/selectors/userSelectors.js`:

```javascript
import { useShallow } from "zustand/shallow";

// 메모이제이션된 셀렉터 함수들
export const getUserStats = (state) => {
  const active = state.users.filter((u) => u.isActive).length;
  const departments = [...new Set(state.users.map((u) => u.department))];

  return {
    total: state.users.length,
    active,
    departments,
  };
};

export const getFilteredAndSortedUsers = (state) => {
  let filtered = state.users;

  // 부서 필터링
  if (state.filters.department !== "all") {
    filtered = filtered.filter(
      (user) => user.department === state.filters.department
    );
  }

  // 활성 사용자 필터링
  if (state.filters.activeOnly) {
    filtered = filtered.filter((user) => user.isActive);
  }

  // 검색 쿼리 필터링
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  // 정렬
  return filtered.sort((a, b) => {
    const multiplier = state.sortOrder === "asc" ? 1 : -1;
    if (typeof a[state.sortBy] === "string") {
      return a[state.sortBy].localeCompare(b[state.sortBy]) * multiplier;
    }
    return (a[state.sortBy] - b[state.sortBy]) * multiplier;
  });
};

// useShallow와 함께 사용하는 셀렉터
export const useUserStats = () => {
  return useDashboardStore(useShallow(getUserStats));
};

export const useFilteredUsers = () => {
  return useDashboardStore(getFilteredAndSortedUsers);
};
```

`src/components/UserDashboard/UserDashboard.jsx` (최적화 후):

```javascript
import { useDashboardStore } from "@/stores/dashboardStore";
import { useUserStats, useFilteredUsers } from "@/selectors/userSelectors";
import { UserCard } from "./UserCard";
import styles from "./UserDashboard.module.css";

export function UserDashboard() {
  // ✅ 최적화된 상태 구독
  const filteredUsers = useFilteredUsers();
  const stats = useUserStats();

  console.log("🔄 UserDashboard 렌더링됨 (최적화)"); // 성능 측정용

  return (
    <div className={styles.dashboard}>
      <div className={styles.stats}>
        <p>총 사용자: {stats.total}</p>
        <p>활성 사용자: {stats.active}</p>
        <p>부서 수: {stats.departments.length}</p>
      </div>

      <div className={styles.users}>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
```

### 단계 4: UserCard 컴포넌트 최적화

`src/components/UserCard/UserCard.jsx`:

```javascript
import { memo } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import styles from "./UserCard.module.css";

export const UserCard = memo(function UserCard({ user }) {
  // 개별 액션만 구독하여 성능 최적화
  const updateUser = useDashboardStore((state) => state.updateUser);

  function handleToggleActive() {
    updateUser(user.id, { isActive: !user.isActive });
  }

  console.log(`🔄 UserCard ${user.id} 렌더링됨`); // 성능 측정용

  return (
    <div className={`${styles.card} ${user.isActive ? styles.active : ""}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>부서: {user.department}</p>
      <p>점수: {user.score}</p>

      <button onClick={handleToggleActive} className={styles.toggleButton}>
        {user.isActive ? "비활성화" : "활성화"}
      </button>
    </div>
  );
});
```

**💬 설명 포인트:**

- `React.memo`를 사용한 컴포넌트 메모이제이션
- 개별 액션만 구독하여 불필요한 리렌더링 방지
- props가 변경될 때만 리렌더링

### 단계 5: 필터 컴포넌트

`src/components/UserFilter/UserFilter.jsx`:

```javascript
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/stores/dashboardStore";
import styles from "./UserFilter.module.css";

export function UserFilter() {
  // ✅ useShallow로 객체 구조분해 최적화
  const { filters, sortBy, sortOrder, setFilter, setSorting } =
    useDashboardStore(
      useShallow((state) => ({
        filters: state.filters,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        setFilter: state.setFilter,
        setSorting: state.setSorting,
      }))
    );

  function handleSearchChange(e) {
    setFilter("searchQuery", e.target.value);
  }

  function handleDepartmentChange(e) {
    setFilter("department", e.target.value);
  }

  function handleActiveOnlyChange(e) {
    setFilter("activeOnly", e.target.checked);
  }

  function handleSortChange(field) {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSorting(field, newOrder);
  }

  return (
    <div className={styles.filter}>
      <div className={styles.group}>
        <label>
          검색:
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchChange}
            placeholder="이름 또는 이메일"
            className={styles.searchInput}
          />
        </label>
      </div>

      <div className={styles.group}>
        <label>
          부서:
          <select value={filters.department} onChange={handleDepartmentChange}>
            <option value="all">전체</option>
            <option value="Engineering">개발</option>
            <option value="Marketing">마케팅</option>
            <option value="Sales">영업</option>
          </select>
        </label>
      </div>

      <div className={styles.group}>
        <label>
          <input
            type="checkbox"
            checked={filters.activeOnly}
            onChange={handleActiveOnlyChange}
          />
          활성 사용자만
        </label>
      </div>

      <div className={styles.group}>
        <span>정렬:</span>
        <button
          onClick={() => handleSortChange("name")}
          className={sortBy === "name" ? styles.active : ""}
        >
          이름 {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSortChange("score")}
          className={sortBy === "score" ? styles.active : ""}
        >
          점수 {sortBy === "score" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
}
```

### 단계 6: 성능 측정 도구 추가

`src/utils/performanceMonitor.js`:

```javascript
// 렌더링 횟수 추적
const renderCounts = new Map();

export function trackRender(componentName) {
  const count = renderCounts.get(componentName) || 0;
  renderCounts.set(componentName, count + 1);

  console.log(`🔄 ${componentName} 렌더링 #${count + 1}`);
}

export function getRenderStats() {
  return Object.fromEntries(renderCounts);
}

export function resetRenderStats() {
  renderCounts.clear();
}

// 성능 측정 HOC
export function withPerformanceTracking(Component, componentName) {
  return function PerformanceTrackedComponent(props) {
    trackRender(componentName);
    return <Component {...props} />;
  };
}
```

`src/components/PerformanceMonitor/PerformanceMonitor.jsx`:

```javascript
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
```

## 챌린지 과제

### 미션

**대용량 상품 목록 앱**을 성능 최적화해보세요!

#### 초기 구현 (성능 문제 있음)

`src/stores/productStore.js`:

```javascript
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 10,
    category: ["Electronics", "Clothing", "Books", "Home"][
      Math.floor(Math.random() * 4)
    ],
    rating: Math.round(Math.random() * 5 * 10) / 10,
    inStock: Math.random() > 0.2,
    tags: ["popular", "sale", "new"].filter(() => Math.random() > 0.7),
  })),

  cart: [],
  filters: { category: "all", inStock: false, minRating: 0 },

  addToCart: (productId) => {
    // 구현 필요
  },

  setFilter: (key, value) => {
    // 구현 필요
  },
}));
```

#### 성능 최적화 목표:

1. **useShallow 적용**: 객체/배열 구조분해 최적화
2. **셀렉터 분리**: 필터링 로직을 별도 파일로 분리
3. **메모이제이션**: ProductCard 컴포넌트에 React.memo 적용
4. **가상화**: 5000개 상품을 효율적으로 렌더링 (선택사항)

#### 측정하기:

성능 최적화 전후의 차이를 측정해보세요:

- [ ] 필터 변경 시 리렌더링 횟수
- [ ] 장바구니 추가 시 리렌더링 범위
- [ ] 초기 로딩 시간
- [ ] 메모리 사용량

### 확인하기

- [ ] useShallow로 불필요한 리렌더링 방지
- [ ] 셀렉터 함수를 컴포넌트 외부로 분리
- [ ] ProductCard가 props 변경 시에만 리렌더링
- [ ] 필터 변경 시 필터 컴포넌트만 리렌더링
- [ ] 성능 측정 도구로 개선 효과 확인

### 💡 고급 최적화 팁

1. **디바운싱**: 검색 입력에 디바운싱 적용
2. **가상화**: react-window로 대량 리스트 최적화
3. **청크 로딩**: 상품을 청크 단위로 지연 로딩
4. **Web Worker**: 필터링을 Web Worker에서 처리

---

## 성능 분석 체크리스트

### React DevTools Profiler 사용법

1. React DevTools 설치 및 Profiler 탭 열기
2. "Start profiling" 버튼 클릭
3. 앱에서 상호작용 수행 (필터 변경, 데이터 업데이트 등)
4. "Stop profiling" 버튼 클릭
5. Flame graph에서 렌더링 시간 분석

### 성능 문제 진단

#### 🔍 체크 포인트:

- [ ] **불필요한 리렌더링**: 상태가 변경되지 않았는데 컴포넌트가 리렌더링되는가?
- [ ] **큰 객체 비교**: 매번 새로운 객체/배열을 생성하고 있는가?
- [ ] **과도한 계산**: 렌더링 시마다 복잡한 계산을 수행하는가?
- [ ] **메모리 누수**: 사용하지 않는 상태를 계속 유지하고 있는가?

#### ✅ 최적화 패턴:

- **useShallow 활용**: 객체/배열 구조분해 시 적용
- **셀렉터 분리**: 복잡한 계산은 별도 함수로
- **React.memo 적용**: props 기반 메모이제이션
- **상태 정규화**: 중첩 객체보다 평평한 구조
- **지연 로딩**: 필요할 때만 데이터 로드

---

## 다음 챕터 미리보기

다음 챕터 **"Store Structure Design"**에서는:

- 대규모 애플리케이션을 위한 스토어 구조 설계
- 여러 스토어 간의 효율적인 상호작용
- 도메인별 스토어 분리 전략
- 상태 정규화와 관계형 데이터 관리

성능 최적화를 배웠다면, 이제 확장 가능한 스토어 아키텍처를 설계할 시간입니다! 🏗️
