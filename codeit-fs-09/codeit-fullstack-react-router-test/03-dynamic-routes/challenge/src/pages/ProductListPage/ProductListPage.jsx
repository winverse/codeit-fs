import { Link } from 'react-router';
import { products } from '../../data/products';
import styles from './ProductListPage.module.css';

export function ProductListPage() {
  return (
    <div className={styles.page}>
      <h1>Products</h1>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <Link to={`/products/${product.id}`} className={styles.productLink}>
              {product.name} - {product.price.toLocaleString()}원
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
