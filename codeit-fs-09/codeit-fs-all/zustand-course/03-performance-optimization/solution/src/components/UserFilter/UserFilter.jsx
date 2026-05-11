import { useDashboardStore } from '@/stores/dashboardStore';
import { useShallow } from 'zustand/react/shallow';
import styles from './UserFilter.module.css';

export function UserFilter({ departments, onFilterChange, onSortChange }) {
  // ✅ 최적화: useShallow로 객체 구조분해하여 불필요한 리렌더링 방지
  const { filters, sortBy, sortOrder } = useDashboardStore(
    useShallow((state) => ({
      filters: state.filters,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
    }))
  );

  function handleSearchChange(e) {
    onFilterChange('search', e.target.value);
  }

  function handleDepartmentChange(e) {
    onFilterChange('department', e.target.value);
  }

  function handleStatusChange(e) {
    onFilterChange('status', e.target.value);
  }

  function handleSortChange(field) {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newOrder);
  }

  console.log('✅ UserFilter 렌더링됨 (최적화 버전)');

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>필터 및 정렬</h3>
      
      <div className={styles.section}>
        <label className={styles.label}>
          검색:
          <input
            type="text"
            value={filters.search || ''}
            onChange={handleSearchChange}
            placeholder="이름 또는 이메일 검색"
            className={styles.searchInput}
          />
        </label>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          부서:
          <select
            value={filters.department || ''}
            onChange={handleDepartmentChange}
            className={styles.select}
          >
            <option value="">전체</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          상태:
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className={styles.select}
          >
            <option value="">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </label>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>정렬:</span>
        <div className={styles.sortButtons}>
          <button
            onClick={() => handleSortChange('name')}
            className={`${styles.sortButton} ${
              sortBy === 'name' ? styles.active : ''
            }`}
          >
            이름 {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('department')}
            className={`${styles.sortButton} ${
              sortBy === 'department' ? styles.active : ''
            }`}
          >
            부서 {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('lastActive')}
            className={`${styles.sortButton} ${
              sortBy === 'lastActive' ? styles.active : ''
            }`}
          >
            마지막 활동 {sortBy === 'lastActive' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
    </div>
  );
}