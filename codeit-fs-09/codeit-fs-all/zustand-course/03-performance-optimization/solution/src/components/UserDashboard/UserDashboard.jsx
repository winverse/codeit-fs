import { useDashboardStore } from '@/stores/dashboardStore';
import { UserCard } from '@/components/UserCard';
import { UserFilter } from '@/components/UserFilter';
import { 
  useUserStats, 
  useFilteredAndSortedUsers, 
  useDepartments 
} from '@/selectors/userSelectors';
import styles from './UserDashboard.module.css';

export function UserDashboard() {
  console.log('✅ UserDashboard 렌더링됨 (최적화 버전)');

  // ✅ 최적화: 액션만 구독하여 불필요한 리렌더링 방지
  const { setFilter, setSorting, updateUser } = useDashboardStore(
    (state) => ({
      setFilter: state.setFilter,
      setSorting: state.setSorting,
      updateUser: state.updateUser,
    })
  );

  // ✅ 최적화: 메모이제이션된 셀렉터 사용
  const stats = useUserStats();
  const users = useFilteredAndSortedUsers();
  const departments = useDepartments();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>사용자 대시보드 (최적화됨)</h2>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>총 사용자</span>
            <span className={styles.value}>{stats.totalUsers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>활성 사용자</span>
            <span className={styles.value}>{stats.activeUsers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>비활성 사용자</span>
            <span className={styles.value}>{stats.inactiveUsers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>부서 수</span>
            <span className={styles.value}>{stats.departmentCount}</span>
          </div>
        </div>
      </div>

      <UserFilter
        departments={departments}
        onFilterChange={setFilter}
        onSortChange={setSorting}
      />

      <div className={styles.users}>
        {users.slice(0, 50).map((user) => (
          <UserCard 
            key={user.id} 
            user={user}
            onUpdate={(updates) => updateUser(user.id, updates)}
          />
        ))}
      </div>
      
      {users.length > 50 && (
        <div className={styles.pagination}>
          <p>
            처음 50명만 표시 중 (총 {users.length}명)
          </p>
        </div>
      )}
    </div>
  );
}