import { useDashboardStore } from '@/stores/dashboardStore';
import styles from './UserCard.module.css';

export function UserCard({ user }) {
  // TODO: 개별 액션만 구독하도록 최적화 필요
  const updateUser = useDashboardStore((state) => state.updateUser);

  function handleToggleActive() {
    // TODO: 실제 액션 호출로 변경 필요
    console.log('TODO: updateUser 액션 호출', user.id, {
      isActive: !user.isActive,
    });
    updateUser(user.id, { isActive: !user.isActive });
  }

  console.log(`🔄 UserCard ${user.id} 렌더링됨`);

  return (
    <div className={`${styles.card} ${user.isActive ? styles.active : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{user.name}</h3>
        <span
          className={`${styles.status} ${
            user.isActive ? styles.statusActive : styles.statusInactive
          }`}
        >
          {user.isActive ? '활성' : '비활성'}
        </span>
      </div>

      <div className={styles.info}>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.department}>부서: {user.department}</p>
        <p className={styles.score}>점수: {user.score}</p>
        <p className={styles.joinedAt}>
          입사일: {user.joinedAt.toLocaleDateString('ko-KR')}
        </p>
      </div>

      <div className={styles.actions}>
        <button onClick={handleToggleActive} className={styles.toggleButton}>
          {user.isActive ? '비활성화' : '활성화'}
        </button>
      </div>
    </div>
  );
}