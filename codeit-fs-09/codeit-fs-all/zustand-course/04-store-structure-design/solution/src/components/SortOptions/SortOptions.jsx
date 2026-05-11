import { useUIStore } from '@/stores/uiStore';
import styles from './SortOptions.module.css';

const sortOptions = [
  { value: 'name', label: '이름순' },
  { value: 'price-asc', label: '가격 낮은순' },
  { value: 'price-desc', label: '가격 높은순' }
];

export function SortOptions() {
  const sortBy = useUIStore((state) => state.sortBy);
  const setSortBy = useUIStore((state) => state.setSortBy);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="sort-select" className={styles.label}>
        정렬:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        className={styles.select}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}