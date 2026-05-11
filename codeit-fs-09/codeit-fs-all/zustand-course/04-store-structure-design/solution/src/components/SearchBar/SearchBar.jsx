import { useUIStore } from '@/stores/uiStore';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const setSearchQuery = useUIStore((state) => state.setSearchQuery);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIcon}>🔍</div>
        <input
          type="text"
          placeholder="상품명이나 설명으로 검색..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.input}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={styles.clearButton}
            title="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}