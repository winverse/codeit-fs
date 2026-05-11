import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            팀 협업을 혁신하는
            <br />
            <span className="highlight">TaskFlow</span>
          </h1>
          <p>
            프로젝트 관리부터 팀 커뮤니케이션까지, 모든 작업을 하나의 플랫폼에서
            효율적으로 관리하세요.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn btn-primary btn-large">
                대시보드로 이동
              </Link>
            ) : (
              <>
                <Link to="/auth/register" className="btn btn-primary btn-large">
                  무료로 시작하기
                </Link>
                <Link to="/demo" className="btn btn-outline btn-large">
                  데모 보기
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-header">
              <div className="preview-tabs">
                <div className="tab active">대시보드</div>
                <div className="tab">프로젝트</div>
                <div className="tab">팀</div>
              </div>
            </div>
            <div className="preview-content">
              <div className="task-card">
                <div className="task-priority high"></div>
                <div className="task-info">
                  <h4>UI 디자인 시스템 구축</h4>
                  <p>디자인 토큰 및 컴포넌트 라이브러리</p>
                </div>
                <div className="task-assignee">JH</div>
              </div>
              <div className="task-card">
                <div className="task-priority medium"></div>
                <div className="task-info">
                  <h4>API 문서 업데이트</h4>
                  <p>새로운 엔드포인트 문서화</p>
                </div>
                <div className="task-assignee">SY</div>
              </div>
              <div className="task-card">
                <div className="task-priority low"></div>
                <div className="task-info">
                  <h4>테스트 케이스 작성</h4>
                  <p>단위 테스트 및 통합 테스트</p>
                </div>
                <div className="task-assignee">MJ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>모든 기능을 한 곳에서</h2>
          <p>복잡한 프로젝트 관리를 간단하게 만드는 강력한 기능들</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>프로젝트 대시보드</h3>
            <p>
              실시간으로 프로젝트 진행 상황을 모니터링하고 팀의 성과를 한눈에
              파악하세요.
            </p>
            <ul className="feature-list">
              <li>진행률 시각화</li>
              <li>마일스톤 추적</li>
              <li>리소스 할당</li>
              <li>성과 분석</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>팀 협업</h3>
            <p>
              팀원들과 효과적으로 소통하고 협업할 수 있는 다양한 도구를
              제공합니다.
            </p>
            <ul className="feature-list">
              <li>실시간 채팅</li>
              <li>파일 공유</li>
              <li>코멘트 시스템</li>
              <li>멘션 알림</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>일정 관리</h3>
            <p>
              프로젝트 일정부터 개인 할일까지 모든 스케줄을 체계적으로
              관리하세요.
            </p>
            <ul className="feature-list">
              <li>간트 차트</li>
              <li>캘린더 뷰</li>
              <li>마감일 알림</li>
              <li>반복 작업</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>분석 및 리포팅</h3>
            <p>데이터 기반의 인사이트로 팀의 생산성을 지속적으로 개선하세요.</p>
            <ul className="feature-list">
              <li>생산성 지표</li>
              <li>시간 추적</li>
              <li>커스텀 리포트</li>
              <li>데이터 내보내기</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="section-header">
          <h2>TanStack Router 고급 패턴 데모</h2>
          <p>
            실제 애플리케이션에서 활용되는 고급 라우팅 패턴들을 체험해보세요
          </p>
        </div>
        <div className="demo-grid">
          <div className="demo-card">
            <div className="demo-icon">🔗</div>
            <h3>중첩 레이아웃</h3>
            <p>
              복잡한 레이아웃 구조를 효율적으로 관리하는 중첩 라우팅 패턴을
              프로젝트와 팀 페이지에서 확인하세요.
            </p>
            <Link to="/projects" className="demo-link">
              프로젝트 페이지 보기 →
            </Link>
          </div>
          <div className="demo-card">
            <div className="demo-icon">🎭</div>
            <h3>모달 라우팅</h3>
            <p>
              URL을 통해 모달 상태를 관리하고 뒤로가기 버튼으로 모달을 닫을 수
              있는 패턴을 체험하세요.
            </p>
            <Link to="/projects/new" className="demo-link">
              프로젝트 생성 모달 →
            </Link>
          </div>
          <div className="demo-card">
            <div className="demo-icon">🔍</div>
            <h3>검색 및 필터링</h3>
            <p>
              URL 상태와 동기화된 검색 및 필터링 기능으로 사용자 경험을
              향상시키는 방법을 확인하세요.
            </p>
            <Link to="/projects?status=active&sort=date" className="demo-link">
              필터링 예제 보기 →
            </Link>
          </div>
          <div className="demo-card">
            <div className="demo-icon">⚡</div>
            <h3>병렬 라우트 로딩</h3>
            <p>
              여러 데이터를 병렬로 로딩하여 성능을 최적화하는 고급 로딩 패턴을
              경험하세요.
            </p>
            <Link to="/dashboard" className="demo-link">
              대시보드 보기 →
            </Link>
          </div>
          <div className="demo-card">
            <div className="demo-icon">🛡️</div>
            <h3>인증 가드</h3>
            <p>
              라우트 레벨의 인증 검사와 권한 기반 접근 제어를 통한 보안 패턴을
              확인하세요.
            </p>
            <Link to="/auth/login" className="demo-link">
              로그인 후 체험 →
            </Link>
          </div>
          <div className="demo-card">
            <div className="demo-icon">🔄</div>
            <h3>라우트 그룹</h3>
            <p>
              관련된 라우트들을 그룹화하여 공통 레이아웃과 로직을 공유하는
              패턴을 살펴보세요.
            </p>
            <Link to="/teams" className="demo-link">
              팀 관리 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="cta">
          <div className="cta-content">
            <h2>지금 바로 시작하세요</h2>
            <p>
              수천 개의 팀이 TaskFlow를 통해 생산성을 높이고 있습니다.
              <br />
              30일 무료 체험으로 TaskFlow의 모든 기능을 경험해보세요.
            </p>
            <div className="cta-actions">
              <Link to="/auth/register" className="btn btn-primary btn-large">
                무료로 시작하기
              </Link>
              <div className="cta-note">
                <small>💳 신용카드 불필요 • 🚀 즉시 사용 가능</small>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof */}
      <section className="social-proof">
        <div className="section-header">
          <h2>전 세계 팀들의 선택</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">활성 사용자</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,200+</div>
            <div className="stat-label">기업 고객</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">서비스 가동률</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">고객 만족도</div>
          </div>
        </div>
      </section>
    </div>
  );
}
