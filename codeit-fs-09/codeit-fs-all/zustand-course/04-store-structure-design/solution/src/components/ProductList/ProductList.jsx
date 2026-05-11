import { useFilteredProducts } from '@/selectors/productSelectors';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { SortOptions } from '@/components/SortOptions';
import styles from './ProductList.module.css';

export function ProductList() {
  // ✅ 셀렉터로 계산된 값 사용 (컴포넌트에서 계산하지 않음)
  const filteredProducts = useFilteredProducts();

  return (
    <div className={styles.container}>
      {/* 필터 및 검색 섹션 */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersRow}>
          <CategoryFilter />
          <SortOptions />
        </div>
        <SearchBar />
      </div>

      {/* 상품 목록 */}
      <div className={styles.productsSection}>
        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>
            상품 목록 ({filteredProducts.length}개)
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <p className={styles.emptyMessage}>
              조건에 맞는 상품이 없습니다.
            </p>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}