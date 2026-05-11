import { Link } from 'react-router-dom';
// TODO: Helmet을 import 하세요.

export function ContactPage() {
  return (
    <div className="page-content">
      {/* 
        TODO: Helmet 컴포넌트를 추가하여 아래 내용을 설정하세요.
        - title: "문의하기 - React Router 학습"
        - meta description: "궁금한 점이 있다면 언제든지 문의해주세요."
      */}

      <div className="page-header">
        <h1>문의하기</h1>
        <p>이 페이지의 헤드 정보를 확인하여, title과 description이 잘 적용되었는지 확인해보세요.</p>
      </div>

      <Link to="/" className="back-link">
        홈 페이지로 이동
      </Link>
    </div>
  );
}
