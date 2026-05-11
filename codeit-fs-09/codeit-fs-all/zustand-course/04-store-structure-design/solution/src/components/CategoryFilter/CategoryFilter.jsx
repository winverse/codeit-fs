import { useUIStore } from '@/stores/uiStore';
import { useCategoryStats } from '@/selectors/productSelectors';
import styles from './CategoryFilter.module.css';

export function CategoryFilter() {
  const selectedCategory = useUIStore((state) => state.selectedCategory);
  const setSelectedCategory = useUIStore((state) => state.setSelectedCategory);
  
  // ✅ 셀렉터로 계산된 카테고리별 상품 수
  const categoryStats = useCategoryStats();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>카테고리</h3>
      <div className={styles.buttons}>
        {categoryStats.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`${styles.button} ${
              selectedCategory === category.value ? styles.active : ''
            }`}
          >
            {category.label}
            <span className={styles.count}>({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}