import { useDashboardStore } from '@/stores/dashboardStore';
import { UserCard } from '@/components/UserCard';
import styles from './UserDashboard.module.css';

export function UserDashboard() {
  // TODO: 성능 문제가 있는 코드 - 매번 새 배열과 객체 생성
  const filteredAndSortedUsers = useDashboardStore((state) => {
    console.log('🔄 필터링 로직 실행됨');
    
    let filtered = state.users;

    // 부서 필터링
    if (state.filters.department !== 'all') {
      filtered = filtered.filter(
        (user) => user.department === state.filters.department
      );
    }

    // 활성 사용자 필터링
    if (state.filters.activeOnly) {
      filtered = filtered.filter((user) => user.isActive);
    }

    // 검색 쿼리 필터링
    if (state.filters.searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(state.filters.searchQuery.toLowerCase()) ||
          user.email
            .toLowerCase()
            .includes(state.filters.searchQuery.toLowerCase())
      );
    }

    // 정렬
    return filtered.sort((a, b) => {
      const multiplier = state.sortOrder === 'asc' ? 1 : -1;
      if (typeof a[state.sortBy] === 'string') {
        return a[state.sortBy].localeCompare(b[state.sortBy]) * multiplier;
      }
      return (a[state.sortBy] - b[state.sortBy]) * multiplier;
    });
  });

  // TODO: 매번 새 객체 생성으로 인한 성능 문제
  const stats = useDashboardStore((state) => {
    console.log('🔄 통계 계산됨');
    return {
      total: state.users.length,
      active: state.users.filter((u) => u.isActive).length,
      departments: [...new Set(state.users.map((u) => u.department))],
    };
  });

  console.log('🔄 UserDashboard 렌더링됨 (성능 문제 버전)');

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>사용자 대시보드</h2>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>총 사용자</span>
            <span className={styles.value}>{stats.total}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>활성 사용자</span>
            <span className={styles.value}>{stats.active}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>부서 수</span>
            <span className={styles.value}>{stats.departments.length}</span>
          </div>
        </div>
      </div>

      <div className={styles.users}>
        {filteredAndSortedUsers.slice(0, 50).map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      
      {filteredAndSortedUsers.length > 50 && (
        <div className={styles.pagination}>
          <p>
            처음 50명만 표시 중 (총 {filteredAndSortedUsers.length}명)
          </p>
        </div>
      )}
    </div>
  );
}