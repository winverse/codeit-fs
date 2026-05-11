import { create } from 'zustand';
import { sampleProducts, categories } from '@/data/products';

// 🚨 문제가 있는 스토어 구조 - 교육용
export const useShopStore = create((set) => ({
  // 🚨 문제 1: 모든 상태가 플랫한 구조 (정규화되지 않음)
  products: sampleProducts,
  categories: categories,
  cart: [],
  selectedCategory: 'all',
  isCartOpen: false,
  isLoading: false,
  error: null,
  
  // 🚨 문제 2: 액션과 상태가 뒤섞임 (관심사 분리 안됨)
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  // 🚨 문제 3: 비즈니스 로직이 복잡하고 중복됨
  addToCart: (productId) => set((state) => {
    console.log('🛒 상품 추가:', productId);
    
    const existingItem = state.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      // 🚨 문제: 중복된 수량 업데이트 로직
      return {
        cart: state.cart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, { productId, quantity: 1 }]
      };
    }
  }),
  
  // 🚨 문제 4: 수량 업데이트 로직이 분산되어 있음
  updateCartItem: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    )
  })),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.productId !== productId)
  })),
  
  clearCart: () => set({ cart: [] }),
  
  // 🚨 문제 5: 계산된 값이 없어서 컴포넌트에서 매번 계산해야 함
  // TODO: getTotalAmount, getTotalItems, getFilteredProducts 등의 셀렉터 필요
}));