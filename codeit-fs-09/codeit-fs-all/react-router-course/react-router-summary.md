# React Router 총정리 (v7)

이 문서는 `react-router`의 핵심 개념과 주요 기능들을 총정리하여, 학습한 내용을 복습하고 전체적인 그림을 이해하는 것을 돕기 위해 작성되었습니다. **React Router v7**을 기준으로 합니다.

## 1. React Router의 존재 이유: SPA

- **전통적인 웹사이트:** 여러 개의 HTML 페이지로 구성되어, 링크를 클릭할 때마다 서버로부터 새로운 HTML 파일을 받아와 페이지 전체를 **새로고침**합니다. (속도가 느리고, 사용자 경험이 끊김)
- **싱글 페이지 애플리케이션(SPA):** 단 하나의 HTML 파일과 여러 개의 JavaScript 파일로 이루어져 있습니다. 링크를 클릭하면, JavaScript가 서버로부터 필요한 데이터만 받아온 후, 현재 페이지의 **필요한 부분만 동적으로 다시 그립니다.** (빠르고, 부드러운 사용자 경험)
- **React Router의 역할:** SPA에서, 브라우저의 주소창(URL)에 따라 적절한 페이지(컴포넌트)를 보여주도록 **'경로를 관리하고 연결'** 해주는 길잡이 역할을 합니다.

### 💡 `react-router` vs `react-router-dom`
과거에는 웹에서 사용 시 `react-router-dom`을 설치하고 거기서 컴포넌트 가져왔지만, **v6.4 이후부터 모든 기능이 `react-router` 패키지로 통합**되었습니다. 따라서 우리는 `npm install react-router`만 실행하고, `BrowserRouter`, `Link` 등 모든 것을 `react-router`에서 가져와 사용합니다. **v7에서도 이 방식은 동일하게 유지됩니다.**

---

## 2. 라우팅의 기본 설정 (Project 01)

- **`BrowserRouter`**: 라우팅 기능을 우리 앱에 적용하기 위한 가장 첫 단계. 앱 전체를 감싸서 라우팅 정보의 '우산'을 씌워줍니다. (`main.jsx`)
- **`Routes`**: 여러 개의 `<Route>`를 감싸는 컨테이너입니다. 현재 URL과 가장 일치하는 단 하나의 `<Route>`를 찾아주는 역할을 합니다.
- **`Route`**: 특정 경로(`path`)와 특정 컴포넌트(`element`)를 1:1로 짝지어주는 규칙입니다. (예: `path="/about"` 이면 `AboutPage`를 보여줘!)

---

## 3. 페이지 이동하기: 4가지 방법

React Router는 상황에 따라 페이지를 이동시키는 4가지 주요 방법을 제공합니다.

### ① `<Link>`: 사용자가 직접 클릭 (Project 01)
- **언제?** 사용자가 직접 누를 수 있는 링크를 만들 때. (예: 메뉴, 게시글 제목)
- **특징:** `<a>` 태그와 비슷하지만, 페이지 전체를 새로고침하지 않고 화면을 다시 그립니다.

### ② `<NavLink>`: 활성화된 링크에 스타일 적용 (Project 02)
- **언제?** 현재 내가 보고 있는 페이지에 해당하는 메뉴에 특별한 스타일(예: 굵은 글씨, 색상 변경)을 주고 싶을 때.
- **특징:** `<Link>`의 모든 기능을 가지면서, 활성화되었을 때 `active` 클래스나 특정 스타일을 적용하는 기능을 제공합니다.

### ③ `<Navigate>`: 렌더링 되자마자 리다이렉트 (Project 04)
- **언제?** 특정 경로로 접근했을 때, 즉시 다른 경로로 보내버리고 싶을 때. (예: `/home`을 `/`로, 삭제된 페이지를 메인으로)
- **특징:** 컴포넌트가 렌더링되는 순간 `to` prop에 지정된 경로로 이동시킵니다. `replace` 옵션은 히스토리에 현재 경로를 남기지 않아 "뒤로 가기"를 방지할 때 유용합니다.

### ④ `useNavigate`: 코드 로직으로 페이지 이동 (Project 06)
- **언제?** 특정 작업(로그인, 폼 제출)이 성공한 후에 페이지를 이동시키는 등, **프로그래밍 방식**으로 페이지를 제어해야 할 때.
- **특징:** `useNavigate()` 훅은 `navigate` 함수를 반환합니다. 이 함수를 호출하여 `navigate('/dashboard')` 와 같이 원하는 경로로 보낼 수 있습니다.

---

## 4. URL에서 정보 꺼내오기: 2가지 방법

### ① `useParams`: 경로(Path)에서 값 추출 (Project 03)
- **언제?** `/posts/:postId` 와 같이, URL 경로의 일부가 동적으로 변하는 값을 가질 때.
- **특징:** `const { postId } = useParams()` 와 같이 사용하여, URL의 `:postId` 부분에 해당하는 실제 값(예: '123')을 가져올 수 있습니다.

### ② `useSearchParams`: 쿼리 스트링에서 값 추출 (Project 05)
- **언제?** `/search?q=react&sort=asc` 와 같이, `?` 뒤에 오는 쿼리 스트링(검색 파라미터) 값을 다룰 때.
- **특징:** `const [searchParams, setSearchParams] = useSearchParams()` 형태로 사용합니다. `searchParams.get('q')`로 값을 읽고, `setSearchParams({ q: 'new' })`로 값을 변경할 수 있습니다.

---

## 5. 고급 라우팅 패턴

- **중첩 라우트와 `<Outlet>` (Project 02)**
  - 여러 페이지가 공통된 레이아웃(헤더, 사이드바 등)을 가질 때 사용합니다.
  - 부모 `Route`는 공통 레이아웃을 렌더링하고, 그 안에 `<Outlet />`을 배치합니다.
  - 자식 `Route`에 해당하는 컴포넌트들이 부모의 `<Outlet />` 위치에 렌더링됩니다.

- **404 Not Found 페이지 (Project 04)**
  - `path="*"` 를 가진 `Route`를 `Routes`의 가장 마지막에 배치합니다.
  - 위에서부터 일치하는 경로를 모두 찾지 못했을 때, 마지막으로 이 와일드카드 라우트가 선택되어 "페이지를 찾을 수 없음" 화면을 보여줍니다.

- **동적 `<head>` 관리 (Project 07)**
  - SPA에서 페이지마다 브라우저 탭의 제목(`document.title`)을 동적으로 변경해야 할 때 유용합니다.
  - `react-helmet-async` 라이브러리를 사용하여 `<HelmetProvider>`로 앱을 감싸고, 각 페이지 컴포넌트에서 `<Helmet>` 컴포넌트 안에 `<title>` 태그를 넣어 동적으로 제목을 설정할 수 있습니다.
  - 이는 사용자 경험(UX)과 검색 엔진 최적화(SEO)에 중요한 역할을 합니다.

---

## 6. React Router v7의 심화: Framework Mode와 Data Router API

React Router v7은 기존의 선언적 라우팅 방식(Library Mode) 외에, 데이터 관리를 라우팅과 통합하는 "데이터 중심 라우팅" 방식(Framework Mode)을 도입했습니다. 이는 Next.js와 같은 풀스택 프레임워크의 라우팅 방식과 유사하며, 애플리케이션의 성능과 개발 경험을 크게 향상시킵니다.

### 6.1. Framework Mode의 등장 배경: 왜 필요한가?

기존 Library Mode에서는 컴포넌트가 렌더링된 후에야 데이터를 가져오는 방식(클라이언트 사이드 페칭)을 주로 사용했습니다. 이로 인해 다음과 같은 문제점이 발생할 수 있습니다.

-   **워터폴(Waterfall) 현상:** 컴포넌트가 렌더링되고, 그 안에서 데이터를 요청하고, 데이터가 도착하면 다시 렌더링되는 과정이 순차적으로 발생하여 페이지 로딩 시간이 길어질 수 있습니다.
-   **로딩 스피너 남발:** 데이터가 준비될 때까지 로딩 스피너를 보여줘야 하므로 사용자 경험이 저하될 수 있습니다.
-   **복잡한 데이터 관리:** 컴포넌트 내에서 데이터 페칭, 로딩 상태, 에러 처리 등을 직접 관리해야 하므로 코드가 복잡해질 수 있습니다.

Framework Mode는 이러한 문제점을 해결하기 위해 **라우트가 활성화되기 전에 데이터를 미리 가져오는(Pre-fetching) 방식**을 제공합니다.

### 6.2. `createBrowserRouter`와 `RouterProvider`

Framework Mode의 핵심은 `createBrowserRouter` 함수와 `RouterProvider` 컴포넌트입니다.

-   **`createBrowserRouter`:** 라우트 객체 배열을 인자로 받아 라우터 인스턴스를 생성합니다. 이 라우트 객체는 단순히 `path`와 `element`뿐만 아니라, `loader`와 `action` 같은 데이터 관련 속성도 포함할 수 있습니다.

    ```jsx
    import { createBrowserRouter } from 'react-router';
    import { HomePage } from './pages/HomePage';
    import { PostPage, postLoader } from './pages/PostPage';

    const router = createBrowserRouter([
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'posts/:postId',
        element: <PostPage />,
        loader: postLoader, // 라우트가 활성화되기 전에 데이터를 미리 가져옵니다.
      },
    ]);
    ```

-   **`RouterProvider`:** `createBrowserRouter`로 생성된 라우터 인스턴스를 받아 애플리케이션에 라우팅 기능을 제공합니다. 앱의 최상단에 위치하여 라우팅 정보를 전역적으로 사용할 수 있게 합니다.

    ```jsx
    import { RouterProvider } from 'react-router';
    import router from './routerConfig'; // 위에서 정의한 router 인스턴스

    function App() {
      return <RouterProvider router={router} />;
    }
    ```

### 6.3. `loader`와 `action` 함수를 통한 데이터 처리

`loader`와 `action` 함수는 Framework Mode에서 데이터 관리를 담당하는 핵심 기능입니다.

-   **`loader` (데이터 로딩):**
    *   특정 라우트가 렌더링되기 **전에** 필요한 데이터를 비동기적으로 가져오는 함수입니다.
    *   `useLoaderData` 훅을 사용하여 컴포넌트 내에서 `loader`가 반환한 데이터에 접근할 수 있습니다.
    *   **장점:** 컴포넌트가 마운트되기 전에 데이터가 준비되므로, 로딩 스피너를 최소화하고 사용자 경험을 향상시킬 수 있습니다.

    ```jsx
    // pages/PostPage.jsx
    import { useLoaderData } from 'react-router';

    export async function postLoader({ params }) {
      const response = await fetch(`/api/posts/${params.postId}`);
      if (!response.ok) {
        throw new Error('게시물을 불러오는데 실패했습니다.');
      }
      return response.json();
    }

    export function PostPage() {
      const post = useLoaderData(); // loader가 반환한 데이터에 접근
      return (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      );
    }
    ```

-   **`action` (데이터 변경):**
    *   폼 제출과 같은 데이터 변경 요청(POST, PUT, PATCH, DELETE)을 처리하는 함수입니다.
    *   클라이언트 측 JavaScript 없이도 폼 제출을 처리할 수 있으며, 서버 액션과 유사한 방식으로 동작합니다.
    *   `useActionData` 훅을 사용하여 `action`이 반환한 데이터에 접근할 수 있으며, `useNavigation` 훅을 사용하여 폼 제출 상태를 확인할 수 있습니다.

    ```jsx
    // pages/NewPostPage.jsx
    import { Form, redirect } from 'react-router';

    export async function newPostAction({ request }) {
      const formData = await request.formData();
      const newPost = {
        title: formData.get('title'),
        content: formData.get('content'),
      };
      // 서버에 새 게시물 저장 로직
      await savePost(newPost);
      return redirect('/posts'); // 게시물 생성 후 /posts로 리다이렉트
    }

    export function NewPostPage() {
      return (
        <Form method="post">
          <input type="text" name="title" placeholder="제목" />
          <textarea name="content" placeholder="내용"></textarea>
          <button type="submit">게시물 생성</button>
        </Form>
      );
    }
    ```

---

## 7. React Router v7의 기타 주요 기능

v7은 아키텍처 변화 외에도 개발자 경험을 향상시키는 여러 새로운 기능을 도입했습니다.

-   **향상된 타입 안전성 (Type Safety):**
    *   TypeScript 사용자를 위해 라우트, 파라미터, `loader`/`action` 데이터 등에 대한 강력한 타입 추론 및 자동 완성 기능을 제공합니다.
    *   `createBrowserRouter`를 통해 라우트를 정의할 때 타입 정의가 더욱 명확해져 개발 중 발생할 수 있는 오류를 줄여줍니다.

-   **React 19 호환성:**
    *   React 18에서 React 19로의 원활한 전환을 지원하며, React의 최신 기능 및 성능 개선 사항을 활용할 수 있도록 설계되었습니다.

-   **SSR (Server-side Rendering) 개선사항:**
    *   데이터 라우터 API와 함께 SSR 지원이 크게 향상되었습니다. 서버에서 데이터를 미리 로드하고 HTML을 생성하여 클라이언트에 전송함으로써 초기 로딩 속도와 SEO를 개선합니다.

-   **Framework 기능:**
    *   Vite 플러그인 등을 통해 React Router를 풀스택 프레임워크처럼 사용할 수 있는 기능을 제공합니다. 이는 파일 시스템 기반 라우팅, 자동 코드 스플리팅 등 개발 편의성을 높이는 기능들을 포함합니다.

## 2. 라우팅의 기본 설정 (Project 01)

- **`BrowserRouter`**: 라우팅 기능을 우리 앱에 적용하기 위한 가장 첫 단계. 앱 전체를 감싸서 라우팅 정보의 '우산'을 씌워줍니다. (`main.jsx`)
- **`Routes`**: 여러 개의 `<Route>`를 감싸는 컨테이너입니다. 현재 URL과 가장 일치하는 단 하나의 `<Route>`를 찾아주는 역할을 합니다.
- **`Route`**: 특정 경로(`path`)와 특정 컴포넌트(`element`)를 1:1로 짝지어주는 규칙입니다. (예: `path="/about"` 이면 `AboutPage`를 보여줘!)

---

## 3. 페이지 이동하기: 4가지 방법

React Router는 상황에 따라 페이지를 이동시키는 4가지 주요 방법을 제공합니다.

### ① `<Link>`: 사용자가 직접 클릭 (Project 01)
- **언제?** 사용자가 직접 누를 수 있는 링크를 만들 때. (예: 메뉴, 게시글 제목)
- **특징:** `<a>` 태그와 비슷하지만, 페이지 전체를 새로고침하지 않고 화면을 다시 그립니다.

### ② `<NavLink>`: 활성화된 링크에 스타일 적용 (Project 02)
- **언제?** 현재 내가 보고 있는 페이지에 해당하는 메뉴에 특별한 스타일(예: 굵은 글씨, 색상 변경)을 주고 싶을 때.
- **특징:** `<Link>`의 모든 기능을 가지면서, 활성화되었을 때 `active` 클래스나 특정 스타일을 적용하는 기능을 제공합니다.

### ③ `<Navigate>`: 렌더링 되자마자 리다이렉트 (Project 04)
- **언제?** 특정 경로로 접근했을 때, 즉시 다른 경로로 보내버리고 싶을 때. (예: `/home`을 `/`로, 삭제된 페이지를 메인으로)
- **특징:** 컴포넌트가 렌더링되는 순간 `to` prop에 지정된 경로로 이동시킵니다. `replace` 옵션은 히스토리에 현재 경로를 남기지 않아 "뒤로 가기"를 방지할 때 유용합니다.

### ④ `useNavigate`: 코드 로직으로 페이지 이동 (Project 06)
- **언제?** 특정 작업(로그인, 폼 제출)이 성공한 후에 페이지를 이동시키는 등, **프로그래밍 방식**으로 페이지를 제어해야 할 때.
- **특징:** `useNavigate()` 훅은 `navigate` 함수를 반환합니다. 이 함수를 호출하여 `navigate('/dashboard')` 와 같이 원하는 경로로 보낼 수 있습니다.

---

## 4. URL에서 정보 꺼내오기: 2가지 방법

### ① `useParams`: 경로(Path)에서 값 추출 (Project 03)
- **언제?** `/posts/:postId` 와 같이, URL 경로의 일부가 동적으로 변하는 값을 가질 때.
- **특징:** `const { postId } = useParams()` 와 같이 사용하여, URL의 `:postId` 부분에 해당하는 실제 값(예: '123')을 가져올 수 있습니다.

### ② `useSearchParams`: 쿼리 스트링에서 값 추출 (Project 05)
- **언제?** `/search?q=react&sort=asc` 와 같이, `?` 뒤에 오는 쿼리 스트링(검색 파라미터) 값을 다룰 때.
- **특징:** `const [searchParams, setSearchParams] = useSearchParams()` 형태로 사용합니다. `searchParams.get('q')`로 값을 읽고, `setSearchParams({ q: 'new' })`로 값을 변경할 수 있습니다.

---

## 5. 고급 라우팅 패턴

- **중첩 라우트와 `<Outlet>` (Project 02)**
  - 여러 페이지가 공통된 레이아웃(헤더, 사이드바 등)을 가질 때 사용합니다.
  - 부모 `Route`는 공통 레이아웃을 렌더링하고, 그 안에 `<Outlet />`을 배치합니다.
  - 자식 `Route`에 해당하는 컴포넌트들이 부모의 `<Outlet />` 위치에 렌더링됩니다.

- **404 Not Found 페이지 (Project 04)**
  - `path="*"` 를 가진 `Route`를 `Routes`의 가장 마지막에 배치합니다.
  - 위에서부터 일치하는 경로를 모두 찾지 못했을 때, 마지막으로 이 와일드카드 라우트가 선택되어 "페이지를 찾을 수 없음" 화면을 보여줍니다.

- **동적 `<head>` 관리 (Project 07)**
  - SPA에서 페이지마다 브라우저 탭의 제목(`document.title`)을 동적으로 변경해야 할 때 유용합니다.
  - `react-helmet-async` 라이브러리를 사용하여 `<HelmetProvider>`로 앱을 감싸고, 각 페이지 컴포넌트에서 `<Helmet>` 컴포넌트 안에 `<title>` 태그를 넣어 동적으로 제목을 설정할 수 있습니다.
  - 이는 사용자 경험(UX)과 검색 엔진 최적화(SEO)에 중요한 역할을 합니다.