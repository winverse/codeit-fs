# 1. React Router 기본 설정과 라우팅

이번 챕터에서는 React 애플리케이션에 React Router를 설치하고, 가장 기본적인 페이지 이동(라우팅)을 구현하는 방법을 배웁니다. `BrowserRouter`, `Routes`, `Route`, `Link` 컴포넌트의 역할을 이해하고 사용법을 익힙니다.

## 학습 목표

- React Router를 설치하고 `main.jsx`에 기본 설정을 할 수 있다.
- `BrowserRouter`, `Routes`, `Route` 컴포넌트를 이용해 여러 페이지의 경로를 구성할 수 있다.
- `Link` 컴포넌트를 사용해 페이지 이동 링크를 만들 수 있다.

## 주요 개념

- **`BrowserRouter`**: HTML5 History API를 사용하여 UI와 URL을 동기화하는 라우터입니다. 애플리케이션 최상단에 감싸서 사용합니다.
- **`Routes`**: 여러 `Route` 컴포넌트를 감싸는 컨테이너입니다. 현재 URL과 가장 일치하는 첫 번째 `Route`를 렌더링합니다.
- **`Route`**: 특정 경로(`path`)에 어떤 컴포넌트(`element`)를 보여줄지 정의합니다.
- **`Link`**: `<a>` 태그와 유사하지만, 페이지를 새로고침하지 않고 애플리케이션 내에서 경로를 이동시켜주는 컴포넌트입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `main.jsx`에 `BrowserRouter` 설정 확인하기

`starter` 코드를 보면 이미 `main.jsx`에 `BrowserRouter`가 설정되어 있습니다. 라우팅 기능이 애플리케이션 전체에 적용되어 있는 것을 확인할 수 있습니다.

```jsx
// 01-basic-routing/starter/src/main.jsx (이미 설정됨)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/reset.css";
import "./index.css";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### 2단계: `App.jsx`에 `ContactPage` 추가하기

`starter` 코드에는 `HomePage`와 `AboutPage`만 설정되어 있습니다. 여기에 `ContactPage`를 추가하여 라우팅을 확장해봅시다.

현재 `App.jsx` 파일을 살펴보면:

```jsx
// 01-basic-routing/starter/src/App.jsx (현재 상태)

import { Routes, Route, Link } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
```

`ContactPage`를 추가하기 위해 다음과 같이 수정합니다:

```jsx
// 01-basic-routing/starter/src/App.jsx (수정)

import { Routes, Route, Link } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage"; // 1. import 추가
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/about">소개</Link>
          <Link to="/contact">연락처</Link> {/* 2. Link 추가 */}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />{" "}
          {/* 3. Route 추가 */}
        </Routes>
      </main>
    </div>
  );
}
```

이것으로 기본적인 라우팅 설정 시연이 완료됩니다.

---

## 챌린지 과제: `BlogPage` 추가하기

강의에서 배운 내용을 바탕으로, `BlogPage`를 직접 추가해보세요.

`challenge` 폴더에 준비된 `pages/BlogPage` 폴더를 `starter` 또는 `solution` 폴더의 `src/pages`에 복사하여 실습을 시작하세요.

### 미션

1.  `App.jsx`에서 `BlogPage`를 import 하세요. (`import { BlogPage } from './pages/BlogPage';`)
2.  헤더에 `/blog` 경로로 이동하는 `<Link>` 컴포넌트를 추가하세요. (링크 텍스트: "블로그")
3.  `<Routes>` 내부에 `/blog` 경로 요청 시 `BlogPage` 컴포넌트를 렌더링하는 `<Route>`를 추가하세요.

### 확인하기

- 헤더에 '블로그' 링크가 나타나야 합니다.
- '블로그' 링크를 클릭하면 URL이 `/blog`로 변경되고, '블로그 페이지입니다.'라는 내용이 화면에 보여야 합니다.
