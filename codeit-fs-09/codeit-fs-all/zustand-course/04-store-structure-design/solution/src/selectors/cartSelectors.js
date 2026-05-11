import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';

// ✅ 계산된 값들을 위한 셀렉터들
export const useCartSummary = () => {
  const cartItems = useCartStore((state) => state.items);
  const products = useProductStore((state) => state.products);

  // 메모이제이션을 통한 성능 최적화
  return cartItems.reduce(
    (summary, item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return summary;

      const itemTotal = product.price * item.quantity;
      
      return {
        totalAmount: summary.totalAmount + itemTotal,
        totalItems: summary.totalItems + item.quantity,
        items: [
          ...summary.items,
          {
            ...item,
            product,
            itemTotal
          }
        ]
      };
    },
    { totalAmount: 0, totalItems: 0, items: [] }
  );
};

// 장바구니 총 금액만 필요한 경우
export const useCartTotalAmount = () => {
  const cartItems = useCartStore((state) => state.items);
  const products = useProductStore((state) => state.products);

  return cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return product ? total + (product.price * item.quantity) : total;
  }, 0);
};

// 장바구니 총 아이템 수만 필요한 경우
export const useCartTotalItems = () => {
  return useCartStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
};

// 장바구니가 비어있는지 확인
export const useIsCartEmpty = () => {
  return useCartStore((state) => state.items.length === 0);
};

// 특정 상품이 장바구니에 있는지 확인
export const useIsInCart = (productId) => {
  return useCartStore((state) => 
    state.items.some(item => item.productId === productId)
  );
};

// 특정 상품의 장바구니 수량 조회
export const useCartItemQuantity = (productId) => {
  return useCartStore((state) => {
    const item = state.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  });
};