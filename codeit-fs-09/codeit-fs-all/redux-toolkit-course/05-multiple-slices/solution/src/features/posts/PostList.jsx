import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectFilteredPosts,
  setPostsFilter,
  setPostsSort,
} from "./postsSlice";
import { PostItem } from "./PostItem";
import styles from "./PostList.module.css";

export function PostList() {
  const posts = useAppSelector(selectFilteredPosts);
  const filter = useAppSelector((state) => state.posts.filter);
  const sortBy = useAppSelector((state) => state.posts.sortBy);
  const sortOrder = useAppSelector((state) => state.posts.sortOrder);
  const dispatch = useAppDispatch();

  const handleFilterChange = (newFilter) => {
    dispatch(setPostsFilter(newFilter));
  };

  const handleSortChange = (newSortBy) => {
    const newSortOrder =
      sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setPostsSort({ sortBy: newSortBy, sortOrder: newSortOrder }));
  };

  return (
    <div className={styles.postList}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <button
            onClick={() => handleFilterChange("all")}
            className={filter === "all" ? styles.active : ""}
          >
            전체
          </button>
          <button
            onClick={() => handleFilterChange("published")}
            className={filter === "published" ? styles.active : ""}
          >
            게시됨
          </button>
          <button
            onClick={() => handleFilterChange("draft")}
            className={filter === "draft" ? styles.active : ""}
          >
            초안
          </button>
        </div>

        <div className={styles.sorting}>
          <button onClick={() => handleSortChange("createdAt")}>
            날짜순 {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSortChange("title")}>
            제목순 {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className={styles.posts}>
        {posts.length === 0 ? (
          <p className={styles.empty}>게시글이 없습니다.</p>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}