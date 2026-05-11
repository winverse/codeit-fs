import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useCartItemQuantity } from '@/selectors/cartSelectors';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  // ✅ 커스텀 훅으로 비즈니스 로직 캡슐화
  const { addToCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  
  // ✅ 셀렉터로 장바구니 상태 조회
  const quantity = useCartItemQuantity(product.id);
  const isInCart = quantity > 0;

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

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
        {isInCart && (
          <div className={styles.cartBadge}>
            {quantity}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>
          {product.price.toLocaleString()}원
        </div>
        
        {!isInCart ? (
          <button 
            onClick={handleAddToCart}
            className={styles.addButton}
          >
            장바구니 담기
          </button>
        ) : (
          <div className={styles.quantityControls}>
            <button 
              onClick={handleDecrease}
              className={styles.quantityButton}
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button 
              onClick={handleIncrease}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}