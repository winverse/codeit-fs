import { useState } from 'react';
import styles from './MemoFilter.module.css';

export function MemoFilter() {
  // TODO: Zustand 스토어의 filter 상태 연결하기
  // const { filter, setFilter } = useMemoStore((state) => ({
  //   filter: state.filter,
  //   setFilter: state.setFilter,
  // }));

  // 로컬 상태로 임시 구현 (TODO 제거 후 주석 해제)
  const [localFilter, setLocalFilter] = useState('all');

  const filters = [
    { key: 'all', label: '전체', icon: '📝' },
    { key: 'work', label: '업무', icon: '💼' },
    { key: 'personal', label: '개인', icon: '👤' },
    { key: 'study', label: '학습', icon: '📚' },
    { key: 'ideas', label: '아이디어', icon: '💡' },
  ];

  const handleFilterChange = filterKey => {
    // TODO: Zustand 액션 호출
    console.log('TODO: setFilter 액션 호출:', filterKey);

    // 임시 로컬 상태 업데이트 (TODO 제거 후 삭제)
    setLocalFilter(filterKey);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>카테고리 필터</h3>
      <div className={styles.filterList}>
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`${styles.filterButton} ${
              localFilter === filter.key ? styles.active : ''
            }`}
            onClick={() => handleFilterChange(filter.key)}
          >
            <span className={styles.icon}>{filter.icon}</span>
            <span className={styles.label}>{filter.label}</span>
            {/* TODO: 각 카테고리별 메모 개수 표시 */}
            <span className={styles.count}>0</span>
          </button>
        ))}
      </div>
    </div>
  );
}
