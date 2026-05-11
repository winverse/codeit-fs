import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

export function Header() {
  const { isLoggedIn, user, loginCount } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Redux extraReducers 데모
        </h1>
        
        {isLoggedIn && (
          <div className={styles.info}>
            <span className={styles.welcome}>
              환영합니다, {user.username}님!
            </span>
            <span className={styles.badge}>
              로그인 {loginCount}회
            </span>
            {unreadCount > 0 && (
              <span className={styles.notification}>
                🔔 {unreadCount}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}