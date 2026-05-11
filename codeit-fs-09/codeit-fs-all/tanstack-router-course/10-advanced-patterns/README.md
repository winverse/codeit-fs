# 10. 고급 패턴: 코드 분할과 지연 로딩

이번 챕터에서는 애플리케이션의 초기 로딩 성능을 최적화하기 위한 핵심 기술인 코드 분할(Code Splitting)과 지연 로딩(Lazy Loading)을 TanStack Router에 적용하는 방법을 배웁니다. `React.lazy`와 `Suspense`를 사용하여 특정 라우트에 진입할 때만 해당 컴포넌트의 코드를 불러오도록 구현합니다.

## 학습 목표

- 코드 분할의 개념과 필요성을 이해할 수 있다.
- `React.lazy`를 사용하여 컴포넌트를 동적으로 import 할 수 있다.
- `Suspense` 컴포넌트를 사용하여 지연 로딩되는 컴포넌트의 로딩 상태 UI를 처리할 수 있다.
- TanStack Router의 라우트 컴포넌트에 지연 로딩을 적용할 수 있다.

## 주요 개념

- **코드 분할 (Code Splitting)**: 거대한 단일 JavaScript 번들 파일을 여러 개의 작은 청크(chunk)로 분할하는 기술입니다. 이를 통해 초기 페이지 로드 시 필요한 최소한의 코드만 불러와 로딩 속도를 크게 향상시킬 수 있습니다.
- **지연 로딩 (Lazy Loading)**: 코드 분할의 한 형태로, 특정 컴포넌트나 모듈이 실제로 필요해지는 시점(예: 특정 라우트 방문 시)에 해당 코드 청크를 비동기적으로 불러오는 기법입니다.
- **`React.lazy`**: 컴포넌트를 동적으로 불러올 수 있게 해주는 React 내장 함수입니다. `lazy`로 감싼 컴포넌트는 초기 렌더링에 포함되지 않습니다.
- **`Suspense`**: `lazy`로 불러온 컴포넌트가 로드될 때까지 기다리면서, `fallback` prop으로 지정된 로딩 UI(예: 스피너, 스켈레톤)를 대신 보여주는 React 컴포넌트입니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: 지연 로딩할 컴포넌트 생성

먼저, 의도적으로 무거운 라이브러리를 포함하거나 복잡한 로직을 가진 컴포넌트를 만듭니다. 이 컴포넌트는 초기 로딩 시 불필요한 부담을 주는 상황을 시뮬레이션합니다.

`src/components/HeavyComponent.jsx` 파일을 생성합니다.

```jsx
// src/components/HeavyComponent.jsx (새로 생성)
// 이 컴포넌트는 무거운 라이브러리를 포함하고 있다고 가정합니다.
export function HeavyComponent() {
  return (
    <div className="page-content" style={{ border: '2px dashed #17a2b8' }}>
      <h2>📦 I am a Heavy Component!</h2>
      <p>저는 지연 로딩되었습니다. 초기 번들에는 포함되지 않아 첫 페이지 로딩 속도를 빠르게 유지하는 데 도움이 됩니다.</p>
    </div>
  );
}
```

### 2단계: `React.lazy`를 사용하여 라우트 컴포넌트 지연 로딩

`src/routes/heavy.jsx` 파일을 생성합니다. 이 파일에서는 `React.lazy`를 사용하여 `HeavyComponent`를 동적으로 임포트하고, `Suspense`를 사용하여 로딩 상태를 처리합니다.

```jsx
// src/routes/heavy.jsx (새로 생성)
import React, { lazy, Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';

// HeavyComponent를 lazy를 사용해 동적으로 임포트합니다.
const HeavyComponent = lazy(() =>
  import('../components/HeavyComponent').then(res => ({ default: res.HeavyComponent }))
);

export const Route = createFileRoute('/heavy')({
  component: HeavyRoute,
});

function HeavyRoute() {
  return (
    <div className="page-content">
      <h1>지연 로딩 예제</h1>
      <p>아래 컴포넌트는 이 페이지에 처음 방문했을 때만 코드를 다운로드합니다.</p>
      
      {/* Suspense로 감싸 로딩 상태를 처리합니다. */}
      <Suspense fallback={<div className="loading-placeholder">Loading heavy component...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### 3단계: 네비게이션에 링크 추가

`src/routes/__root.jsx` 파일을 수정하여, 지연 로딩 페이지로 이동할 수 있는 링크를 네비게이션에 추가합니다.

```jsx
// src/routes/__root.jsx (수정)
// ...
<nav className="nav">
  <ul>
    {/* ... */}
    <li>
      <Link to="/heavy" className="nav-link" activeProps={{ className: 'active' }}>
        Heavy Component
      </Link>
    </li>
  </ul>
</nav>
// ...
```

### 4단계: 개발 서버 실행 및 네트워크 탭 확인

개발 서버를 실행하고 브라우저의 개발자 도구(F12)를 열어 네트워크 탭을 확인합니다.

1.  홈페이지에 처음 접속하면 `HeavyComponent` 관련 코드(청크 파일)는 로드되지 않습니다.
2.  네비게이션에서 "Heavy Component" 링크를 클릭하면, 그 순간 새로운 JavaScript 파일(청크)이 로드되는 것을 네트워크 탭에서 확인할 수 있습니다. 동시에 화면에는 `Suspense`의 `fallback` UI가 잠시 보였다가, 로딩이 완료되면 `HeavyComponent`가 나타납니다.

이 과정을 통해 코드 분할과 지연 로딩이 실제로 어떻게 작동하는지 눈으로 확인할 수 있습니다.
