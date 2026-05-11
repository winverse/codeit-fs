import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./categories.module.css";

// ... (mock data remains the same)

function CategoriesPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>🏷️ 상품 카테고리</h1>
        <p className={styles.pageDescription}>원하는 카테고리를 선택해서 상품들을 살펴보세요</p>
      </div>

      <div className={styles.categoryGrid}>
        {mockCategories.map((category) => (
          <Link
            key={category.id}
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            className={styles.categoryCardLink}
          >
            <div className={styles.categoryCard} style={{ backgroundColor: category.color }}>
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h2 className={styles.categoryName}>{category.name}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
              <div className={styles.productCount}>📦 {category.productCount}개 상품</div>
              <div className={styles.arrowIcon}>→</div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.infoBox}>
        <h3>💡 카테고리별 탐색의 장점</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.icon}>🎯</div>
            <h4>정확한 검색</h4>
            <p>원하는 종류의 상품만 빠르게 찾기</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>⚡</div>
            <h4>빠른 비교</h4>
            <p>비슷한 상품들을 한 번에 비교</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>🔍</div>
            <h4>새로운 발견</h4>
            <p>관심 분야의 새로운 상품 발견</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
});