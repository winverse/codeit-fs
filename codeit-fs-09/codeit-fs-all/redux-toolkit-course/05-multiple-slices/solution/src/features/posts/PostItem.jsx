import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { deletePost, togglePostStatus } from "./postsSlice";
import { deleteCommentsByPostId, selectCommentsCountByPostId } from "@/features/comments/commentsSlice";
import styles from "./PostItem.module.css";

export function PostItem({ post }) {
  const dispatch = useAppDispatch();
  const author = useAppSelector((state) => 
    state.users.entities[post.authorId] || { name: "Unknown", avatar: "👤" }
  );
  const commentsCount = useAppSelector((state) => 
    selectCommentsCountByPostId(state, post.id)
  );

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      dispatch(deleteCommentsByPostId(post.id));
      dispatch(deletePost(post.id));
    }
  };

  const handleToggleStatus = () => {
    dispatch(togglePostStatus(post.id));
  };

  return (
    <article className={styles.postItem}>
      <header className={styles.header}>
        <h3 className={styles.title}>{post.title}</h3>
        <span className={`${styles.status} ${styles[post.status]}`}>
          {post.status === "published" ? "게시됨" : "초안"}
        </span>
      </header>
      
      <div className={styles.meta}>
        <span className={styles.author}>
          {author.avatar} {author.name}
        </span>
        <span className={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className={styles.comments}>
          💬 {commentsCount}
        </span>
      </div>
      
      <p className={styles.content}>{post.content}</p>
      
      {post.tags && post.tags.length > 0 && (
        <div className={styles.tags}>
          {post.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <footer className={styles.actions}>
        <button
          onClick={handleToggleStatus}
          className={styles.toggleButton}
        >
          {post.status === "published" ? "초안으로" : "게시하기"}
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          삭제
        </button>
      </footer>
    </article>
  );
}