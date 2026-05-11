# 4. React-Redux 통합

이 챕터에서는 Redux Toolkit과 React를 완벽하게 통합하는 방법을 학습합니다. Provider, useSelector, useDispatch 훅을 활용하여 React 컴포넌트에서 Redux 상태를 효율적으로 관리하는 패턴을 익혀봅시다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있습니다:

- Provider 컴포넌트로 Redux 스토어를 React 앱에 제공하기
- useSelector 훅으로 Redux 상태 구독하기
- useDispatch 훅으로 액션 디스패치하기
- 타입 안전한 커스텀 훅 (useAppSelector, useAppDispatch) 생성하기
- 컴포넌트 최적화와 리렌더링 방지 패턴 적용하기

## 주요 개념

### React-Redux의 핵심 개념

React-Redux는 Redux와 React를 연결해주는 공식 바인딩 라이브러리입니다:

1. **Provider**: React 컴포넌트 트리에 Redux 스토어 제공
2. **useSelector**: 상태 구독 및 선택적 추출
3. **useDispatch**: 액션 디스패치 함수 접근
4. **connect**: 클래스 컴포넌트용 HOC (현재는 훅을 권장)

### 성능 최적화 포인트

- **선택적 구독**: useSelector로 필요한 상태만 구독
- **얕은 비교**: Redux는 기본적으로 참조 동일성 검사
- **메모이제이션**: useMemo, useCallback을 활용한 최적화
- **컴포넌트 분할**: 상태별로 컴포넌트를 적절히 분리

💡 **심화 학습: 리렌더링 최적화**
useSelector는 선택된 값이 변경될 때만 컴포넌트를 리렌더링합니다. 하지만 새로운 객체나 배열을 매번 생성하면 불필요한 리렌더링이 발생할 수 있습니다. 이를 방지하기 위해 reselect 라이브러리나 useMemo를 활용할 수 있습니다.

## 강의 시연 스크립트

### 1단계: 타입 안전한 훅 설정

먼저 TypeScript를 위한 타입 안전한 훅을 설정합니다.

`src/app/hooks.ts` 파일을 생성합니다:

```javascript
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// 타입이 미리 설정된 useDispatch와 useSelector 훅
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore = () => useStore<AppStore>()
```

### 2단계: 컴포넌트별 상태 관리

사용자 정보를 관리하는 slice를 생성합니다.

`src/features/user/userSlice.js` 파일을 생성합니다:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    email: "",
    avatar: "",
  },
  preferences: {
    theme: "light",
    language: "ko",
    notifications: true,
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    login: (state, action) => {
      state.profile = action.payload.profile;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.profile = { name: "", email: "", avatar: "" };
      state.isLoggedIn = false;
    },
    toggleTheme: (state) => {
      state.preferences.theme =
        state.preferences.theme === "light" ? "dark" : "light";
    },
  },
});

export const { updateProfile, updatePreferences, login, logout, toggleTheme } =
  userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;
export const selectUserProfile = (state) => state.user.profile;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectTheme = (state) => state.user.preferences.theme;

export default userSlice.reducer;
```

### 3단계: UserProfile 컴포넌트 생성

`src/features/user/UserProfile.jsx` 파일을 생성합니다:

```javascript
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectUserProfile,
  selectIsLoggedIn,
  updateProfile,
  login,
  logout,
} from "./userSlice";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const profile = useAppSelector(selectUserProfile);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleLogin = () => {
    const mockProfile = {
      name: "홍길동",
      email: "hong@example.com",
      avatar: "https://via.placeholder.com/100",
    };
    dispatch(login({ profile: mockProfile }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setEditMode(false);
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <h2>사용자 로그인</h2>
        <button onClick={handleLogin} className={styles.loginButton}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <h2>사용자 프로필</h2>

      {editMode ? (
        <div className={styles.editForm}>
          <div className={styles.inputGroup}>
            <label>이름:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>이메일:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={handleSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.profileView}>
          {profile.avatar && (
            <img src={profile.avatar} alt="Avatar" className={styles.avatar} />
          )}
          <p>
            <strong>이름:</strong> {profile.name}
          </p>
          <p>
            <strong>이메일:</strong> {profile.email}
          </p>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setEditMode(true)}
              className={styles.editButton}
            >
              편집
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 4단계: UserPreferences 컴포넌트 생성

`src/features/user/UserPreferences.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectUserPreferences,
  selectIsLoggedIn,
  updatePreferences,
  toggleTheme,
} from "./userSlice";
import styles from "./UserPreferences.module.css";

export function UserPreferences() {
  const preferences = useAppSelector(selectUserPreferences);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const handlePreferenceChange = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <p>로그인 후 설정을 변경할 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>사용자 설정</h3>

      <div className={styles.preferenceGroup}>
        <label>테마:</label>
        <div className={styles.themeToggle}>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`${styles.themeButton} ${
              preferences.theme === "light" ? styles.active : ""
            }`}
          >
            밝게
          </button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`${styles.themeButton} ${
              preferences.theme === "dark" ? styles.active : ""
            }`}
          >
            어둡게
          </button>
        </div>
      </div>

      <div className={styles.preferenceGroup}>
        <label>언어:</label>
        <select
          value={preferences.language}
          onChange={(e) => handlePreferenceChange("language", e.target.value)}
          className={styles.select}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div className={styles.preferenceGroup}>
        <label>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) =>
              handlePreferenceChange("notifications", e.target.checked)
            }
          />
          알림 받기
        </label>
      </div>
    </div>
  );
}
```

### 5단계: 성능 최적화된 컴포넌트 생성

`src/components/OptimizedCounter.jsx` 파일을 생성합니다:

```javascript
import { memo, useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import styles from "./OptimizedCounter.module.css";

// 메모이제이션된 selector
const selectCounterValue = (state) => state.counter?.value || 0;

// 메모이제이션된 컴포넌트
export const OptimizedCounter = memo(function OptimizedCounter() {
  const count = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();

  // 액션 생성자들을 메모이제이션
  const handleIncrement = useCallback(() => {
    dispatch({ type: "counter/increment" });
  }, [dispatch]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "counter/decrement" });
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
```

### 6단계: 다중 구독 컴포넌트 생성

`src/components/MultiSubscriber.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector } from "@/app/hooks";
import {
  selectUserProfile,
  selectTheme,
  selectIsLoggedIn,
} from "@/features/user/userSlice";
import styles from "./MultiSubscriber.module.css";

export function MultiSubscriber() {
  // 여러 상태를 개별적으로 구독
  const profile = useAppSelector(selectUserProfile);
  const theme = useAppSelector(selectTheme);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // 또는 여러 상태를 한 번에 구독 (주의: 매번 새 객체 생성)
  const userInfo = useAppSelector((state) => ({
    name: state.user.profile.name,
    theme: state.user.preferences.theme,
    isLoggedIn: state.user.isLoggedIn,
  }));

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h3>다중 상태 구독</h3>

      <div className={styles.section}>
        <h4>개별 구독:</h4>
        <p>이름: {isLoggedIn ? profile.name : "로그인 필요"}</p>
        <p>테마: {theme}</p>
        <p>로그인 상태: {isLoggedIn ? "로그인됨" : "로그아웃됨"}</p>
      </div>

      <div className={styles.section}>
        <h4>통합 구독:</h4>
        <p>이름: {userInfo.isLoggedIn ? userInfo.name : "로그인 필요"}</p>
        <p>테마: {userInfo.theme}</p>
        <p>로그인 상태: {userInfo.isLoggedIn ? "로그인됨" : "로그아웃됨"}</p>
      </div>
    </div>
  );
}
```

### 7단계: 스토어 구성 완성

`src/app/store.js` 파일을 업데이트합니다:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import counterReducer from "@/features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
```

### 8단계: 메인 App 컴포넌트 구성

`src/App.jsx` 파일을 업데이트합니다:

```javascript
import { useAppSelector } from "@/app/hooks";
import { selectTheme } from "@/features/user/userSlice";
import { UserProfile } from "@/features/user/UserProfile";
import { UserPreferences } from "@/features/user/UserPreferences";
import { OptimizedCounter } from "@/components/OptimizedCounter";
import { MultiSubscriber } from "@/components/MultiSubscriber";
import styles from "./App.module.css";

export function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <header className={styles.header}>
        <h1>React-Redux 통합 데모</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <UserProfile />
        </div>

        <div className={styles.section}>
          <UserPreferences />
        </div>

        <div className={styles.section}>
          <OptimizedCounter />
        </div>

        <div className={styles.section}>
          <MultiSubscriber />
        </div>
      </main>
    </div>
  );
}
```

## 챌린지 과제

### 미션

`challenge` 폴더에서 다음 과제를 수행해보세요:

1. **쇼핑몰 앱 구현하기**

   - 상품 목록, 장바구니, 사용자 정보를 각각의 slice로 관리
   - 여러 컴포넌트에서 동일한 상태를 구독하고 업데이트
   - 성능 최적화 패턴 적용

2. **실시간 알림 시스템 구현하기**
   - 알림 상태를 Redux로 관리
   - 여러 컴포넌트에서 알림 상태 구독
   - 알림 추가/제거/읽음 처리 기능

### 확인하기

- [ ] 사용자 로그인/로그아웃 기능이 정상 작동하는가?
- [ ] 프로필 편집 기능이 정상 작동하는가?
- [ ] 테마 변경이 실시간으로 반영되는가?
- [ ] 사용자 설정 변경이 정상 작동하는가?
- [ ] 최적화된 컴포넌트가 불필요한 리렌더링을 방지하는가?
- [ ] 다중 상태 구독이 정상적으로 동작하는가?
- [ ] Redux DevTools에서 모든 상태 변화를 추적할 수 있는가?
- [ ] TypeScript 타입 에러가 없는가?
