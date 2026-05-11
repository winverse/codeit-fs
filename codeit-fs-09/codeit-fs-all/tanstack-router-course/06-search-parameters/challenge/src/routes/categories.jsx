import { createFileRoute, Link } from '@tanstack/react-router'
import styles from './categories.module.css'

// ... (mock data remains the same)

export const Route = createFileRoute('/categories')({
  component: () => {
    return (
      <div>
        <div className={styles.header}>
          <h1 className={styles.title}>📂 Categories</h1>
          <p className={styles.subtitle}>
            Browse our wide selection of products organized by category. 
            Find exactly what you're looking for with our advanced filtering system.
          </p>
        </div>
        
        <div className={styles.grid}>
          {categories.map(category => (
            <Link
              key={category.id}
              to="/products"
              search={{ category: category.id }}
              className={styles.card}
              style={{ borderColor: category.color }}
            >
              <div className={styles.cardHeader} style={{ background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` }}>
                <div className={styles.cardIcon}>{category.icon}</div>
                <h2 className={styles.cardTitle}>{category.name}</h2>
                <p className={styles.cardSubtitle}>{category.count} products available</p>
              </div>
              
              <div className={styles.cardContent}>
                <p className={styles.cardDescription}>{category.description}</p>
                
                <div className={styles.featuredItems}>
                  <h4>Popular Items:</h4>
                  <div className={styles.tags}>
                    {category.featured.map((item, index) => (
                      <span key={index} className={styles.tag} style={{ border: `1px solid ${category.color}30` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <div className={styles.btn} style={{ backgroundColor: category.color }}>
                    Browse {category.count} Products →
                  </div>
                  <div className={styles.btnSecondary} style={{ color: category.color, border: `2px solid ${category.color}` }}>
                    💰 Deals
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className={styles.popularSearches}>
          <h2>🔥 Popular Searches</h2>
          <p>See what other customers are searching for</p>
          <div className={styles.searchGrid}>
            {popularSearches.map((search, index) => (
              <Link
                key={index}
                to="/products"
                search={{ q: search.query }}
                className={styles.searchLink}
              >
                <span className={styles.searchQuery}>{search.query}</span>
                <span className={styles.searchCount}>{search.count.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className={styles.cta}>
          <div className={styles.ctaIcon}>🎯</div>
          <h2>Can't Find What You're Looking For?</h2>
          <p>Try our advanced search with filters for price, brand, rating, and more</p>
          <Link to="/products" className={styles.ctaBtn}>
            🔍 Advanced Search
          </Link>
        </div>
      </div>
    )
  },
})
