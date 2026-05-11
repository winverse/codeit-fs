import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './index.module.css';
import { categories } from '@/data/category';
import { products } from '@/data/product';

export const Route = createFileRoute('/')({
  component: () => {
    return (
      <div>
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome to TechMart 🛍️</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products with powerful search and filtering
            capabilities
          </p>
          <Link to="/products" className={styles.heroBtn}>
            Shop Now 🚀
          </Link>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/products"
                search={{ category: category.id }}
                className={styles.categoryCard}
              >
                <div className={styles.categoryIcon}>{category.icon}</div>
                <div className={styles.categoryName}>{category.name}</div>
                <div className={styles.categoryCount}>
                  {category.count} products
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.featuredHeader}>
            <h2>Featured Products ⭐</h2>
            <Link
              to="/products"
              search={{ sort: 'featured' }}
              className={styles.viewAllLink}
            >
              View All →
            </Link>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  {product.image}
                  {product.discount > 0 && (
                    <div className={styles.discountBadge}>
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productBrand}>{product.brand}</div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.rating}>
                    <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                    <span className={styles.reviewCount}>
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className={styles.priceInfo}>
                    <span className={styles.currentPrice}>
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className={styles.originalPrice}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.addToCartBtn}>Add to Cart</button>
                    <button className={styles.wishlistBtn}>❤️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Ready to Explore Our Full Catalog? 🔍</h2>
          <p>
            Use our advanced search and filtering system to find exactly what
            you're looking for
          </p>
          <Link to="/products" className={styles.ctaBtn}>
            Browse All Products 🛍️
          </Link>
        </div>
      </div>
    );
  },
});
