import { useParams, Link } from 'react-router';
import styles from './User.module.css';
import { users } from '../../data/users';

export function UserPage() {
  const { userId } = useParams();
  const user = users.find((u) => u.id === userId);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {user ? (
          <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Website: {user.website}</p>
          </div>
        ) : (
          <h2>존재하지 않는 사용자입니다.</h2>
        )}
        <Link className={styles.backLink} to="/posts">
          ← 게시글 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}