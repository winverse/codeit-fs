# 3. 라우트 트리 구조와 레이아웃 라우트

이번 챕터에서는 TanStack Router의 레이아웃 라우트(`_layout`)를 사용하여 복잡한 라우트 트리 구조를 만드는 방법을 배웁니다. 공통 레이아웃을 공유하는 중첩된 라우트 그룹을 효율적으로 관리하는 방법을 익힙니다.

## 학습 목표

- 레이아웃 라우트(`_layout.jsx`)의 개념과 사용법을 이해할 수 있다.
- 복잡한 라우트 트리 구조를 설계하고 구현할 수 있다.
- 공통 레이아웃을 공유하는 라우트 그룹을 만들 수 있다.
- 사이드바와 같은 공통 UI 요소를 레이아웃에 통합할 수 있다.

## 주요 개념

- **레이아웃 라우트**: URL에 영향을 주지 않으면서 공통 레이아웃을 제공하는 특수한 라우트입니다.
- **`_layout.jsx`**: 언더스코어로 시작하는 파일로, URL 경로에 나타나지 않는 레이아웃 전용 라우트입니다.
- **라우트 트리**: 계층적으로 구성된 라우트들의 구조로, 부모-자식 관계를 가집니다.
- **공통 레이아웃**: 여러 라우트에서 공유되는 UI 구조(헤더, 사이드바, 푸터 등)입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: Dashboard 레이아웃 라우트 생성

`src/routes/dashboard/_layout.jsx` 파일을 생성하고, `index.css`에 정의된 클래스를 사용하여 대시보드 레이아웃을 구성합니다.

```jsx
// src/routes/dashboard/_layout.jsx (새로 생성)
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout')({
  component: () => (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h3>Dashboard</h3>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard" activeProps={{ className: 'active' }}>
                📊 Overview
              </Link>
            </li>
            <li>
              <Link to="/dashboard/analytics" activeProps={{ className: 'active' }}>
                📈 Analytics
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" activeProps={{ className: 'active' }}>
                ⚙️ Settings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" activeProps={{ className: 'active' }}>
                👤 Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  ),
})
```

### 2단계: 메인 네비게이션 업데이트

`src/routes/__root.jsx` 파일을 수정하여 대시보드로의 진입점을 만들고, 전체 레이아웃 구조를 정리합니다.

```jsx
// src/routes/__root.jsx (수정)
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="root-nav">
        <ul>
          <li>
            <Link to="/" activeProps={{ className: "active" }}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/about" activeProps={{ className: "active" }}>
              ℹ️ About
            </Link>
          </li>
          <li>
            <Link to="/dashboard" activeProps={{ className: "active" }}>
              📊 Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <main className="root-main">
        <Outlet />
      </main>
    </>
  ),
});
```

### 3단계: 개발 서버 실행 및 테스트

```bash
npm run dev
```

브라우저에서 Dashboard 페이지로 이동했을 때, 사이드바가 포함된 새로운 레이아웃이 올바르게 표시되는지 확인합니다.

## 핵심 포인트

1. **레이아웃 라우트의 특성**: `_layout.jsx`는 URL에 나타나지 않으면서 자식 라우트들의 공통 UI 셸을 제공합니다.
2. **관심사 분리**: JSX 구조와 스타일을 분리함으로써(인라인 스타일 대신 CSS 클래스 사용), 코드의 가독성과 유지보수성이 향상됩니다.
3. **확장 가능한 구조**: 새로운 대시보드 페이지를 추가해도 `_layout.jsx` 덕분에 동일한 레이아웃을 쉽게 공유할 수 있습니다.
