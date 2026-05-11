# 4. Not Found 페이지와 리다이렉트

이번 챕터에서는 사용자가 존재하지 않는 URL로 접근했을 때 보여줄 "404 Not Found" 페이지를 설정하는 방법과, 특정 경로로 접근한 사용자를 다른 경로로 자동으로 이동시키는 리다이렉션(Redirection)을 구현하는 방법을 배웁니다.

## 학습 목표

- `path="*"`를 사용하여 모든 경로와 일치하는 "Catch-all" 라우트를 설정할 수 있다.
- 정의되지 않은 경로로 접근 시, Not Found 페이지를 보여줄 수 있다.
- `Navigate` 컴포넌트를 사용하여 선언적으로 리다이렉트를 구현할 수 있다.
- `replace` prop을 사용하여 브라우저 히스토리 관리를 최적화할 수 있다.

## 주요 개념

- **Catch-all Route (`path="*"`)**: `Routes` 내에서 다른 어떤 `Route`의 `path`와도 일치하지 않는 경우에만 렌더링되는 특수한 경로입니다. 일반적으로 404 Not Found 페이지를 구현하는 데 사용됩니다.
- **`Navigate` 컴포넌트**: 렌더링될 때 현재 위치를 변경하는(리다이렉트하는) 컴포넌트입니다. `to` prop으로 이동할 경로를 지정합니다.
- **`replace` prop**: `Navigate` 컴포넌트의 prop으로, `true`로 설정하면 현재 경로를 브라우저 히스토리 스택에 쌓지 않고 새로운 경로로 대체합니다. 뒤로 가기 버튼을 눌렀을 때 리다이렉트 되기 전 페이지로 돌아가는 것을 방지하기 위해 주로 사용됩니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 리다이렉트 구현하기

`App.jsx` 파일에서 `Navigate` 컴포넌트를 사용하여 특정 경로들을 다른 경로로 리다이렉트 시켜봅시다.

**1. 레거시 경로 리다이렉트**

과거에 사용했던 `/legacy-profile` 경로를 새로운 `/profile` 경로로 리다이렉트합니다.

```jsx
// 04-not-found-and-redirect/starter/src/App.jsx (수정)
// ...
      <Route path="/profile" element={<ProfilePage />} />

      {/* /legacy-profile 경로로 접속하면 /profile 로 리다이렉트합니다. */}
      <Route
        path="/legacy-profile"
        element={<Navigate to="/profile" replace />}
      />
// ...
```

**2. 별칭 경로 리다이렉트 (실습)**

추가로, `/home` 경로를 기본 홈 경로인 `/`로 리다이렉트하는 실습을 진행합니다.

```jsx
// 04-not-found-and-redirect/starter/src/App.jsx (추가)
// ...
      <Route
        path="/legacy-profile"
        element={<Navigate to="/profile" replace />}
      />

      {/* 실습 과제: /home 경로를 / 로 리다이렉트 */}
      <Route path="/home" element={<Navigate to="/" replace />} />
// ...
```

### 2단계: Not Found 페이지 구현하기

정의된 경로 외의 모든 경로로 접근 시 `NotFoundPage`를 보여주도록 설정합니다. `path="*"` 라우트는 **항상 `Routes`의 가장 마지막에 위치해야 합니다.**

```jsx
// 04-not-found-and-redirect/starter/src/App.jsx (최종본)

import { Routes, Route, Navigate } from 'react-router';
import { HomePage } from './pages/Home';
import { ProfilePage } from './pages/Profile';
import { NotFoundPage } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* 리다이렉트 경로들 */}
      <Route
        path="/legacy-profile"
        element={<Navigate to="/profile" replace />}
      />
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 위의 어떤 경로와도 일치하지 않으면 NotFoundPage를 보여줍니다. */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

이제 `/legacy-profile`로 접속하면 `/profile`로, `/home`으로 접속하면 `/`로 URL이 바뀌고, `/asdf`처럼 존재하지 않는 경로로 접속하면 `NotFoundPage`의 내용이 보이게 됩니다.
