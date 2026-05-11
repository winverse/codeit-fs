import { useParams, Link } from 'react-router';
import { products } from '../../data/products';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  // TODO: useParams를 사용해서 productId를 가져오세요
  const productId = '1'; // 임시값 - useParams로 가져와야 합니다

  // TODO: products 배열에서 productId와 일치하는 상품을 찾으세요
  const product = products[0]; // 임시값 - 실제로는 find 메서드를 사용해야 합니다

  if (!product) {
    return <div className={styles.error}>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.page}>
      <Link to="/products" className={styles.backLink}>
        ← 상품 목록으로
      </Link>
      <div className={styles.productCard}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>
          가격: {product.price.toLocaleString()}원
        </p>
        <p className={styles.productDescription}>{product.description}</p>
      </div>
    </div>
  );
}
