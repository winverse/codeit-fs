import { create } from 'zustand';

export const useLibraryStore = create((set, get) => ({
  books: [], // 전체 도서 목록
  
  rentals: {
    activeRentals: [], // 현재 대출 중인 도서들
    history: [], // 대출 히스토리
    overdueBooks: [], // 연체 도서들
  },
  
  user: {
    profile: { name: '', id: '', maxRentals: 5 },
    wishlist: [], // 찜 목록
    statistics: { totalRentals: 0, currentRentals: 0 }
  },
  
  ui: {
    selectedGenre: 'all',
    searchQuery: '',
    activeTab: 'browse', // 'browse', 'rentals', 'wishlist'
  }
}));