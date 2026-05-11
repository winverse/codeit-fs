import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <div className="page-content">
      <h1>About</h1>
      <p>파일 기반 라우팅에 대해 알아보겠습니다.</p>
      <div className="info-box about">
        <h2>파일 기반 라우팅이란?</h2>
        <p>파일 시스템의 구조가 그대로 URL 구조가 되는 라우팅 방식입니다.</p>
        <ul>
          <li>직관적이고 예측 가능한 구조</li>
          <li>자동 코드 분할</li>
          <li>타입 안전성</li>
          <li>개발 생산성 향상</li>
        </ul>
      </div>
    </div>
  ),
})