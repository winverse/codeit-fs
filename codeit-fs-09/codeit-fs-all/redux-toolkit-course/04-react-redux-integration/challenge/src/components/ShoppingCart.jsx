// TODO: 필요한 훅들 import하기
// import { useAppSelector, useAppDispatch } from '@/hooks/hooks.js'
// import { selectCartItems, selectCartTotalQuantity, selectCartTotalPrice, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice.js'

import styles from './ShoppingCart.module.css'

export function ShoppingCart() {
  // TODO: Redux 상태와 디스패치 함수 가져오기
  // const cartItems = useAppSelector(selectCartItems)
  // const totalQuantity = useAppSelector(selectCartTotalQuantity)  
  // const totalPrice = useAppSelector(selectCartTotalPrice)
  // const dispatch = useAppDispatch()
  
  // 임시 데이터 (TODO 완료 후 제거)
  const cartItems = []
  const totalQuantity = 0
  const totalPrice = 0
  
  const handleRemoveItem = (itemId) => {
    // TODO: removeFromCart 액션 디스패치
    console.log('TODO: 장바구니에서 제거', itemId)
  }
  
  const handleQuantityChange = (itemId, newQuantity) => {
    // TODO: updateQuantity 액션 디스패치
    console.log('TODO: 수량 변경', itemId, newQuantity)
  }
  
  const handleClearCart = () => {
    // TODO: clearCart 액션 디스패치
    console.log('TODO: 장바구니 비우기')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>장바구니</h2>
        <span className={styles.badge}>{totalQuantity}</span>
      </div>
      
      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <p>🛒 장바구니가 비어있습니다</p>
          <p className={styles.todoNote}>
            ⚠️ Redux 연결 후 장바구니 기능이 작동합니다
          </p>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p className={styles.price}>₩{item.price.toLocaleString()}</p>
                </div>
                
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                
                <div className={styles.itemTotal}>
                  ₩{(item.price * item.quantity).toLocaleString()}
                </div>
                
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className={styles.summary}>
            <div className={styles.totalRow}>
              <span>총 {totalQuantity}개 상품</span>
              <strong>₩{totalPrice.toLocaleString()}</strong>
            </div>
            
            <div className={styles.actions}>
              <button onClick={handleClearCart} className={styles.clearButton}>
                장바구니 비우기
              </button>
              <button className={styles.checkoutButton}>
                결제하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}