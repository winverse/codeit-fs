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

### 1단계: 동적 라우트 설정하기

`starter/src/App.jsx` 파일에서, 게시글의 `id`에 따라 상세 페이지를 보여줄 수 있도록 동적 라우트를 설정합니다.

```jsx
// 03-dynamic-routes/starter/src/App.jsx (수정)
// ...
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<PostListPage />} />
      {/* TODO 주석을 아래 코드로 교체 */}
      <Route path="/posts/:postId" element={<PostDetailPage />} />
    </Routes>
  );
}
```

### 2단계: `useParams`로 게시글 ID 가져오기

`PostDetailPage.jsx`에서 `useParams`를 사용해 URL로부터 `postId`를 가져와, 해당 ID를 가진 게시글 정보를 화면에 렌더링합니다.

```jsx
// 03-dynamic-routes/starter/src/pages/PostDetail/PostDetailPage.jsx (수정)

import { useParams, Link } from "react-router"; // 1. useParams import 확인
import styles from "./PostDetail.module.css";
import { posts } from "../../data/posts";

export function PostDetailPage() {
  // 2. useParams 호출하여 postId 가져오기
  const { postId } = useParams();
  const post = posts.find((p) => p.id === postId);

  // ... (이하 렌더링 로직은 동일)
}
```

이제 `PostListPage`에서 특정 게시글을 클릭하면, URL이 `/posts/1`과 같이 변경되고 `PostDetailPage`에서는 해당 `id`를 가진 게시글의 상세 내용이 보이게 됩니다.

---

## 챌린지 과제: `UserPage` 동적 라우팅 구현하기

강의에서 배운 동적 라우팅과 `useParams`를 응용하여, 사용자 ID에 따라 다른 사용자 정보를 보여주는 `UserPage`를 직접 만들어보세요.

`challenge` 폴더에 준비된 파일들을 `starter` 또는 `solution` 폴더에 덮어쓰거나, 해당 파일의 내용을 참고하여 실습을 시작하세요.

### 미션

1.  **`data/users.js` 파일 확인**
    - `challenge/src/data/users.js` 파일을 `src/data` 폴더로 복사하세요. 이 파일에는 챌린지에서 사용할 사용자 정보가 들어있습니다.
2.  **`App.jsx` 설정**
    - `UserPage`를 import 하세요. (`import UserPage from './pages/User';`)
    - `/users/:userId` 경로에 `UserPage`를 렌더링하는 동적 라우트를 추가하세요.
3.  **`pages/User/UserPage.jsx` 완성하기**
    - `useParams`를 사용해 URL로부터 `userId`를 가져오세요.
    - `users` 데이터에서 `userId`와 일치하는 사용자 객체를 찾으세요.
    - 찾은 사용자 정보(`name`, `email`, `website`)를 화면에 렌더링하세요.
4.  **(보너스) `pages/PostList/PostListPage.jsx`에 링크 추가하기**
    - `PostListPage.jsx`를 열고, 각 게시글의 작성자 이름(`post.author`)을 클릭하면 해당 사용자의 프로필 페이지(`/users/:userId`)로 이동하도록 `<Link>`를 추가해보세요. (단, `posts` 데이터의 `authorId`와 `users` 데이터의 `id`를 연결해야 합니다. 이 부분은 데이터 구조상 어려울 수 있으니, 간단히 `/users/user-1`, `/users/user-2` 등으로 링크를 하드코딩해도 좋습니다.)

### 확인하기

- 브라우저 주소창에 `/users/1`을 직접 입력했을 때, Leanne Graham의 정보가 나타나야 합니다.
- `/users/2`를 입력하면 Ervin Howell의 정보가 나타나야 합니다.
- `/users/99`와 같이 존재하지 않는 ID를 입력하면 "존재하지 않는 사용자입니다." 메시지가 보여야 합니다.
