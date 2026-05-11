import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '@/features/cart/cartSlice';
import styles from './Cart.module.css';

export function Cart() {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector(state => state.cart);

  function handleRemoveFromCart(productId) {
    dispatch(removeFromCart(productId));
  }

  function handleUpdateQuantity(productId, quantity) {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <h3>장바구니</h3>
        {items.length > 0 && (
          <button onClick={handleClearCart} className={styles.clearButton}>
            전체 삭제
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>장바구니가 비어있습니다</p>
      ) : (
        <>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.productId} className={styles.item}>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemPrice}>₩{item.price.toLocaleString()}</p>
                </div>
                
                <div className={styles.controls}>
                  <div className={styles.quantity}>
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveFromCart(item.productId)}
                    className={styles.removeButton}
                  >
                    삭제
                  </button>
                </div>
                
                <div className={styles.subtotal}>
                  ₩{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.summary}>
            <div className={styles.summaryLine}>
              <span>총 상품 수: {itemCount}개</span>
            </div>
            <div className={`${styles.summaryLine} ${styles.total}`}>
              <span>총 금액: ₩{total.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}