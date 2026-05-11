import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="page-content">
      <h1>File-based Routing Demo</h1>
      <p>이 페이지에서 TanStack Router의 파일 기반 라우팅을 학습합니다.</p>
      <div className="info-box">
        <h2>현재 라우트 구조</h2>
        <ul>
          <li><code>__root.tsx</code> → 루트 레이아웃</li>
          <li><code>index.tsx</code> → / (홈페이지)</li>
          <li><code>about.tsx</code> → /about</li>
        </ul>
        <p>강의를 통해 더 많은 라우트를 추가해보겠습니다!</p>
      </div>
    </div>
  ),
})