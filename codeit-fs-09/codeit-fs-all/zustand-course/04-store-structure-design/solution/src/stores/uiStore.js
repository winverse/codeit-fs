import { create } from 'zustand';

// ✅ UI 상태 전용 스토어
export const useUIStore = create((set) => ({
  // 상태: UI 관련만 관리
  selectedCategory: 'all',
  isCartOpen: false,
  searchQuery: '',
  sortBy: 'name', // 'name', 'price-asc', 'price-desc'

  // 액션: UI 로직만
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSortBy: (sortBy) => set({ sortBy }),

  // UI 상태 초기화
  resetFilters: () => set({
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'name'
  })
}));