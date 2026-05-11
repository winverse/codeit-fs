import { useAuthStore, useSettingsStore, useNotificationStore } from '@/stores'
import styles from './Header.module.css'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)
  const showSuccess = useNotificationStore((state) => state.showSuccess)
  const showInfo = useNotificationStore((state) => state.showInfo)

  function handleLogin() {
    // 임시 로그인 데이터
    const mockUser = {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      avatar: 'https://via.placeholder.com/40'
    }
    
    useAuthStore.getState().login(mockUser)
    showSuccess(`안녕하세요, ${mockUser.name}님! 로그인되었습니다.`)
  }

  function handleLogout() {
    logout()
    showInfo('로그아웃되었습니다.')
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
              <button onClick={handleLogout} className={styles.logoutButton}>
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