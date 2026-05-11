import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import styles from "./categories.$categoryId.module.css";

// ... (mock data remains the same)

function CategoryDetailPage() {
  const { categoryId } = useParams({ from: "/categories/$categoryId" });
  const categoryProducts = mockProducts.filter(
    (product) => product.category === categoryId
  );
  const category = categoryInfo[categoryId];

  if (!category) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundIcon}>🤔</div>
        <h2>카테고리를 찾을 수 없습니다</h2>
        <p>요청하신 카테고리가 존재하지 않습니다.</p>
        <Link to="/categories">
          카테고리 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원";
  };

  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link to="/">홈</Link>
        {" → "}
        <Link to="/categories">카테고리</Link>
        {" → "}
        <span>{category.name}</span>
      </div>

      <div className={styles.header} style={{ backgroundColor: category.color }}>
        <div className={styles.headerIcon}>{category.icon}</div>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <div className={styles.productCount}>
          총 {categoryProducts.length}개의 상품
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className={styles.productList}>
          {categoryProducts.map((product) => (
            <Link
              key={product.id}
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              className={styles.productCardLink}
            >
              <div className={styles.productCard}>
                <div className={styles.productImage}>{product.image}</div>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productMeta}>
                  <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                  <div className={styles.productRating}>
                    <span>⭐ {product.rating}</span>
                    <span>리뷰 {product.reviews}개</span>
                  </div>
                </div>
                <div className={styles.detailsButton}>상세보기 →</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}>
          <div className={styles.headerIcon}>📦</div>
          <h3>이 카테고리에는 아직 상품이 없습니다</h3>
          <p>다른 카테고리를 둘러보시거나 나중에 다시 확인해주세요.</p>
          <Link to="/categories" className={styles.notFoundLink}>
            다른 카테고리 보기
          </Link>
        </div>
      )}

      <div className={styles.categoryInfo}>
        <h3>{category.icon} {category.name} 카테고리 특징</h3>
        <div className={styles.featuresGrid}>
          {/* ... (features content remains the same, but without inline styles) */}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/categories/$categoryId")({
  component: CategoryDetailPage,
});