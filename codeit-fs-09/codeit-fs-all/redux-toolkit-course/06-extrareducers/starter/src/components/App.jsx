import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '@/features/auth/authSlice';
import { setProfile } from '@/features/profile/profileSlice';
import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile);

  function handleLogin() {
    dispatch(login({ id: 1, username: 'codeit' }));
    dispatch(setProfile({ nickname: '코드잇', bio: 'Redux Toolkit 배우기!' }));
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className={styles.container}>
      <h1>Redux Toolkit extraReducers 예제</h1>
      {isLoggedIn ? (
        <div className={styles.profileBox}>
          <p>
            <b>유저명:</b> {user.username}
          </p>
          <p>
            <b>닉네임:</b> {profile.nickname}
          </p>
          <p>
            <b>소개:</b> {profile.bio}
          </p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}
    </div>
  );
}
