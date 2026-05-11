import { useShoppingCart } from '@/hooks/useShoppingCart';
import styles from './CartItem.module.css';

export function CartItem({ item }) {
  // ✅ 커스텀 훅으로 비즈니스 로직 캡슐화
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useShoppingCart();

  // item은 이미 셀렉터에서 product 정보가 포함된 상태
  const { product, quantity, itemTotal } = item;

  if (!product) {
    return null; // 상품이 삭제된 경우
  }

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className={styles.item}>
      <div className={styles.productInfo}>
        <div className={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.name}
            className={styles.image}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vPC90ZXh0Pgo8L3N2Zz4=';
            }}
          />
        </div>
        <div className={styles.details}>
          <h4 className={styles.name}>{product.name}</h4>
          <div className={styles.price}>
            {product.price.toLocaleString()}원
          </div>
          <div className={styles.category}>
            {product.category === 'electronics' && '전자제품'}
            {product.category === 'books' && '도서'}
            {product.category === 'food' && '식품'}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantitySection}>
          <div className={styles.quantityControls}>
            <button 
              onClick={handleDecrease}
              className={styles.quantityButton}
              aria-label="수량 감소"
            >
              -
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button 
              onClick={handleIncrease}
              className={styles.quantityButton}
              aria-label="수량 증가"
            >
              +
            </button>
          </div>
          
          <div className={styles.itemTotal}>
            {itemTotal.toLocaleString()}원
          </div>
        </div>
        
        <button 
          onClick={handleRemove}
          className={styles.removeButton}
          aria-label="상품 제거"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}