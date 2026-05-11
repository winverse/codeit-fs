import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, resetAllData } from '@/features/auth/authSlice';
import { setProfile, toggleEditing } from '@/features/profile/profileSlice';
import { addNotification, markAllAsRead } from '@/features/notifications/notificationsSlice';
import { addPost, publishPost, setFilter } from '@/features/posts/postsSlice';
import { Header } from '@/components/Header';
import { ProfileSection } from '@/components/ProfileSection';
import { NotificationsPanel } from '@/components/NotificationsPanel';
import { PostsSection } from '@/components/PostsSection';
import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');

  function handleLogin() {
    const userData = {
      id: Date.now(),
      username: username || 'guest',
      nickname: username || 'Guest User',
      bio: '안녕하세요!',
      avatar: '👤',
    };
    dispatch(login(userData));
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleResetAll() {
    dispatch(resetAllData());
  }

  function handleAddTestNotification() {
    dispatch(
      addNotification({
        message: '테스트 알림입니다!',
        type: 'info',
      })
    );
  }

  function handleAddTestPost() {
    if (user) {
      dispatch(
        addPost({
          title: '테스트 게시글',
          content: '이것은 테스트 게시글입니다.',
          authorId: user.id,
          authorName: user.username,
        })
      );
    }
  }

  return (
    <div className={styles.app}>
      <Header />
      
      <main className={styles.main}>
        {!isLoggedIn ? (
          <div className={styles.loginSection}>
            <h2>로그인</h2>
            <input
              type="text"
              placeholder="사용자명을 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleLogin} className={styles.button}>
              로그인
            </button>
          </div>
        ) : (
          <div className={styles.dashboard}>
            <div className={styles.sidebar}>
              <ProfileSection />
              <NotificationsPanel />
            </div>
            
            <div className={styles.content}>
              <PostsSection />
              
              <div className={styles.actions}>
                <h3>테스트 액션</h3>
                <button onClick={handleAddTestNotification} className={styles.testButton}>
                  알림 추가
                </button>
                <button onClick={handleAddTestPost} className={styles.testButton}>
                  게시글 추가
                </button>
                <button onClick={handleLogout} className={styles.button}>
                  로그아웃
                </button>
                <button onClick={handleResetAll} className={styles.resetButton}>
                  전체 리셋
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}