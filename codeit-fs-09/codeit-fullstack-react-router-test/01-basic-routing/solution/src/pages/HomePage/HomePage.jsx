import { Link } from 'react-router';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <h1>홈 페이지</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <Link to="/contact">연락처 페이지로 이동</Link>
    </div>
  );
}
