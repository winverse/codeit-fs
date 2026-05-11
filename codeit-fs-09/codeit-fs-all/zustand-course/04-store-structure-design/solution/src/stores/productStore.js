import { create } from 'zustand';
import { sampleProducts } from '@/data/products';

// ✅ 개선된 상품 스토어 - 단일 책임
export const useProductStore = create((set, get) => ({
  // 상태: 상품 관련만 관리
  products: sampleProducts,
  isLoading: false,
  error: null,

  // 액션: 상품 관련 로직만
  setProducts: (products) => set({ products }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  // 상품 검색 (비동기 액션 예시)
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    
    try {
      // 실제로는 API 호출
      const filtered = get().products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // 검색 결과를 별도로 관리하지 않고 컴포넌트에서 처리하도록
      return filtered;
    } catch (error) {
      set({ error: error.message });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // 상품 상세 조회
  getProductById: (id) => {
    return get().products.find(product => product.id === id) || null;
  }
}));