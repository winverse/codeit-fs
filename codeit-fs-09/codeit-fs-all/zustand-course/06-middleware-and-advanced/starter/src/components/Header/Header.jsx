import { useUserStore, useSettingsStore } from '@/stores'
import styles from './Header.module.css'

export function Header() {
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)

  function handleLogin() {
    // 임시 로그인 데이터
    const mockUser = {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      avatar: 'https://via.placeholder.com/40'
    }
    
    useUserStore.getState().login(mockUser)
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>설정 관리 앱</h1>
        
        <div className={styles.actions}>
          <button 
            onClick={toggleTheme}
            className={styles.themeButton}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div className={styles.userInfo}>
              <img 
                src={user.avatar} 
                alt={user.name}
                className={styles.avatar}
              />
              <span>{user.name}</span>
              <button onClick={logout} className={styles.logoutButton}>
                로그아웃
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className={styles.loginButton}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  )
}