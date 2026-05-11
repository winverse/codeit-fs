import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { publishPost, likePost, setFilter, deletePost } from '@/features/posts/postsSlice';
import styles from './PostsSection.module.css';

export function PostsSection() {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const filteredPosts = items.filter((post) => {
    if (filter === 'my') return post.authorId === user?.id;
    if (filter === 'draft') return post.status === 'draft';
    return true; // 'all'
  });

  function handlePublish(postId) {
    dispatch(publishPost(postId));
  }

  function handleLike(postId) {
    dispatch(likePost(postId));
  }

  function handleDelete(postId) {
    dispatch(deletePost(postId));
  }

  function handleFilterChange(newFilter) {
    dispatch(setFilter(newFilter));
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>게시글</h3>
        
        <div className={styles.filters}>
          <button
            onClick={() => handleFilterChange('all')}
            className={filter === 'all' ? styles.activeFilter : styles.filter}
          >
            전체 ({items.length})
          </button>
          <button
            onClick={() => handleFilterChange('my')}
            className={filter === 'my' ? styles.activeFilter : styles.filter}
          >
            내 글 ({items.filter(p => p.authorId === user?.id).length})
          </button>
          <button
            onClick={() => handleFilterChange('draft')}
            className={filter === 'draft' ? styles.activeFilter : styles.filter}
          >
            초안 ({items.filter(p => p.status === 'draft').length})
          </button>
        </div>
      </div>

      <div className={styles.list}>
        {filteredPosts.length === 0 ? (
          <p className={styles.empty}>
            {filter === 'all' && '게시글이 없습니다'}
            {filter === 'my' && '작성한 게시글이 없습니다'}
            {filter === 'draft' && '초안 게시글이 없습니다'}
          </p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <h4 className={styles.title}>{post.title}</h4>
                <div className={styles.meta}>
                  <span className={styles.author}>by {post.authorName}</span>
                  <span className={`${styles.status} ${styles[post.status]}`}>
                    {post.status === 'draft' ? '초안' : '게시됨'}
                  </span>
                </div>
              </div>
              
              <p className={styles.content}>{post.content}</p>
              
              <div className={styles.postActions}>
                <div className={styles.stats}>
                  <span>❤️ {post.likes}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className={styles.actions}>
                  {post.status === 'draft' && post.authorId === user?.id && (
                    <button 
                      onClick={() => handlePublish(post.id)}
                      className={styles.publishButton}
                    >
                      게시하기
                    </button>
                  )}
                  {post.status === 'published' && (
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={styles.likeButton}
                    >
                      좋아요
                    </button>
                  )}
                  {post.authorId === user?.id && (
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className={styles.deleteButton}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}