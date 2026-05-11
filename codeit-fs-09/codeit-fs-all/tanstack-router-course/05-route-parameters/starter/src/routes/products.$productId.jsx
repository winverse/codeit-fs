import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import styles from "./products.$productId.module.css";

const products = [
  { id: 1, name: '노트북', category: 'electronics', price: 1200, description: '고성능 노트북으로 업무와 게임에 최적화되어 있습니다.' },
  { id: 2, name: '스마트폰', category: 'electronics', price: 800, description: '최신 스마트폰으로 강력한 카메라와 긴 배터리 수명을 자랑합니다.' },
  { id: 3, name: '헤드폰', category: 'electronics', price: 200, description: '노이즈 캔슬링 기능이 있는 고품질 헤드폰입니다.' },
  { id: 4, name: '책상', category: 'furniture', price: 300, description: '넓고 튼튼한 작업용 책상입니다.' },
  { id: 5, name: '의자', category: 'furniture', price: 150, description: '인체공학적 설계로 장시간 앉아도 편안한 의자입니다.' },
]

function ProductDetail() {
  const { productId } = useParams({ from: '/products/$productId' });
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="page-content">
        <h1>제품을 찾을 수 없습니다</h1>
        <p>ID가 '{productId}'인 제품이 존재하지 않습니다.</p>
        <Link to="/products" className="btn">
          &larr; 제품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className={styles.productGrid}>
        <div>
          <div className={styles.imagePlaceholder}>
            <span>제품 이미지 영역</span>
          </div>
        </div>
        <div className={styles.productInfo}>
          <h2>제품 정보</h2>
          <div className={styles.description}>
            <p><strong>카테고리:</strong> {product.category}</p>
            <p><strong>가격:</strong> <span className={styles.price}>${product.price}</span></p>
            <p><strong>설명:</strong> {product.description}</p>
          </div>
          <div className={styles.actions}>
            <button className="btn">장바구니에 추가</button>
            <button className="btn btn-secondary">위시리스트에 추가</button>
          </div>
        </div>
      </div>
      <div className={styles.infoBox}>
        <h3>🎯 학습 목표: 동적 라우트 파라미터</h3>
        <p>이 페이지에서 <code>useParams</code> 훅을 사용하여 URL의 동적 파라미터를 추출하는 방법을 연습해보세요.</p>
        <p><strong>TODO:</strong> productId 파라미터 추출하기</p>
        <p><strong>TODO:</strong> 파라미터를 사용하여 제품 데이터 찾기</p>
      </div>
      <div className={styles.otherProducts}>
        <h3>다른 제품들</h3>
        <div className={styles.grid}>
          {/* TODO: 다른 제품들로 이동하는 링크를 구현하세요 */}
          <p>TODO: 다른 제품 링크들 구현하기</p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetail,
});