import styles from './ProductCard.module.css';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            // 이미지 로딩 실패 시 placeholder 표시
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
          }}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.category}>카테고리: {product.category}</div>
        <div className={styles.price}>
          {product.price.toLocaleString()}원
        </div>
        
        <button 
          onClick={onAddToCart}
          className={styles.addButton}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}