import { useShallow } from 'zustand/react/shallow';
import { useDashboardStore } from '@/stores/dashboardStore';

// 메모이제이션된 셀렉터 함수들 (컴포넌트 외부에 정의)
export const getUserStats = (state) => {
  const activeUsers = state.users.filter((u) => u.status === 'active').length;
  const inactiveUsers = state.users.filter((u) => u.status === 'inactive').length;
  const departments = [...new Set(state.users.map((u) => u.department))];

  return {
    totalUsers: state.users.length,
    activeUsers,
    inactiveUsers,
    departmentCount: departments.length,
  };
};

export const getFilteredAndSortedUsers = (state) => {
  let filtered = state.users;

  // 부서 필터링
  if (state.filters.department) {
    filtered = filtered.filter(
      (user) => user.department === state.filters.department
    );
  }

  // 상태 필터링
  if (state.filters.status) {
    filtered = filtered.filter((user) => user.status === state.filters.status);
  }

  // 검색 필터링
  if (state.filters.search) {
    const query = state.filters.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  // 정렬
  return filtered.sort((a, b) => {
    const getValue = (user, field) => {
      switch (field) {
        case 'name':
          return user.name;
        case 'department':
          return user.department;
        case 'lastActive':
          return new Date(user.lastActive);
        default:
          return '';
      }
    };

    const aValue = getValue(a, state.sortBy);
    const bValue = getValue(b, state.sortBy);
    const multiplier = state.sortOrder === 'asc' ? 1 : -1;

    if (aValue < bValue) return -1 * multiplier;
    if (aValue > bValue) return 1 * multiplier;
    return 0;
  });
};

export const getDepartments = (state) => {
  return [...new Set(state.users.map((u) => u.department))];
};

// useShallow와 함께 사용하는 커스텀 훅
export function useUserStats() {
  return useDashboardStore(useShallow(getUserStats));
}

export function useFilteredAndSortedUsers() {
  return useDashboardStore(getFilteredAndSortedUsers);
}

export function useDepartments() {
  return useDashboardStore(getDepartments);
}

export function useFilterControls() {
  return useDashboardStore(
    useShallow((state) => ({
      filters: state.filters,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      setFilter: state.setFilter,
      setSorting: state.setSorting,
    }))
  );
}