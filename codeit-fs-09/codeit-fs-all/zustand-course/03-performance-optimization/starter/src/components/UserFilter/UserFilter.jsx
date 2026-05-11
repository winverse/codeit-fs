import { useDashboardStore } from '@/stores/dashboardStore';
import styles from './UserFilter.module.css';

export function UserFilter() {
  // TODO: useShallow로 객체 구조분해 최적화 필요
  const filters = useDashboardStore((state) => state.filters);
  const sortBy = useDashboardStore((state) => state.sortBy);
  const sortOrder = useDashboardStore((state) => state.sortOrder);
  const setFilter = useDashboardStore((state) => state.setFilter);
  const setSorting = useDashboardStore((state) => state.setSorting);

  function handleSearchChange(e) {
    setFilter('searchQuery', e.target.value);
  }

  function handleDepartmentChange(e) {
    setFilter('department', e.target.value);
  }

  function handleActiveOnlyChange(e) {
    setFilter('activeOnly', e.target.checked);
  }

  function handleSortChange(field) {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSorting(field, newOrder);
  }

  console.log('🔄 UserFilter 렌더링됨');

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>필터 및 정렬</h3>
      
      <div className={styles.section}>
        <label className={styles.label}>
          검색:
          <input
            type="text"
            value={filters.searchQuery}
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
            value={filters.department}
            onChange={handleDepartmentChange}
            className={styles.select}
          >
            <option value="all">전체</option>
            <option value="Engineering">개발팀</option>
            <option value="Marketing">마케팅팀</option>
            <option value="Sales">영업팀</option>
          </select>
        </label>
      </div>

      <div className={styles.section}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={filters.activeOnly}
            onChange={handleActiveOnlyChange}
            className={styles.checkbox}
          />
          활성 사용자만 보기
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
            onClick={() => handleSortChange('score')}
            className={`${styles.sortButton} ${
              sortBy === 'score' ? styles.active : ''
            }`}
          >
            점수 {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('joinedAt')}
            className={`${styles.sortButton} ${
              sortBy === 'joinedAt' ? styles.active : ''
            }`}
          >
            입사일 {sortBy === 'joinedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
    </div>
  );
}