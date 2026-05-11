import React from 'react';
import styles from './PostList.module.css';
import { Spinner } from '@/components/Spinner';
import { PostCard } from '@/pages/HomePage/components/PostCard';
import { Pagination } from '@/components/Pagination';
import { usePosts } from '@/contexts/PostContext';

export function PostList() {
  const {
    posts,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToPage, // Renamed from handlePageChange
    handleDelete, // Renamed from onDelete
    handleUpdate, // Renamed from onUpdate
  } = usePosts();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className={styles.postListContainer}>
      <ul>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage} // Pass goToPage as onPageChange
      />
    </div>
  );
}
