import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';

// ✅ 장바구니 관련 로직을 캡슐화한 커스텀 훅
export const useShoppingCart = () => {
  // 스토어 액션들
  const { 
    addItem, 
    updateItemQuantity, 
    removeItem, 
    clearCart,
    hasItem,
    getItemQuantity 
  } = useCartStore();
  
  const { toggleCart, setCartOpen } = useUIStore();

  // 비즈니스 로직이 포함된 헬퍼 함수들
  const addToCart = (productId, quantity = 1) => {
    addItem(productId, quantity);
    
    // 상품 추가 후 약간의 피드백 (선택사항)
    console.log(`상품 ${productId}이(가) 장바구니에 추가되었습니다.`);
  };

  const increaseQuantity = (productId) => {
    const currentQuantity = getItemQuantity(productId);
    updateItemQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const currentQuantity = getItemQuantity(productId);
    if (currentQuantity > 1) {
      updateItemQuantity(productId, currentQuantity - 1);
    } else {
      removeItem(productId);
    }
  };

  const removeFromCart = (productId) => {
    removeItem(productId);
    console.log(`상품 ${productId}이(가) 장바구니에서 제거되었습니다.`);
  };

  const clearAllItems = () => {
    clearCart();
    console.log('장바구니가 비워졌습니다.');
  };

  // 장바구니 열기/닫기 with 로직
  const openCartWithFeedback = () => {
    setCartOpen(true);
  };

  const toggleCartWithFeedback = () => {
    toggleCart();
  };

  return {
    // 기본 액션들
    addToCart,
    removeFromCart,
    clearAllItems,
    
    // 수량 조절
    increaseQuantity,
    decreaseQuantity,
    updateItemQuantity,
    
    // 조회 함수들
    hasItem,
    getItemQuantity,
    
    // UI 제어
    openCartWithFeedback,
    toggleCartWithFeedback
  };
};