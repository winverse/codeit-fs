# 7. 로딩 상태 관리 (Loading States)

이번 챕터에서는 TanStack Router의 강력한 데이터 로딩 기능을 사용하여, 비동기 데이터 요청 시 발생하는 로딩 상태를 효과적으로 관리하는 방법을 배웁니다. `loader` 함수로 데이터를 미리 불러오고, `pendingComponent`를 사용하여 사용자에게 로딩 중임을 알리는 UI(스켈레톤 등)를 보여줍니다.

## 학습 목표

- `loader` 함수를 사용하여 라우트가 렌더링되기 전에 데이터를 미리 불러올 수 있다.
- `useLoaderData` 훅을 사용하여 `loader`가 반환한 데이터를 컴포넌트에서 사용할 수 있다.
- `pendingComponent` 옵션을 사용하여 데이터 로딩 중에 보여줄 스켈레톤 UI나 스피너를 설정할 수 있다.
- 전역 로딩 상태를 감지하고, 라우터의 상태를 기반으로 글로벌 로딩 인디케이터를 구현할 수 있다.

## 주요 개념

- **`loader`**: 라우트가 렌더링되기 전에 실행되는 비동기 함수입니다. API 요청과 같은 데이터 로딩 작업을 처리하며, 반환된 데이터는 해당 라우트의 컴포넌트에서 사용할 수 있습니다.
- **`useLoaderData`**: 현재 라우트의 `loader` 함수가 반환한 데이터를 가져오는 훅입니다. 타입 안전성이 보장됩니다.
- **`pendingComponent`**: `loader` 함수가 실행되는 동안(데이터 로딩 중) 렌더링될 컴포넌트를 지정하는 옵션입니다. 사용자 경험을 크게 향상시킬 수 있습니다.
- **전역 로딩 상태**: `useRouter` 훅을 통해 라우터의 전체 상태(`router.state.isLoading`)에 접근하여, 애플리케이션 전역에 걸친 로딩 인디케이터(예: 페이지 상단의 로딩 바)를 구현할 수 있습니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: Mock API 및 데이터 로딩 함수 준비

`src/lib/api.js` 파일에 실제 API처럼 지연 시간을 시뮬레이션하는 데이터 로딩 함수(`fetchPosts`, `fetchPost`)가 미리 준비되어 있습니다. 우리는 이 함수들을 `loader`에서 사용할 것입니다.

### 2단계: 게시물 목록 페이지(`posts/index.jsx`)에 `loader` 적용

`src/routes/posts/index.jsx` 파일을 수정하여, 페이지에 진입할 때 게시물 목록을 미리 불러오도록 `loader` 함수를 추가합니다.

```jsx
// src/routes/posts/index.jsx (수정)
import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPosts } from '../../lib/api';

export const Route = createFileRoute('/posts/')({
  // loader 함수 추가
  loader: () => fetchPosts(),
  component: PostList,
});

function PostList() {
  // useLoaderData 훅으로 데이터 가져오기
  const posts = Route.useLoaderData();

  return (
    <div className="page-content">
      <h1>블로그 게시물</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 3단계: 상세 페이지(`posts/$postId.jsx`)에 `pendingComponent` 적용

`src/routes/posts/$postId.jsx` 파일을 수정합니다. `loader`로 특정 게시물을 불러오고, 로딩이 진행되는 동안에는 `pendingComponent`에 지정된 스켈레톤 UI가 보이도록 설정합니다.

```jsx
// src/routes/posts/$postId.jsx (수정)
import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPost } from '../../lib/api';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
  component: PostDetail,
  // 로딩 중 보일 컴포넌트 지정
  pendingComponent: PostSkeleton,
});

function PostDetail() {
  const post = Route.useLoaderData();
  return (
    <div className="page-content">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <Link to="/posts" className="btn" style={{ marginTop: '2rem' }}>
        &larr; 모든 게시물 보기
      </Link>
    </div>
  );
}

// 스켈레톤 UI 컴포넌트
function PostSkeleton() {
  return (
    <div className="page-content">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line half"></div>
    </div>
  );
}
```

### 4단계: 전역 로딩 인디케이터 구현

`src/routes/__root.jsx` 파일을 수정하여, 라우트 전환 시 페이지 상단에 로딩 바가 표시되도록 합니다. `useRouter` 훅으로 라우터의 전역 로딩 상태를 감지합니다.

```jsx
// src/routes/__root.jsx (수정)
import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router';

// ...

function RootComponent() {
  const router = useRouter();
  const isLoading = router.state.isLoading;

  return (
    <>
      {/* isLoading이 true일 때만 로딩 바 표시 */}
      <div className={`global-loader ${isLoading ? 'active' : ''}`}></div>
      <nav>{/* ... */}</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```
