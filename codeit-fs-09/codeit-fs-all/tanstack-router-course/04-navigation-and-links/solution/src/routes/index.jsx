import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { Breadcrumb } from '../components/Breadcrumb'

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' })
    } else {
      navigate({ to: '/auth/login' })
    }
  }

  const handleExploreProducts = () => {
    navigate({ 
      to: '/products',
      search: { category: 'featured' }
    })
  }

  return (
    <div className="content-area">
      <div className="container">
        <Breadcrumb />
        
        <div className="text-center p-1">
          <h1 className="page-title">
            TanStack Router 고급 내비게이션
          </h1>
          <p className="text-muted mb-2">
            프로그래매틱 내비게이션, 내비게이션 가드, 고급 링크 패턴을 학습합니다
          </p>

          <div className="d-flex gap-1 justify-center flex-wrap">
            <button className="btn" onClick={handleGetStarted}>
              {isAuthenticated ? '대시보드로 이동' : '시작하기'}
            </button>
            <button className="btn btn-secondary" onClick={handleExploreProducts}>
              제품 둘러보기
            </button>
          </div>
        </div>

        {isAuthenticated && (
          <div className="alert alert-success">
            <strong>환영합니다, {user.name}님!</strong> 
            인증된 사용자만 접근할 수 있는 페이지들을 이용할 수 있습니다.
          </div>
        )}

        <div className="card-grid mt-2">
          <div className="card">
            <h3 className="card-title">🔗 고급 링크 기능</h3>
            <p>Link 컴포넌트의 고급 기능들을 살펴봅니다:</p>
            <ul>
              <li>활성 링크 스타일링</li>
              <li>조건부 렌더링</li>
              <li>펜딩 상태 표시</li>
            </ul>
            <Link to="/products" className="btn btn-sm">
              제품 페이지 보기
            </Link>
          </div>

          <div className="card">
            <h3 className="card-title">🚀 프로그래매틱 내비게이션</h3>
            <p>useNavigate 훅을 사용한 내비게이션:</p>
            <ul>
              <li>버튼 클릭으로 페이지 이동</li>
              <li>검색 파라미터 포함</li>
              <li>상태 전달</li>
            </ul>
            <button 
              className="btn btn-sm"
              onClick={() => navigate({ to: '/categories/electronics' })}
            >
              전자제품 카테고리로
            </button>
          </div>

          <div className="card">
            <h3 className="card-title">🛡️ 내비게이션 가드</h3>
            <p>인증 기반 라우트 보호:</p>
            <ul>
              <li>로그인 필수 페이지</li>
              <li>권한 기반 접근 제어</li>
              <li>자동 리디렉션</li>
            </ul>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-sm">
                대시보드 접근
              </Link>
            ) : (
              <Link to="/auth/login" className="btn btn-sm">
                로그인 필요
              </Link>
            )}
          </div>

          <div className="card">
            <h3 className="card-title">📱 반응형 내비게이션</h3>
            <p>다양한 내비게이션 패턴:</p>
            <ul>
              <li>브레드크럼 내비게이션</li>
              <li>사이드바 내비게이션</li>
              <li>탭 내비게이션</li>
            </ul>
            <Link to="/dashboard/analytics" className="btn btn-sm">
              대시보드 예제 보기
            </Link>
          </div>
        </div>

        <div className="bg-light p-1 rounded mt-2">
          <h2>프로그래매틱 내비게이션 예제</h2>
          <p>버튼을 클릭하여 다양한 내비게이션 패턴을 테스트해보세요:</p>
          
          <div className="d-flex gap-1 flex-wrap mt-1">
            <button 
              className="btn btn-sm"
              onClick={() => navigate({ to: '/products/1' })}
            >
              특정 제품으로 이동
            </button>
            
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => navigate({ 
                to: '/products', 
                search: { search: 'laptop', sort: 'price' }
              })}
            >
              제품 검색 (파라미터 포함)
            </button>
            
            <button 
              className="btn btn-sm btn-warning"
              onClick={() => navigate({ 
                to: '/categories/electronics',
                replace: true 
              })}
            >
              히스토리 교체로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
