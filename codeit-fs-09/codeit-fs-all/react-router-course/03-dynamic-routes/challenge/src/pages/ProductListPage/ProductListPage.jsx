import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import styles from './ProductListPage.module.css';

export function ProductListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>상품 목록</h2>
        <p>React Router를 사용하여 상품 목록과 상세 페이지를 구현해보세요.</p>
        <div className={styles.productList}>
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className={styles.productCard}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>{product.price.toLocaleString()}원</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
