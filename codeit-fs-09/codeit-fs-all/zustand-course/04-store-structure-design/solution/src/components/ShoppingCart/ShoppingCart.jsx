import { useUIStore } from '@/stores/uiStore';
import { useCartSummary, useIsCartEmpty } from '@/selectors/cartSelectors';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { CartItem } from '@/components/CartItem';
import styles from './ShoppingCart.module.css';

export function ShoppingCart() {
  const toggleCart = useUIStore((state) => state.toggleCart);
  
  // ✅ 셀렉터로 계산된 값들 사용
  const cartSummary = useCartSummary();
  const isEmpty = useIsCartEmpty();
  
  // ✅ 커스텀 훅으로 비즈니스 로직 캡슐화
  const { clearAllItems } = useShoppingCart();

  const handleOverlayClick = () => {
    toggleCart();
  };

  const handleCartClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <div className={styles.cart} onClick={handleCartClick}>
        <div className={styles.header}>
          <h2 className={styles.title}>장바구니</h2>
          <button 
            onClick={toggleCart}
            className={styles.closeButton}
            aria-label="장바구니 닫기"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {isEmpty ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyMessage}>
                장바구니가 비어있습니다
              </p>
              <p className={styles.emptySubMessage}>
                마음에 드는 상품을 담아보세요!
              </p>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {cartSummary.items.map((item) => (
                  <CartItem 
                    key={item.productId} 
                    item={item}
                  />
                ))}
              </div>
              
              <div className={styles.summary}>
                <div className={styles.summaryInfo}>
                  <div className={styles.totalItems}>
                    총 {cartSummary.totalItems}개 상품
                  </div>
                  <div className={styles.totalAmount}>
                    {cartSummary.totalAmount.toLocaleString()}원
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <button 
                    onClick={clearAllItems}
                    className={styles.clearButton}
                  >
                    전체 삭제
                  </button>
                  <button 
                    className={styles.checkoutButton}
                    onClick={() => alert('주문 기능은 데모용입니다.')}
                  >
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