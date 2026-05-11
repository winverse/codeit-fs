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

### 2단계: `App.jsx`에 `ContactPage` 라우트 추가하기

`starter` 코드에는 `HomePage`와 `AboutPage`만 설정되어 있습니다. 여기에 `ContactPage`를 추가하여 라우팅을 확장해봅시다.

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
          <Route path="/contact" element={<ContactPage />} /> {/* 3. Route 추가 */}
        </Routes>
      </main>
    </div>
  );
}
```

### 3단계: 페이지 콘텐츠 수정하기

이제 각 페이지의 내용을 `solution` 코드와 일치하도록 수정합니다.

**1. `HomePage.jsx`에 연락처 페이지 링크를 추가합니다.**

```jsx
// 01-basic-routing/starter/src/pages/HomePage/HomePage.jsx (수정)
import { Link } from 'react-router';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>홈 페이지</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      {/* 아래 Link를 추가합니다. */}
      <Link to="/contact">연락처 페이지로 이동</Link>
    </div>
  );
}
```

**2. `ContactPage.jsx`의 스타일을 정리하고 내용을 수정합니다.**

`ContactPage.module.css`는 더 이상 사용하지 않으므로, 관련 코드를 모두 제거합니다.

```jsx
// 01-basic-routing/starter/src/pages/ContactPage/ContactPage.jsx (수정)

// import styles from './ContactPage.module.css'; // 1. 이 라인을 삭제합니다.

export function ContactPage() {
  return (
    // 2. div에서 className을 제거하고 내용을 수정합니다.
    <div>
      <h1>연락처</h1>
      <p>여기는 연락처 페이지입니다.</p>
    </div>
  );
}
```

**3. (선택) `ContactPage.module.css` 파일을 삭제합니다.**

이제 모든 시연이 완료되었습니다. `starter` 코드가 `solution` 코드와 완전히 동일해졌습니다.
