import React, { useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';
import styles from './PostDetail.module.css';

function PostDetail({ postId }) {
  const { 
    selectedPost,
    fetchPost,
    deletePost,
    setView,
    // TODO: 로딩 및 에러 상태 추가
    // isLoadingPost,
    // postError
  } = useBlogStore();

  useEffect(() => {
    if (postId) {
      // TODO: 포스트 상세 정보 로드
      fetchPost(postId);
    }
  }, [postId, fetchPost]);

  // TODO: 로딩 상태 처리
  // if (isLoadingPost) {
  //   return (
  //     <div className={styles.container}>
  //       <LoadingSpinner message="Loading post details..." />
  //     </div>
  //   );
  // }

  // TODO: 에러 상태 처리
  // if (postError) {
  //   return (
  //     <div className={styles.container}>
  //       <ErrorMessage 
  //         message={postError}
  //         onRetry={() => fetchPost(postId)}
  //       />
  //     </div>
  //   );
  // }

  // TODO: 포스트가 없을 때 처리
  if (!selectedPost) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>📄</div>
          <h3>Post not found</h3>
          <p>The requested blog post could not be found.</p>
          <button 
            className={styles.backButton}
            onClick={() => setView('list')}
          >
            ← Back to Posts
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    // TODO: 수정 페이지로 이동
    setView('edit', selectedPost.id);
  };

  const handleDelete = async () => {
    // TODO: 삭제 확인 다이얼로그
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        // TODO: 포스트 삭제 실행
        // await deletePost(selectedPost.id);
        console.log('TODO: deletePost 구현 필요', selectedPost.id);
        // 삭제 성공 시 목록으로 이동
        setView('list');
      } catch (error) {
        console.error('Failed to delete post:', error);
        // TODO: 에러 토스트 표시
      }
    }
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
    if (navigator.share) {
      navigator.share({
        title: selectedPost.title,
        text: selectedPost.body.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      // Fallback: URL 복사
      navigator.clipboard.writeText(window.location.href);
      // TODO: 복사 완료 토스트 표시
      alert('Link copied to clipboard!');
    }
  };

  // TODO: 관련 포스트 추천 함수
  const getRelatedPosts = () => {
    // 같은 사용자의 다른 포스트들을 반환
    return [];
  };

  return (
    <div className={styles.container}>
      {/* TODO: 포스트 헤더 */}
      <header className={styles.header}>
        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              U{selectedPost.userId}
            </div>
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>User {selectedPost.userId}</h4>
              <p className={styles.publishDate}>
                {/* TODO: 실제 날짜 또는 mock 날짜 */}
                Published 3 days ago
              </p>
            </div>
          </div>

          {/* TODO: 포스트 액션 버튼들 */}
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={handleShare}
              title="Share post"
            >
              🔗 Share
            </button>
            <button
              className={styles.actionButton}
              onClick={handleEdit}
              title="Edit post"
            >
              ✏️ Edit
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={handleDelete}
              title="Delete post"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* TODO: 포스트 제목 */}
        <h1 className={styles.title}>{selectedPost.title}</h1>

        {/* TODO: 포스트 통계 */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>👁️</span>
            <span>{Math.floor(Math.random() * 1000) + 100} views</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>❤️</span>
            <span>{Math.floor(Math.random() * 50) + 10} likes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💬</span>
            <span>{Math.floor(Math.random() * 20)} comments</span>
          </div>
        </div>
      </header>

      {/* TODO: 포스트 내용 */}
      <article className={styles.content}>
        <div className={styles.body}>
          {/* TODO: 마크다운 또는 리치 텍스트 렌더링 */}
          {selectedPost.body.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* TODO: 태그 섹션 */}
        <div className={styles.tags}>
          <span className={styles.tag}>General</span>
          <span className={styles.tag}>Post #{selectedPost.id}</span>
          <span className={styles.tag}>User {selectedPost.userId}</span>
        </div>
      </article>

      {/* TODO: 상호작용 섹션 */}
      <section className={styles.interactions}>
        <div className={styles.interactionButtons}>
          <button className={styles.likeButton}>
            ❤️ Like ({Math.floor(Math.random() * 50) + 10})
          </button>
          <button className={styles.commentButton}>
            💬 Comment ({Math.floor(Math.random() * 20)})
          </button>
          <button className={styles.bookmarkButton}>
            🔖 Bookmark
          </button>
        </div>
      </section>

      {/* TODO: 댓글 섹션 */}
      <section className={styles.comments}>
        <h3>Comments</h3>
        <div className={styles.commentsPlaceholder}>
          <p>Comments section coming soon...</p>
          {/* TODO: 실제 댓글 API 연동 */}
        </div>
      </section>

      {/* TODO: 관련 포스트 섹션 */}
      <section className={styles.related}>
        <h3>More from this author</h3>
        <div className={styles.relatedPlaceholder}>
          <p>Related posts coming soon...</p>
          {/* TODO: 같은 작성자의 다른 포스트들 표시 */}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;