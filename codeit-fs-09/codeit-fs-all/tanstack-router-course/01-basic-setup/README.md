# 1. TanStack Router 기본 설정과 라우팅

이번 챕터에서는 React 애플리케이션에 TanStack Router를 설치하고, 가장 기본적인 페이지 이동(라우팅)을 구현하는 방법을 배웁니다. `createRouter`, `RouterProvider`, `createRootRoute`, `createFileRoute`, `Link` 컴포넌트의 역할을 이해하고 사용법을 익힙니다.

## 학습 목표

- TanStack Router의 기본 개념과 React Router와의 차이점을 이해할 수 있다.
- `createRouter`, `RouterProvider`를 이용해 라우터를 설정하고 애플리케이션에 적용할 수 있다.
- `createRootRoute`, `createFileRoute`를 사용하여 파일 기반 라우트를 만들 수 있다.
- `Link` 컴포넌트를 사용해 타입 안전한 페이지 이동 링크를 만들 수 있다.
- `Outlet`을 사용하여 중첩된 라우트 구조를 구현할 수 있다.

## 주요 개념

- **TanStack Router**: 100% 타입 안전한 React 라우터로, 파일 기반 라우팅과 강력한 타입 추론을 제공합니다.
- **`createRouter`**: 라우트 트리를 받아 라우터 인스턴스를 생성하는 함수입니다.
- **`RouterProvider`**: 생성된 라우터를 React 애플리케이션에 제공하는 컴포넌트입니다.
- **`createRootRoute`**: 애플리케이션의 루트 라우트를 만드는 함수입니다. 모든 다른 라우트의 부모 역할을 합니다.
- **`createFileRoute`**: 파일 기반 라우팅에서 특정 경로에 대한 라우트를 만드는 함수입니다.
- **`Link`**: 타입 안전한 페이지 이동을 제공하는 컴포넌트입니다. 잘못된 경로 시 타입 에러가 발생합니다.
- **`Outlet`**: 자식 라우트가 렌더링될 위치를 표시하는 컴포넌트입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 프로젝트 구조 및 스타일 확인하기

`starter` 프로젝트에는 모든 페이지에 적용될 기본 스타일이 `src/index.css`에 미리 정의되어 있습니다. 우리는 이 전역 스타일시트에 정의된 `className`을 사용하여 컴포넌트의 스타일을 일관되게 유지할 것입니다.

### 2단계: Contact 페이지 추가하기

이제 새로운 Contact 페이지를 추가하여 TanStack Router의 파일 기반 라우팅을 실습해보겠습니다.

#### 2.1. Contact 라우트 파일 생성

`src/routes/contact.jsx` 파일을 생성하고 다음 코드를 작성합니다. 인라인 스타일 대신 `className`을 사용합니다.

```jsx
// src/routes/contact.jsx (새로 생성)
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: () => (
    <div className="page-content">
      <h1>Contact Us</h1>
      <p>Get in touch with us using the form below.</p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you for your message! (This is just a demo)");
        }}
      >
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
    </div>
  ),
});
```

#### 2.2. 루트 라우트에 Contact 링크 추가

`src/routes/__root.jsx` 파일을 수정하여 Contact 페이지로의 링크를 추가합니다:

```jsx
// src/routes/__root.jsx (수정)
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link> {/* 새로 추가 */}
          </li>
        </ul>
      </nav>
      <main>
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

브라우저에서 Contact 페이지가 새로운 스타일과 함께 올바르게 표시되는지 확인합니다.

## 핵심 포인트

1. **파일 기반 라우팅**: 파일 구조가 곧 URL 구조가 됩니다.
2. **CSS 클래스 활용**: 인라인 스타일 대신 전역 CSS 파일에 정의된 클래스를 사용하여 스타일을 일관되게 관리합니다.
3. **타입 안전성**: 잘못된 경로 사용 시 컴파일 타임에 에러가 발생합니다.
4. **공통 레이아웃**: `__root.jsx`를 통한 전역 레이아웃 관리
