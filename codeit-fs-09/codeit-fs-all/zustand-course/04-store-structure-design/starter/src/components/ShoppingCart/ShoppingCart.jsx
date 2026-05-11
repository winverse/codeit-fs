import { useShopStore } from '@/stores/shopStore';
import { CartItem } from '@/components/CartItem';
import styles from './ShoppingCart.module.css';

export function ShoppingCart() {
  const { cart, isCartOpen, toggleCart, clearCart } = useShopStore();

  // 총 금액 계산 (문제점: 컴포넌트에서 복잡한 계산)
  const totalAmount = cart.reduce((total, item) => {
    const product = useShopStore.getState().products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  // 총 아이템 수 계산 (문제점: 컴포넌트에서 계산)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={toggleCart} />
      <div className={styles.cart}>
        <div className={styles.header}>
          <h2>장바구니</h2>
          <button 
            onClick={toggleCart}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              장바구니가 비어있습니다
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {cart.map((item, index) => (
                  <CartItem key={`${item.productId}-${index}`} item={item} />
                ))}
              </div>
              
              <div className={styles.summary}>
                <div className={styles.totalItems}>
                  총 {totalItems}개 상품
                </div>
                <div className={styles.totalAmount}>
                  총액: {totalAmount.toLocaleString()}원
                </div>
                
                <div className={styles.actions}>
                  <button 
                    onClick={clearCart}
                    className={styles.clearButton}
                  >
                    전체 삭제
                  </button>
                  <button className={styles.checkoutButton}>
                    주문하기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}