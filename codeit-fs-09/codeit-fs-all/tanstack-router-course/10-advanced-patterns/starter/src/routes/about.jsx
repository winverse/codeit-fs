import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => (
    <div>
      <h1 className="page-title">About Us</h1>
      <div className="page-content">
        <p>이 페이지는 TanStack Router의 Link 컴포넌트를 사용하여 만들어졌습니다.</p>
        
        <h2>TanStack Router란?</h2>
        <p>
          TanStack Router는 React 애플리케이션을 위한 현대적이고 타입 안전한 라우터입니다.
          강력한 기능들을 제공하면서도 개발자 경험을 중시합니다.
        </p>

        <h2>주요 특징</h2>
        <ul>
          <li>100% 타입 안전성</li>
          <li>파일 기반 라우팅</li>
          <li>중첩 라우팅 지원</li>
          <li>자동 코드 스플리팅</li>
          <li>검색 파라미터 관리</li>
        </ul>

        <p>
          <strong>참고:</strong> 현재 페이지로 이동한 링크가 활성 상태로 표시되는 것을 
          확인할 수 있습니다. 이는 Link 컴포넌트의 기본 기능입니다.
        </p>
      </div>
    </div>
  )
})