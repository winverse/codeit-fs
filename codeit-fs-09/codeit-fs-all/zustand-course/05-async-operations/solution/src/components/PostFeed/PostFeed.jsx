import { useEffect, useState, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useSocialStore } from "@/stores/socialStore";
import { useRealTimeStore } from "@/stores/realTimeStore";
import { useAsyncOperationWithRetry } from "@/hooks/useAsyncOperation";
import { PostCard } from "./PostCard";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import styles from "./PostFeed.module.css";

export function PostFeed() {
  const [posts, isLoading, fetchPosts, hasNextPage, nextCursor] =
    useSocialStore(
      useShallow((state) => [
        Object.values(state.entities.posts).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        state.isLoading("fetchPosts"),
        state.fetchPosts,
        state.meta.posts.hasNextPage,
        state.meta.posts.nextCursor,
      ])
    );

  const connectionStatus = useRealTimeStore((state) => state.connectionStatus);

  // 무한 스크롤을 위한 async 훅
  const {
    loading: loadingMore,
    error: loadMoreError,
    execute: executeLoadMore,
  } = useAsyncOperationWithRetry(3, 1000);

  // 새로고침을 위한 async 훅
  const {
    loading: refreshing,
    error: refreshError,
    execute: executeRefresh,
  } = useAsyncOperationWithRetry(2, 500);

  // 초기 데이터 로딩
  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts.length]);

  // 더 많은 포스트 로딩
  const loadMorePosts = useCallback(async () => {
    if (!hasNextPage || loadingMore) return;

    try {
      await executeLoadMore(fetchPosts, { cursor: nextCursor });
    } catch (error) {
      console.error("더 많은 포스트 로딩 실패:", error);
    }
  }, [hasNextPage, loadingMore, executeLoadMore, fetchPosts, nextCursor]);

  // 새로고침
  const refreshPosts = useCallback(async () => {
    try {
      await executeRefresh(fetchPosts, { force: true });
    } catch (error) {
      console.error("새로고침 실패:", error);
    }
  }, [executeRefresh, fetchPosts]);

  // 스크롤 이벤트 (무한 스크롤)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts]);

  // 에러 상태 처리
  const error = useSocialStore((state) => state.getError("fetchPosts"));

  if (error && posts.length === 0) {
    return (
      <ErrorMessage
        title="포스트를 불러올 수 없습니다"
        message={error}
        onRetry={() => fetchPosts({ force: true })}
      />
    );
  }

  return (
    <div className={styles.feed}>
      {/* 연결 상태 표시 */}
      <div className={styles.status}>
        <span className={`${styles.indicator} ${styles[connectionStatus]}`} />
        실시간 업데이트: {connectionStatus === "connected"
          ? "연결됨"
          : "연결 안됨"}
      </div>

      {/* 새로고침 버튼 */}
      <div className={styles.actions}>
        <button
          onClick={refreshPosts}
          disabled={refreshing || isLoading}
          className={styles.refreshButton}
        >
          {refreshing ? <LoadingSpinner size="small" /> : "🔄"}
          새로고침
        </button>
        {refreshError && <span className={styles.error}>{refreshError}</span>}
      </div>

      {/* 포스트 목록 */}
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* 로딩 상태 */}
        {isLoading && posts.length === 0 && (
          <div className={styles.loading}>
            <LoadingSpinner />
            <p>포스트를 불러오는 중...</p>
          </div>
        )}

        {/* 더 로딩 버튼/상태 */}
        {hasNextPage && (
          <div className={styles.loadMore}>
            {loadingMore ? (
              <LoadingSpinner />
            ) : (
              <button onClick={loadMorePosts} className={styles.loadMoreButton}>
                더 많은 포스트 보기
              </button>
            )}
            {loadMoreError && (
              <ErrorMessage
                message={loadMoreError}
                onRetry={loadMorePosts}
                compact
              />
            )}
          </div>
        )}

        {/* 모든 포스트를 다 본 경우 */}
        {!hasNextPage && posts.length > 0 && (
          <div className={styles.endMessage}>
            🎉 모든 포스트를 다 보셨습니다!
          </div>
        )}
      </div>
    </div>
  );
}