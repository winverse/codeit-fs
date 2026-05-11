import React from 'react';
import { useBlogStore } from '@/store/blogStore';
import styles from './Header.module.css';

function Header() {
  const { currentView, setView } = useBlogStore();

  // TODO: 헤더 기능 구현
  // - 현재 뷰에 따른 제목 표시
  // - 네비게이션 버튼들
  // - 검색 입력창 (선택사항)
  // - 새 포스트 작성 버튼

  const getTitle = () => {
    switch (currentView) {
      case 'list':
        return 'Blog Posts';
      case 'detail':
        return 'Post Detail';
      case 'create':
        return 'Create New Post';
      case 'edit':
        return 'Edit Post';
      default:
        return 'Blog Posts';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          {/* TODO: 로고 또는 사이트 제목 추가 */}
          <h1 className={styles.logo} onClick={() => setView('list')}>
            📝 Blog Manager
          </h1>
          
          {/* TODO: 브레드크럼 네비게이션 추가 */}
          <div className={styles.breadcrumb}>
            <span className={styles.currentTitle}>{getTitle()}</span>
          </div>
        </div>

        <div className={styles.actions}>
          {/* TODO: 검색 입력창 구현 */}
          {currentView === 'list' && (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search posts..."
                className={styles.searchInput}
                // TODO: 검색 기능 연결
                onChange={(e) => {
                  console.log('TODO: 검색 기능 구현', e.target.value);
                }}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          )}

          {/* TODO: 네비게이션 버튼들 */}
          <div className={styles.navButtons}>
            {currentView !== 'list' && (
              <button
                className={styles.backButton}
                onClick={() => setView('list')}
              >
                ← Back to List
              </button>
            )}

            {currentView === 'list' && (
              <button
                className={styles.createButton}
                onClick={() => setView('create')}
              >
                ✏️ New Post
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;