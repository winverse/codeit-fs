import { useShopStore } from '@/stores/shopStore';
import styles from './CartItem.module.css';

export function CartItem({ item }) {
  const { products, updateCartItem, removeFromCart } = useShopStore();
  
  // 문제점: 컴포넌트에서 상품 정보 검색
  const product = products.find(p => p.id === item.productId);
  
  if (!product) {
    return null; // 상품이 삭제된 경우
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.productId);
    } else {
      updateCartItem(item.productId, newQuantity);
    }
  };

  const itemTotal = product.price * item.quantity;

  return (
    <div className={styles.item}>
      <div className={styles.productInfo}>
        <img 
          src={product.image} 
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vPC90ZXh0Pgo8L3N2Zz4=';
          }}
        />
        <div className={styles.details}>
          <h4 className={styles.name}>{product.name}</h4>
          <div className={styles.price}>
            {product.price.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantityControls}>
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className={styles.quantityButton}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className={styles.quantityButton}
          >
            +
          </button>
        </div>
        
        <div className={styles.total}>
          {itemTotal.toLocaleString()}원
        </div>
        
        <button 
          onClick={() => removeFromCart(item.productId)}
          className={styles.removeButton}
        >
          삭제
        </button>
      </div>
    </div>
  );
}