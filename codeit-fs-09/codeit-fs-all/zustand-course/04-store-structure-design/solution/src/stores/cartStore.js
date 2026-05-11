import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// ✅ 개선된 장바구니 스토어 - 정규화된 구조
export const useCartStore = create(
  subscribeWithSelector((set, get) => ({
    // 상태: 장바구니 관련만 관리
    items: [], // { productId, quantity } 형태로 정규화
    
    // 액션: 장바구니 로직만
    addItem: (productId, quantity = 1) => set((state) => {
      const existingItem = state.items.find(item => item.productId === productId);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { productId, quantity }]
        };
      }
    }),

    updateItemQuantity: (productId, quantity) => set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(item => item.productId !== productId)
        };
      }
      
      return {
        items: state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )
      };
    }),

    removeItem: (productId) => set((state) => ({
      items: state.items.filter(item => item.productId !== productId)
    })),

    clearCart: () => set({ items: [] }),

    // 아이템 존재 여부 확인
    hasItem: (productId) => {
      return get().items.some(item => item.productId === productId);
    },

    // 특정 상품의 수량 조회
    getItemQuantity: (productId) => {
      const item = get().items.find(item => item.productId === productId);
      return item ? item.quantity : 0;
    }
  }))
);