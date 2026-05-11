import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
  // 대량의 데이터 (성능 테스트용)
  users: Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    isActive: Math.random() > 0.5,
    department: ['Engineering', 'Marketing', 'Sales'][
      Math.floor(Math.random() * 3)
    ],
    joinedAt: new Date(
      2020 + Math.random() * 4,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ),
    score: Math.floor(Math.random() * 100),
  })),

  filters: {
    department: 'all',
    activeOnly: false,
    searchQuery: '',
  },

  sortBy: 'name',
  sortOrder: 'asc',

  // 액션 구현
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  setSorting: (sortBy, sortOrder = 'asc') => {
    set({ sortBy, sortOrder });
  },

  updateUser: (userId, updates) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      ),
    }));
  },
}));