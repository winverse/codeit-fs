import { NavLink, Outlet } from 'react-router';
import styles from './Community.module.css';

export function CommunityPage() {
  return (
    <div className={styles.page}>
      <h2>커뮤니티</h2>
      <nav>
        <NavLink to="/community" end>
          글 목록
        </NavLink>
        <NavLink to="/community/new-post">글쓰기</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
