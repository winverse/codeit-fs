import React, { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import PostCard from '../PostCard/PostCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import styles from './PostList.module.css';

function PostList() {
  const { 
    posts, 
    fetchPosts,
    // TODO: 로딩 및 에러 상태 추가
    // isLoading,
    // error,
    // searchQuery,
    // selectedUserId
  } = useBlogStore();

  useEffect(() => {
    // TODO: 컴포넌트 마운트 시 포스트 목록 로드
    fetchPosts();
  }, [fetchPosts]);

  // TODO: 로딩 상태 처리
  // if (isLoading) {
  //   return (
  //     <div className={styles.container}>
  //       <LoadingSpinner message="Loading posts..." />
  //     </div>
  //   );
  // }

  // TODO: 에러 상태 처리
  // if (error) {
  //   return (
  //     <div className={styles.container}>
  //       <ErrorMessage 
  //         message={error}
  //         onRetry={() => fetchPosts()}
  //       />
  //     </div>
  //   );
  // }

  // TODO: 빈 상태 처리 개선
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>No posts available</h3>
          <p>There are no blog posts to display at the moment.</p>
          
          {/* TODO: 새로고침 버튼 추가 */}
          <button 
            className={styles.refreshButton}
            onClick={() => fetchPosts()}
          >
            🔄 Refresh Posts
          </button>
        </div>
      </div>
    );
  }

  // TODO: 검색 및 필터링 로직 추가
  // const filteredPosts = posts.filter(post => {
  //   const matchesSearch = !searchQuery || 
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     post.body.toLowerCase().includes(searchQuery.toLowerCase());
  //   
  //   const matchesUser = !selectedUserId || post.userId === selectedUserId;
  //   
  //   return matchesSearch && matchesUser;
  // });

  return (
    <div className={styles.container}>
      {/* TODO: 필터 및 정렬 컨트롤 추가 */}
      <div className={styles.controls}>
        <div className={styles.info}>
          <h2>All Posts</h2>
          <span className={styles.count}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {/* TODO: 정렬 옵션 추가 */}
        <div className={styles.sortOptions}>
          <select className={styles.sortSelect}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="author">By Author</option>
          </select>
        </div>
      </div>

      {/* TODO: 필터 바 추가 */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>Filter by Author:</label>
          <select className={styles.filterSelect}>
            <option value="">All Authors</option>
            {/* TODO: 고유 사용자 목록 생성 */}
            <option value="1">User 1</option>
            <option value="2">User 2</option>
          </select>
        </div>
      </div>

      {/* TODO: 포스트 그리드 */}
      <div className={styles.postsGrid}>
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            // TODO: 검색어 하이라이팅을 위한 props 추가
            // searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* TODO: 페이지네이션 또는 무한 스크롤 추가 */}
      <div className={styles.pagination}>
        <button className={styles.loadMoreButton}>
          Load More Posts
        </button>
      </div>
    </div>
  );
}

export default PostList;