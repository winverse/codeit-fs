# 7. 동적 헤드 정보 관리

이번 챕터에서는 각 페이지의 내용에 맞게 브라우저 탭에 표시되는 제목(`<title>`), 메타 태그, Open Graph 태그 등을 동적으로 관리하는 방법을 배웁니다. `react-helmet-async`를 사용하여 선언적으로 헤드 정보를 관리하고, SEO 최적화와 소셜 미디어 공유 최적화를 구현합니다.

## 학습 목표

- `react-helmet-async`를 설치하고 설정하여 동적으로 헤드 정보를 관리할 수 있다.
- `Helmet` 컴포넌트를 사용하여 페이지별로 다른 제목, 메타 설명, Open Graph 태그를 설정할 수 있다.
- SEO 최적화와 소셜 미디어 공유를 위한 메타 태그의 중요성을 이해한다.

## 주요 개념

- **`react-helmet-async`**: React 애플리케이션에서 HTML 헤드 섹션의 메타 태그들을 동적으로 관리할 수 있게 해주는 라이브러리입니다. Server-Side Rendering(SSR)을 지원하며, 비동기적으로 작동합니다.
- **`Helmet` 컴포넌트**: 헤드 정보를 선언적으로 관리할 수 있는 컴포넌트입니다. `<title>`, `<meta>`, `<link>` 등의 태그를 JSX 형태로 작성할 수 있습니다.
- **SEO (Search Engine Optimization)**: 검색 엔진이 웹 페이지를 더 잘 이해하고 높은 순위로 노출시킬 수 있도록 최적화하는 작업입니다. 적절한 title과 meta description이 핵심입니다.
- **Open Graph**: Facebook, Twitter 등 소셜 미디어에서 링크를 공유할 때 표시되는 미리보기 정보를 제어하는 메타 태그 규약입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `react-helmet-async` 설치 및 설정

먼저 터미널에서 `react-helmet-async` 라이브러리를 설치합니다.

```bash
npm install react-helmet-async
```

`main.jsx`에서 `HelmetProvider`로 애플리케이션을 감싸서 Helmet 기능을 활성화합니다.

```jsx
// 07-dynamic-head/starter/src/main.jsx (수정)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async"; // 1. import 추가

import "./styles/reset.css";
import "./index.css";
import { App } from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* 2. HelmetProvider로 감싸기 */}
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
```

### 2단계: `HomePage`에 동적 헤드 정보 설정

`pages/Home/HomePage.jsx`에서 `Helmet` 컴포넌트를 사용하여 페이지별 헤드 정보를 설정합니다.

```jsx
// 07-dynamic-head/starter/src/pages/Home/HomePage.jsx (수정)

import { Link } from "react-router";
import { Helmet } from "react-helmet-async"; // 1. Helmet import

export function HomePage() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* 2. TODO 주석 아래에 Helmet 컴포넌트 추가 */}
      <Helmet>
        <title>홈 - React Router 학습</title>
        <meta
          name="description"
          content="React Router를 배우는 홈 페이지입니다."
        />
        <meta property="og:title" content="홈 - React Router 학습" />
        <meta
          property="og:description"
          content="React Router를 배우는 홈 페이지입니다."
        />
      </Helmet>

      <h1>홈 페이지</h1>
      <p>
        이 페이지의 제목은 "홈 - React Router 학습" 입니다. 브라우저 탭을
        확인해보세요.
      </p>
      <Link to="/about">소개 페이지로 이동</Link>
    </div>
  );
}
```

### 3단계: `AboutPage`에 동적 헤드 정보 설정

`pages/About/AboutPage.jsx`에도 동일한 방식으로 `Helmet`을 사용하여 페이지별 헤드 정보를 설정합니다.

```jsx
// 07-dynamic-head/starter/src/pages/About/AboutPage.jsx (수정)

import { Link } from "react-router";
import { Helmet } from "react-helmet-async"; // 1. Helmet import

export function AboutPage() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* 2. TODO 주석 아래에 Helmet 컴포넌트 추가 */}
      <Helmet>
        <title>소개 - React Router 학습</title>
        <meta
          name="description"
          content="React Router 학습 사이트 소개 페이지입니다."
        />
        <meta property="og:title" content="소개 - React Router 학습" />
        <meta
          property="og:description"
          content="React Router 학습 사이트 소개 페이지입니다."
        />
      </Helmet>

      <h1>소개 페이지</h1>
      <p>
        이 페이지의 제목은 "소개 - React Router 학습" 입니다. 브라우저 탭을
        확인해보세요.
      </p>
      <Link to="/">홈 페이지로 이동</Link>
    </div>
  );
}
```

이제 각 페이지로 이동할 때마다 브라우저 탭의 제목과 메타 태그들이 해당 페이지에 맞게 동적으로 변경되는 것을 확인할 수 있습니다.