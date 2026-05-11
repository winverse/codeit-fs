import { useState, useEffect } from 'react';
import styles from './MemoSearch.module.css';

export function MemoSearch() {
  // TODO: Zustand 스토어의 searchTerm 상태 연결하기
  // const { searchTerm, setSearchTerm } = useMemoStore((state) => ({
  //   searchTerm: state.searchTerm,
  //   setSearchTerm: state.setSearchTerm,
  // }));

  // 로컬 상태로 임시 구현 (TODO 제거 후 주석 해제)
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');

  // 디바운스를 위한 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: Zustand 액션 호출
      console.log('TODO: setSearchTerm 액션 호출:', inputValue);

      // 임시 로컬 상태 업데이트 (TODO 제거 후 삭제)
      setLocalSearchTerm(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.searchIcon}>🔍</div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="메모 제목이나 내용으로 검색..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            title="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>

      {/* TODO: 검색 결과 개수 표시 */}
      {localSearchTerm && (
        <div className={styles.resultInfo}>
          <span className={styles.searchTerm}>"{localSearchTerm}"</span>
          <span className={styles.resultCount}>검색 결과: 0개</span>
        </div>
      )}
    </div>
  );
}
