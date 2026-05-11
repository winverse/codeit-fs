import { Link } from 'react-router';
import styles from './PostList.module.css';
import { posts } from '../../data/posts';

export function PostListPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>게시글 목록</h2>
        <div className={styles.postList}>
          {posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <h3 className={styles.title}>{post.title}</h3>
              <div className={styles.meta}>
                <span>{post.author}</span> · <time dateTime={post.date}>{post.date}</time>
              </div>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <Link className={styles.more} to={`/posts/${post.id}`}>
                자세히 보기 →
              </Link>
            </article>
          ))}
        </div>

        <hr />

        <h3>사용자 프로필 보러가기</h3>
        <ul>
          <li><Link to="/users/user-1">Codeit 님 프로필</Link></li>
          <li><Link to="/users/user-2">Kim 님 프로필</Link></li>
        </ul>
      </div>
    </div>
  );
}