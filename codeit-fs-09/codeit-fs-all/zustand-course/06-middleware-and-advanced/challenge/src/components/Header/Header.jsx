import { useAuthStore, useSettingsStore, useNotificationStore } from '@/stores'
import styles from './Header.module.css'

export function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  
  // TODO: 추가 인증 상태 구독
  // const isLoading = useAuthStore((state) => state.isLoading)
  // const isAccountLocked = useAuthStore((state) => state.isAccountLocked)
  
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)
  
  // TODO: 추가 설정 상태 구독
  // const language = useSettingsStore((state) => state.language)
  // const notifications = useSettingsStore((state) => state.notifications)
  
  const showSuccess = useNotificationStore((state) => state.showSuccess)
  const showInfo = useNotificationStore((state) => state.showInfo)
  
  // TODO: 추가 알림 액션 구독
  // const showError = useNotificationStore((state) => state.showError)
  // const showWarning = useNotificationStore((state) => state.showWarning)

  function handleLogin() {
    // TODO: 실제 로그인 폼 모달 표시 또는 페이지 이동
    // setShowLoginModal(true)
    
    // 임시 로그인 데이터
    const mockUser = {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      avatar: 'https://via.placeholder.com/40',
      // TODO: 추가 사용자 정보
      // role: 'user',
      // permissions: ['read', 'write'],
      // profile: {
      //   firstName: '홍',
      //   lastName: '길동',
      //   phone: '010-1234-5678'
      // }
    }
    
    try {
      useAuthStore.getState().login(mockUser)
      showSuccess(`안녕하세요, ${mockUser.name}님! 로그인되었습니다.`)
      
      // TODO: 로그인 성공 후 추가 작업
      // - 사용자 환경설정 로드
      // - 알림 설정 동기화
      // - 분석 이벤트 전송
      
    } catch (error) {
      // TODO: 로그인 실패 처리
      // showError(`로그인 실패: ${error.message}`)
    }
  }

  function handleLogout() {
    // TODO: 로그아웃 확인 다이얼로그
    // if (!confirm('정말 로그아웃하시겠습니까?')) return
    
    try {
      logout()
      showInfo('로그아웃되었습니다.')
      
      // TODO: 로그아웃 후 추가 작업
      // - 캐시 정리
      // - 타이머 해제
      // - 분석 이벤트 전송
      
    } catch (error) {
      // TODO: 로그아웃 실패 처리
      // showError('로그아웃 중 오류가 발생했습니다.')
    }
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    // TODO: 테마 변경 알림 (선택사항)
    // showInfo(`테마가 ${newTheme === 'light' ? '라이트' : '다크'} 모드로 변경되었습니다.`)
  }

  // TODO: 언어 변경 핸들러
  // function handleLanguageChange(lang) {
  //   useSettingsStore.getState().setLanguage(lang)
  //   showInfo(`언어가 ${lang === 'ko' ? '한국어' : '영어'}로 변경되었습니다.`)
  // }

  // TODO: 프로필 편집 핸들러
  // function handleEditProfile() {
  //   setShowProfileModal(true)
  // }

  // TODO: 알림 토글 핸들러
  // function toggleNotifications() {
  //   const current = useSettingsStore.getState().notifications
  //   useSettingsStore.getState().toggleNotifications()
  //   showInfo(`알림이 ${!current ? '활성화' : '비활성화'}되었습니다.`)
  // }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>설정 관리 앱</h1>
        
        <div className={styles.actions}>
          {/* TODO: 추가 설정 버튼들 */}
          {/* <button 
            onClick={toggleNotifications}
            className={styles.notificationButton}
            title="알림 설정"
          >
            {notifications ? '🔔' : '🔕'}
          </button> */}
          
          {/* TODO: 언어 선택 드롭다운 */}
          {/* <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className={styles.languageSelect}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select> */}
          
          <button 
            onClick={toggleTheme}
            className={styles.themeButton}
            title={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
            // TODO: 로딩 상태 비활성화
            // disabled={isLoading}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div className={styles.userInfo}>
              <img 
                src={user.avatar} 
                alt={user.name}
                className={styles.avatar}
                // TODO: 이미지 로드 실패 처리
                // onError={(e) => {
                //   e.target.src = '/default-avatar.png'
                // }}
              />
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.name}</span>
                {/* TODO: 사용자 역할 표시 */}
                {/* <span className={styles.userRole}>{user.role}</span> */}
                {/* TODO: 마지막 로그인 시간 */}
                {/* <span className={styles.lastLogin}>
                  마지막 로그인: {formatDate(user.lastLogin)}
                </span> */}
              </div>
              
              {/* TODO: 사용자 메뉴 드롭다운 */}
              {/* <div className={styles.userMenu}>
                <button onClick={handleEditProfile}>프로필 편집</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div> */}
              
              <button 
                onClick={handleLogout} 
                className={styles.logoutButton}
                title="로그아웃"
                // TODO: 로딩 상태 비활성화
                // disabled={isLoading}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className={styles.loginButton}
              title="로그인"
              // TODO: 계정 잠금 상태 비활성화
              // disabled={isLoading || (isAccountLocked && isAccountLocked())}
            >
              {/* TODO: 로딩 상태 표시 */}
              {/* {isLoading ? '로딩...' : '로그인'} */}
              로그인
            </button>
          )}
        </div>
        
        {/* TODO: 계정 잠금 상태 표시 */}
        {/* {isAccountLocked && isAccountLocked() && (
          <div className={styles.lockoutNotice}>
            계정이 잠겼습니다. 잠시 후 다시 시도해주세요.
          </div>
        )} */}
      </div>
    </header>
  )
}