import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../components/Breadcrumb'

export const Route = createFileRoute('/about')({
  component: AboutPage
})

function AboutPage() {
  return (
    <div className="content-area">
      <div className="container">
        <Breadcrumb />
        
        <h1 className="page-title">About TanStack Router</h1>
        <div className="page-content">
          <p>
            이 프로젝트는 TanStack Router의 고급 내비게이션 기능들을 
            실습하기 위한 예제 애플리케이션입니다.
          </p>

          <h2>구현된 기능들</h2>
          <div className="card-grid">
            <div className="card">
              <h3 className="card-title">Link 컴포넌트</h3>
              <ul>
                <li>기본 링크 생성</li>
                <li>활성 링크 스타일링</li>
                <li>펜딩 상태 표시</li>
                <li>조건부 렌더링</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">useNavigate 훅</h3>
              <ul>
                <li>프로그래매틱 내비게이션</li>
                <li>검색 파라미터 포함</li>
                <li>히스토리 교체</li>
                <li>상태 전달</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">Navigate 컴포넌트</h3>
              <ul>
                <li>조건부 리디렉션</li>
                <li>인증 가드</li>
                <li>자동 리디렉션</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="card-title">고급 패턴</h3>
              <ul>
                <li>브레드크럼 내비게이션</li>
                <li>사이드바 내비게이션</li>
                <li>탭 내비게이션</li>
                <li>모달과 내비게이션</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}