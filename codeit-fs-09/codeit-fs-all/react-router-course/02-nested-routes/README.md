# 2. 중첩 라우팅과 Outlet

이번 챕터에서는 중첩 라우팅(Nested Routes)을 구성하여 페이지 내부에 또 다른 페이지를 렌더링하는 방법을 배웁니다. 공통 레이아웃을 관리하고 중첩된 UI를 효과적으로 표현하기 위한 `Outlet` 컴포넌트의 중요성과 사용법을 익힙니다.

## 학습 목표

- `Route` 컴포넌트 내에 다른 `Route`를 중첩하여 계층적인 경로 구조를 만들 수 있다.
- 부모 경로의 컴포넌트에서 `Outlet`을 사용하여 자식 경로의 컴포넌트가 렌더링될 위치를 지정할 수 있다.
- `index` prop을 사용하여 부모 경로와 정확히 일치할 때 렌더링되는 기본 자식 경로를 설정할 수 있다.

## 주요 개념

- **중첩 라우팅 (Nested Routes)**: `<Route>` 안에 또 다른 `<Route>`를 넣어 경로의 계층을 만드는 방식입니다. 예를 들어 `/community` 경로 안에 `/community/new`와 같은 자식 경로를 둘 수 있습니다.
- **`Outlet`**: 부모 `Route`의 `element`에서 사용되는 특별한 컴포넌트입니다. 자식 `Route`의 `element`가 렌더링될 위치를 표시하는 "placeholder" 역할을 합니다.
- **`index` 라우트**: `path` 대신 `index` prop을 사용하는 `Route`입니다. 부모의 URL과 정확히 일치할 때 렌더링될 기본 자식 UI를 지정하는 데 사용됩니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 코드 구조 리팩토링 및 스타일 정리

본격적인 기능 구현에 앞서, 프로젝트의 일관성을 높이기 위해 파일명을 규칙에 맞게 변경하고 CSS 스타일을 정리합니다.

**1. 파일명 변경**: `GEMINI.md` 가이드라인에 따라 페이지 컴포넌트 파일명을 `PascalCasePage.jsx` 형식으로 변경합니다.
   - `src/pages/Home/Home.jsx` → `HomePage.jsx`
   - `src/pages/Community/Community.jsx` → `CommunityPage.jsx`
   - `src/pages/CommunityHome/CommunityHome.jsx` → `CommunityHomePage.jsx`
   - `src/pages/NewPost/NewPost.jsx` → `NewPostPage.jsx`

**2. `index.js` 파일 수정**: 각 폴더의 `index.js` 파일을 수정하여 변경된 파일명을 반영합니다.
   - 예: `src/pages/Home/index.js` → `export * from './HomePage';`

**3. CSS 정리**: 불필요한 CSS 파일을 삭제하고 관련 코드를 정리합니다.
   - `src/index.css` 파일을 삭제합니다.
   - `src/main.jsx`에서 `index.css` import 구문을 삭제합니다.
   - 각 페이지 컴포넌트(`HomePage`, `CommunityPage` 등)에서 `.module.css` import 구문과 `className` prop을 모두 제거합니다.

**4. `App.jsx`의 import 구문 수정**: `Layout` 컴포넌트를 `named import` 방식으로 수정합니다.
```jsx
// src/App.jsx (수정)
import { Layout } from './components/Layout'; // 중괄호 추가
```

### 2단계: Community 페이지 중첩 라우팅

`/community` 경로에 중첩 라우트를 설정하고, 부모 컴포넌트에 `Outlet`을 추가합니다.

**1. `App.jsx`에 중첩 라우트 추가**
```jsx
// src/App.jsx (수정)
// ...
        <Route path="community" element={<CommunityPage />}>
          <Route index element={<CommunityHomePage />} />
          <Route path="new-post" element={<NewPostPage />} />
        </Route>
// ...
```

**2. `CommunityPage.jsx`에 `Outlet` 및 `NavLink` 추가**
```jsx
// src/pages/Community/CommunityPage.jsx (수정)
import { NavLink, Outlet } from 'react-router-dom';

export function CommunityPage() {
  return (
    <div>
      <h2>커뮤니티</h2>
      <nav>
        <NavLink to="/community" end={true}>글 목록</NavLink>
        <NavLink to="/community/new-post">글쓰기</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
```

### 3단계: Profile 페이지 중첩 라우팅 (추가 구현)

`/profile` 경로에도 중첩 라우팅을 추가로 구현합니다.

**1. 페이지 컴포넌트 생성**: `MyInfoPage.jsx`, `EditProfilePage.jsx`, `ProfilePage.jsx` 파일을 `src/pages` 내에 각각 생성합니다.

**2. `App.jsx`에 Profile 라우트 추가**
```jsx
// src/App.jsx (수정)
// ... ProfilePage, MyInfoPage, EditProfilePage import 추가 ...
// ...
        <Route path="profile" element={<ProfilePage />}>
          <Route index element={<MyInfoPage />} />
          <Route path="edit" element={<EditProfilePage />} />
        </Route>
// ...
```

**3. `Layout.jsx`에 Profile 링크 추가**
```jsx
// src/components/Layout/Layout.jsx (수정)
// ...
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          프로필
        </NavLink>
// ...
```

이제 모든 시연이 완료되었습니다. `starter` 코드가 `solution` 코드와 완전히 동일해졌습니다.
