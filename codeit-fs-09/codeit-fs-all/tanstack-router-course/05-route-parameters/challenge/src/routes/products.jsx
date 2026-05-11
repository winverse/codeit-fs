import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./products.module.css";

// ... (mock data remains the same)

function ProductsPage() {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원";
  };

  const getCategoryName = (category) => {
    const categories = {
      electronics: "전자제품",
      fashion: "패션",
      books: "도서",
    };
    return categories[category] || category;
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>📦 전체 상품</h1>
        <p className={styles.pageDescription}>다양한 카테고리의 상품들을 만나보세요</p>
      </div>

      <div className={styles.productGrid}>
        {mockProducts.map((product) => (
          <Link
            key={product.id}
            to="/products/$productId"
            params={{ productId: product.id.toString() }}
            className={styles.productCardLink}
          >
            <div className={styles.productCard}>
              <div className={styles.productImage}>{product.image}</div>
              <div className={styles.categoryTag}>
                {getCategoryName(product.category)}
              </div>
              <h3 className={styles.productName}>{product.name}</h3>
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
    </div>
  );
}

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});