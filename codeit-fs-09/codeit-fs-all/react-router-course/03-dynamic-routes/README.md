# 3. 동적 라우팅과 useParams

이번 챕터에서는 동적 라우팅(Dynamic Routes)을 설정하여, URL의 일부를 변수처럼 활용하는 방법을 배웁니다. `useParams` 훅을 사용하여 URL 경로의 파라미터 값을 컴포넌트에서 가져와, 해당 값에 따라 각기 다른 콘텐츠를 보여주는 동적인 페이지를 구현합니다.

## 학습 목표

- 경로에 `:`를 사용하여 동적 세그먼트(Dynamic Segment)를 포함하는 라우트를 설정할 수 있다.
- `useParams` 훅을 사용하여 컴포넌트 내에서 동적 세그먼트의 값을 가져올 수 있다.
- URL 파라미터 값을 기반으로 특정 데이터를 찾아 화면에 렌더링할 수 있다.

## 주요 개념

- **동적 세그먼트 (Dynamic Segment)**: URL 경로의 일부를 변수처럼 사용하는 것입니다. 경로를 정의할 때 콜론(`:`) 뒤에 파라미터 이름을 지정하여 만듭니다. (예: `/posts/:postId`)
- **`useParams`**: React Router가 제공하는 훅으로, 현재 URL의 동적 세그먼트 값을 객체 형태로 반환합니다. 예를 들어, 경로가 `/posts/123`이고 라우트 설정이 `<Route path="/posts/:postId" ... />`이라면, `useParams()`는 `{ postId: '123' }`을 반환합니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 게시글 상세 페이지 동적 라우트 설정

`App.jsx` 파일에서, 게시글의 `id`에 따라 상세 페이지를 보여줄 수 있도록 동적 라우트를 설정합니다.

```jsx
// 03-dynamic-routes/starter/src/App.jsx (수정)
// ...
      <Route path="/posts" element={<PostListPage />} />
      {/* TODO 주석을 아래 코드로 교체 */}
      <Route path="/posts/:postId" element={<PostDetailPage />} />
// ...
```

### 2단계: `useParams`로 게시글 ID 가져오기

`PostDetailPage.jsx`에서 `useParams`를 사용해 URL로부터 `postId`를 가져와, 해당 ID를 가진 게시글 정보를 화면에 렌더링합니다.

```jsx
// 03-dynamic-routes/starter/src/pages/PostDetail/PostDetailPage.jsx (수정)

import { useParams, Link } from "react-router";
// ...
export function PostDetailPage() {
  // 2. useParams 호출하여 postId 가져오기
  const { postId } = useParams();
  const post = posts.find((p) => p.id === postId);
  // ...
}
```

### 3단계: 사용자 프로필 동적 라우트 추가 (심화)

동일한 원리를 적용하여, 사용자 ID에 따라 다른 프로필 페이지를 보여주는 동적 라우트를 추가합니다.

**1. `UserPage` 컴포넌트 생성**: `src/pages/User` 폴더에 `UserPage.jsx`와 `index.js`를 생성합니다.

**2. `App.jsx`에 사용자 라우트 추가**: `App.jsx`에 `UserPage`를 import하고, `/users/:userId` 경로에 대한 동적 라우트를 추가합니다.

```jsx
// 03-dynamic-routes/starter/src/App.jsx (수정)

// ...
import { UserPage } from './pages/User'; // 1. UserPage import 추가

export function App() {
  return (
    <Routes>
      {/* ... 기존 Route들 ... */}
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      {/* 2. 아래 UserPage 경로를 추가합니다. */}
      <Route path="/users/:userId" element={<UserPage />} />
    </Routes>
  );
}
```

**3. `PostListPage.jsx`에 사용자 링크 추가**: 게시글 목록 페이지 하단에, 각 사용자 프로필 페이지로 이동하는 링크를 추가합니다.

```jsx
// 03-dynamic-routes/starter/src/pages/PostList/PostListPage.jsx (수정)

// ...
        {/* ... 기존 postList div ... */}

        {/* 아래 내용을 추가합니다. */}
        <hr />

        <h3>사용자 프로필 보러가기</h3>
        <ul>
          <li><Link to="/users/user-1">Codeit 님 프로필</Link></li>
          <li><Link to="/users/user-2">Kim 님 프로필</Link></li>
        </ul>
// ...
```

이제 모든 시연이 완료되었습니다. `starter` 코드가 `solution` 코드와 완전히 동일해졌습니다.
