# 2. 파일 기반 라우팅과 중첩 라우트

이번 챕터에서는 TanStack Router의 파일 기반 라우팅 시스템을 더 깊이 이해하고, 중첩된 라우트 구조를 만드는 방법을 배웁니다. 폴더 구조를 통한 라우트 계층 구성과 `index.jsx` 파일의 역할을 익힙니다.

## 학습 목표

- 파일과 폴더 구조를 통해 복잡한 라우트 계층을 만들 수 있다.
- 중첩된 라우트에서 `index.jsx` 파일의 역할을 이해할 수 있다.
- `Outlet`을 사용하여 부모-자식 라우트 관계를 구현할 수 있다.
- 동적 라우트 구조를 설계하고 확장할 수 있다.

## 주요 개념

- **파일 기반 라우팅**: 파일과 폴더의 구조가 URL 경로를 결정하는 라우팅 방식입니다.
- **중첩 라우트**: 부모 라우트 안에 자식 라우트가 포함된 계층적 구조입니다.
- **`index.jsx`**: 폴더와 같은 이름의 경로에서 기본으로 렌더링되는 라우트입니다.
- **라우트 계층**: URL 경로의 세그먼트가 파일 시스템의 구조와 일치하는 방식입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 현재 라우트 구조 확인하기

먼저 `starter` 프로젝트의 현재 라우트 구조를 살펴보겠습니다.

```
src/routes/
├── __root.jsx     # 루트 라우트
├── index.jsx      # 홈 페이지 (/)
└── about.jsx      # 소개 페이지 (/about)
```

현재는 평면적인 구조로 되어 있습니다. 이를 계층적인 구조로 확장해보겠습니다.

### 2단계: Blog 섹션 추가하기

블로그 관련 페이지들을 위한 중첩 라우트를 만들어보겠습니다.

#### 2.1. Blog 폴더 구조 생성

```
src/routes/blog/
├── index.jsx      # 블로그 메인 페이지 (/blog)
└── archive.jsx    # 블로그 아카이브 (/blog/archive)
```

#### 2.2. Blog 인덱스 페이지 생성

`src/routes/blog/index.jsx` 파일을 생성합니다:

```jsx
// src/routes/blog/index.jsx (새로 생성)
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: () => (
    <div className="page-content">
      <h1>Blog</h1>
      <p>Welcome to our blog!</p>
    </div>
  ),
});
```

#### 2.3. Blog 아카이브 페이지 생성

`src/routes/blog/archive.jsx` 파일을 생성합니다:

```jsx
// src/routes/blog/archive.jsx (새로 생성)
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/archive")({
  component: () => (
    <div className="page-content">
      <h1>Blog Archive</h1>
      <p>Browse all our previous blog posts.</p>
    </div>
  ),
});
```

### 3단계: Dashboard 섹션 추가하기

사용자 대시보드를 위한 더 복잡한 중첩 구조를 만들어보겠습니다.

#### 3.1. Dashboard 폴더 구조 생성

```
src/routes/dashboard/
├── index.jsx      # 대시보드 메인 (/dashboard)
└── profile.jsx    # 사용자 프로필 (/dashboard/profile)
```

#### 3.2. Dashboard 메인 페이지 생성

`src/routes/dashboard/index.jsx` 파일을 생성합니다:

```jsx
// src/routes/dashboard/index.jsx (새로 생성)
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: () => (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </div>
  ),
});
```

#### 3.3. Dashboard 프로필 페이지 생성

`src/routes/dashboard/profile.jsx` 파일을 생성합니다:

```jsx
// src/routes/dashboard/profile.jsx (새로 생성)
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/profile")({
  component: () => (
    <div className="page-content">
      <h1>Profile Settings</h1>
      <p>Manage your profile.</p>
    </div>
  ),
});
```

### 4단계: 네비게이션 업데이트하기

새로 추가된 라우트들에 접근할 수 있도록 루트 라우트의 네비게이션을 업데이트합니다.

#### 4.1. 메인 네비게이션 확장

`src/routes/__root.jsx` 파일을 수정합니다:

```jsx
// src/routes/__root.jsx (수정)
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link> {/* 새로 추가 */}
          </li>
          <li>
            <Link to="/blog/archive">Archive</Link> {/* 새로 추가 */}
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link> {/* 새로 추가 */}
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link> {/* 새로 추가 */}
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
```

### 5단계: 파일 구조 및 URL 매핑 확인하기

최종적으로 다음과 같은 파일 구조와 URL 매핑이 완성됩니다:

```
src/routes/
├── __root.jsx           → 모든 페이지의 레이아웃
├── index.jsx            → /
├── about.jsx            → /about
├── blog/
│   ├── index.jsx        → /blog
│   └── archive.jsx      → /blog/archive
└── dashboard/
    ├── index.jsx        → /dashboard
    └── profile.jsx      → /dashboard/profile
```

### 6단계: 개발 서버 실행 및 테스트

```bash
npm run dev
```

브라우저에서 다음 경로들이 모두 정상적으로 작동하는지 확인해보세요:

- `/` - 홈 페이지
- `/about` - 소개 페이지
- `/blog` - 블로그 메인 페이지
- `/blog/archive` - 블로그 아카이브
- `/dashboard` - 대시보드 메인
- `/dashboard/profile` - 사용자 프로필

## 핵심 포인트

1. **폴더 = 라우트 세그먼트**: 폴더 이름이 URL 경로의 일부가 됩니다.
2. **index.jsx의 특별한 역할**: 폴더와 같은 경로에서 기본으로 렌더링되는 라우트입니다.
3. **자동 라우트 생성**: 파일을 추가하면 자동으로 해당 라우트가 생성됩니다.
4. **타입 안전한 네비게이션**: 모든 라우트 경로가 타입으로 추론됩니다.
5. **확장 가능한 구조**: 새로운 폴더와 파일을 추가하여 쉽게 라우트를 확장할 수 있습니다.

이번 챕터를 통해 TanStack Router의 파일 기반 라우팅 시스템과 중첩 라우트 구조를 완전히 이해할 수 있습니다.
