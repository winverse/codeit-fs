import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-branding">
            <div className="brand-logo">
              <span className="logo-icon">⚡</span>
              <span className="brand-name">TaskFlow</span>
            </div>
            <h2>팀워크를 더 스마트하게</h2>
            <p>
              전 세계 수천 개의 팀이 TaskFlow로 프로젝트를 성공시키고 있습니다.
            </p>
          </div>
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <div>
                <h4>직관적인 인터페이스</h4>
                <p>배우기 쉽고 사용하기 편한 디자인</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <div>
                <h4>빠른 시작</h4>
                <p>몇 분 만에 팀을 구성하고 작업 시작</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div>
                <h4>엔터프라이즈 보안</h4>
                <p>안전한 데이터 보호와 권한 관리</p>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
