import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import styles from './products.$productId.module.css';

// ... (mock data remains the same)

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
    </div>
  );
}

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
});
