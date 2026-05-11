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
