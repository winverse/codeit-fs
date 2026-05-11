# 2. 중첩 라우팅과 Outlet

이번 챕터에서는 중첩 라우팅(Nested Routes)을 구성하여 페이지 내부에 또 다른 페이지를 렌더링하는 방법을 배웁니다. 공통 레이아웃을 관리하고 중첩된 UI를 효과적으로 표현하기 위한 `Outlet` 컴포넌트의 중요성과 사용법을 익힙니다.

## 학습 목표

- `Route` 컴포넌트 내에 다른 `Route`를 중첩하여 계층적인 경로 구조를 만들 수 있다.
- 부모 경로의 컴포넌트에서 `Outlet`을 사용하여 자식 경로의 컴포넌트가 렌더링될 위치를 지정할 수 있다.
- `index` prop을 사용하여 부모 경로와 정확히 일치할 때 렌더링되는 기본 자식 경로를 설정할 수 있다.

## 주요 개념

- **중첩 라우팅 (Nested Routes)**: `<Route>` 안에 또 다른 `<Route>`를 넣어 경로의 계층을 만드는 방식입니다. 예를 들어 `/community` 경로 안에 `/community/new`와 같은 자식 경로를 둘 수 있습니다.
- **`Outlet`**: 부모 `Route`의 `element`에서 사용되는 특별한 컴포넌트입니다. 자식 `Route`의 `element`가 렌더링될 위치를 표시하는 "placeholder" 역할을 합니다.
- **`index` 라우트**: `path` 대신 `index` prop을 사용하는 `Route`입니다. 부모의 URL과 정확히 일치할 때 렌더링될 기본 자식 UI를 지정하는 데 사용됩니다. (예: `/community` 경로 접속 시 기본으로 보여줄 페이지)

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `CommunityPage`에 중첩 라우팅 설정하기

`starter/src/App.jsx` 파일에는 `/community` 경로에 대한 기본 설정만 되어 있습니다. 이 경로에 접속했을 때 기본으로 보여줄 `CommunityHomePage`와, `/community/new-post` 경로에 보여줄 `NewPostPage`를 자식 라우트로 설정해봅시다.

1.  **자식 컴포넌트 Import**

    `App.jsx` 상단에 `CommunityHomePage`와 `NewPostPage`를 import 합니다.

    ```jsx
    // 02-nested-routes/starter/src/App.jsx (수정)
    // ...
    import { CommunityPage } from "./pages/Community";
    import { CommunityHomePage } from "./pages/CommunityHome";
    import { NewPostPage } from "./pages/NewPost";
    ```

2.  **중첩 라우트 추가**

    `/community` 경로를 가진 `Route` 내부에, `index` 라우트와 `new-post` 라우트를 추가합니다.

    ```jsx
    // 02-nested-routes/starter/src/App.jsx (수정)
    // ...
    <Route path="community" element={<CommunityPage />}>
      <Route index={true} element={<CommunityHomePage />} />
      <Route path="new-post" element={<NewPostPage />} />
    </Route>
    // ...
    ```

### 2단계: `CommunityPage`에 `Outlet`과 `NavLink` 추가하기

이제 `pages/Community/CommunityPage.jsx`가 자식 컴포넌트들을 렌더링할 위치를 지정해주어야 합니다. `Outlet`을 사용하고, 자식 페이지로 이동할 `NavLink`를 추가합니다.

```jsx
// 02-nested-routes/starter/src/pages/Community/CommunityPage.jsx (수정)

import { NavLink, Outlet } from "react-router-dom";
import styles from "./Community.module.css";

export function CommunityPage() {
  return (
    <div className={styles.page}>
      <h2>커뮤니티</h2>
      <nav>
        <NavLink to="/community" end>
          글 목록
        </NavLink>
        <NavLink to="/community/new-post">글쓰기</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
```

이것으로 중첩 라우팅 시연이 완료됩니다. `/community`로 접속하면 `CommunityHomePage`가, `/community/new-post`로 접속하면 `NewPostPage`가 `Outlet` 위치에 렌더링됩니다.

---

## 챌린지 과제: `ProfilePage` 중첩 라우팅 구현하기

강의에서 배운 중첩 라우팅과 `Outlet`을 응용하여, 프로필 관련 페이지들을 직접 구성해보세요.

`challenge` 폴더에 준비된 파일들을 `starter` 또는 `solution` 폴더에 덮어쓰거나, 해당 파일의 내용을 참고하여 실습을 시작하세요.

### 미션

1.  **`App.jsx` 설정**
    - `ProfilePage`, `MyInfoPage`, `EditProfilePage`를 import 하세요.
    - `/profile` 경로에 `ProfilePage`를 부모로 하는 중첩 라우팅을 설정하세요.
    - `MyInfoPage`는 `/profile`의 `index` 라우트로, `EditProfilePage`는 `/profile/edit` 경로로 설정하세요.
2.  **`components/Layout/Layout.jsx` 설정**
    - 헤더에 `/profile` 경로로 가는 `<NavLink>`를 추가하세요. (링크 텍스트: "프로필")
3.  **`pages/Profile/ProfilePage.jsx` 설정**
    - `MyInfoPage`와 `EditProfilePage`로 가는 `<NavLink>`를 각각 추가하세요.
    - 자식 컴포넌트(`MyInfoPage`, `EditProfilePage`)가 렌더링될 위치에 `<Outlet />`을 추가하세요.

### 확인하기

- 헤더에 '프로필' 링크가 나타나야 합니다.
- '프로필' 링크를 클릭하면 `/profile`로 이동하고, `MyInfoPage`의 내용('내 정보')이 보여야 합니다.
- `ProfilePage` 내의 '정보 수정' 링크를 클릭하면 URL이 `/profile/edit`로 바뀌고, `EditProfilePage`의 내용이 보여야 합니다.
