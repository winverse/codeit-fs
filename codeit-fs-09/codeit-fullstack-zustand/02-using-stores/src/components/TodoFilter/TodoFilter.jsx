import styles from './TodoFilter.module.css';

const filters = [
  { key: 'all', label: '전체', icon: '📋' },
  { key: 'active', label: '진행중', icon: '⏳' },
  { key: 'completed', label: '완료', icon: '✅' },
];

export function TodoFilter() {
  // TODO: useTodoStore에서 상태와 액션들을 가져오세요

  // 임시 데이터 (TODO를 완성하면 제거하세요)
  const filter = 'all';
  const setFilter = f => console.log('TODO: Set filter to', f);
  const clearCompleted = () => console.log('TODO: Clear completed todos');
  const stats = { total: 0, active: 0, completed: 0 };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>필터</h2>
        <div className={styles.stats}>
          총 {stats.total}개 · 완료 {stats.completed}개
        </div>
      </div>

      <div className={styles.tabs}>
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`${styles.tab} ${filter === key ? styles.active : ''}`}
          >
            <span className={styles.icon}>{icon}</span>
            <span>{label}</span>
            {key === 'active' && stats.active > 0 && (
              <span className={styles.badge}>{stats.active}</span>
            )}
          </button>
        ))}
      </div>

      {stats.completed > 0 && (
        <button onClick={clearCompleted} className={styles.clearButton}>
          🗑️ 완료된 항목 삭제
        </button>
      )}
    </div>
  );
}
