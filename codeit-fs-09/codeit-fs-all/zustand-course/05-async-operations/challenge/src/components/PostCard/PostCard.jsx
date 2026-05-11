import React from 'react';
import { useBlogStore } from '@/store/blogStore';
import styles from './PostCard.module.css';

function PostCard({ post }) {
  const { setView } = useBlogStore();

  // TODO: 포스트 카드 개선사항 구현
  // - 작성자 정보 표시
  // - 작성 날짜 (mock)
  // - 태그 표시 (선택사항)
  // - 좋아요/조회수 (mock)
  // - 검색어 하이라이팅

  const handleClick = () => {
    // TODO: 포스트 상세 페이지로 이동
    setView('detail', post.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    // TODO: 수정 페이지로 이동
    setView('edit', post.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // TODO: 삭제 확인 다이얼로그 표시 후 삭제 실행
    if (confirm('Are you sure you want to delete this post?')) {
      // deletePost(post.id);
      console.log('TODO: deletePost 구현 필요', post.id);
    }
  };

  // TODO: 본문 요약 함수
  const getSummary = (body, limit = 120) => {
    if (body.length <= limit) return body;
    return body.substring(0, limit) + '...';
  };

  // TODO: 검색어 하이라이팅 함수
  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>{part}</mark>
      ) : part
    );
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      {/* TODO: 포스트 메타 정보 */}
      <div className={styles.meta}>
        <div className={styles.author}>
          <div className={styles.avatar}>
            {/* TODO: 실제 사용자 데이터에서 이니셜 생성 */}
            U{post.userId}
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>User {post.userId}</span>
            <span className={styles.date}>
              {/* TODO: 실제 날짜 또는 mock 날짜 */}
              2 days ago
            </span>
          </div>
        </div>

        {/* TODO: 포스트 액션 버튼들 */}
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={handleEdit}
            title="Edit post"
          >
            ✏️
          </button>
          <button
            className={styles.actionButton}
            onClick={handleDelete}
            title="Delete post"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* TODO: 포스트 내용 */}
      <div className={styles.content}>
        <h3 className={styles.title}>
          {/* TODO: 검색어 하이라이팅 적용 */}
          {post.title}
        </h3>
        
        <p className={styles.summary}>
          {/* TODO: 검색어 하이라이팅 적용 */}
          {getSummary(post.body)}
        </p>
      </div>

      {/* TODO: 포스트 통계 */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>👁️</span>
          <span className={styles.statCount}>
            {/* TODO: mock 조회수 또는 실제 데이터 */}
            {Math.floor(Math.random() * 1000) + 50}
          </span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statIcon}>❤️</span>
          <span className={styles.statCount}>
            {/* TODO: mock 좋아요 또는 실제 데이터 */}
            {Math.floor(Math.random() * 100) + 5}
          </span>
        </div>
        
        <div className={styles.stat}>
          <span className={styles.statIcon}>💬</span>
          <span className={styles.statCount}>
            {/* TODO: 실제 댓글 수 (API에서 가져오기) */}
            {Math.floor(Math.random() * 20)}
          </span>
        </div>
      </div>

      {/* TODO: 태그 표시 (선택사항) */}
      <div className={styles.tags}>
        <span className={styles.tag}>General</span>
        <span className={styles.tag}>Post #{post.id}</span>
      </div>
    </article>
  );
}

export default PostCard;