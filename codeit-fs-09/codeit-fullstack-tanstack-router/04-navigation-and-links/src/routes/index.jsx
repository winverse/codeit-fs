import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1 className="page-title">Welcome to TanStack Router</h1>
      <div className="page-content">
        <p>
          이 프로젝트에서 TanStack Router의 내비게이션과 링크 기능을 학습합니다.
        </p>

        <h2>기본 링크 예제</h2>
        <p>위의 내비게이션 바에서 각 페이지로 이동해보세요:</p>
        <ul>
          <li>
            <Link to="/about">About 페이지</Link>
          </li>
        </ul>

        <h2>학습 목표</h2>
        <ul>
          <li>Link 컴포넌트 기본 사용법</li>
          <li>활성 링크 스타일링</li>
          <li>내비게이션 메뉴 구성</li>
        </ul>
      </div>
    </div>
  ),
});
