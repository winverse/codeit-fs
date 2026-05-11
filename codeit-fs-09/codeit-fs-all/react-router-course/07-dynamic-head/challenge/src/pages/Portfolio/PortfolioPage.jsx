import { Link } from 'react-router-dom';
// TODO: Helmet을 import 하세요.

export function PortfolioPage() {
  return (
    <div className="page-content">
      {/* 
        TODO: Helmet 컴포넌트를 추가하여 아래 내용을 설정하세요.
        - title: "포트폴리오 - 내 프로젝트들"
        - meta description: "저의 프로젝트들을 소개하는 포트폴리오 페이지입니다."
        - og:title: "Codeit | 제 포트폴리오를 소개합니다."
        - og:description: "React와 React Router로 만든 멋진 프로젝트들을 구경해보세요."
        - og:image: "/og-image.png" (public 폴더에 제공된 이미지)
      */}

      <div className="page-header">
        <h1>포트폴리오</h1>
        <p>이 페이지의 헤드 정보를 확인하여, 오픈그래프 태그가 잘 적용되었는지 확인해보세요.</p>
      </div>

      <Link to="/" className="back-link">
        홈 페이지로 이동
      </Link>
    </div>
  );
}
