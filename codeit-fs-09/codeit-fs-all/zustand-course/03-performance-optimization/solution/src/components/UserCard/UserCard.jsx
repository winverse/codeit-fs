import React from 'react';
import styles from './UserCard.module.css';

// ✅ 최적화: React.memo로 메모이제이션
export const UserCard = React.memo(function UserCard({ user, onUpdate }) {
  function handleToggleActive() {
    onUpdate({ status: user.status === 'active' ? 'inactive' : 'active' });
  }

  console.log(`✅ UserCard ${user.id} 렌더링됨 (메모이제이션)`);

  return (
    <div className={`${styles.card} ${user.status === 'active' ? styles.active : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.name}>{user.name}</h3>
        <span
          className={`${styles.status} ${
            user.status === 'active' ? styles.statusActive : styles.statusInactive
          }`}
        >
          {user.status === 'active' ? '활성' : '비활성'}
        </span>
      </div>

      <div className={styles.info}>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.department}>부서: {user.department}</p>
        <p className={styles.lastActive}>
          마지막 활동: {new Date(user.lastActive).toLocaleDateString('ko-KR')}
        </p>
      </div>

      <div className={styles.actions}>
        <button onClick={handleToggleActive} className={styles.toggleButton}>
          {user.status === 'active' ? '비활성화' : '활성화'}
        </button>
      </div>
    </div>
  );
});