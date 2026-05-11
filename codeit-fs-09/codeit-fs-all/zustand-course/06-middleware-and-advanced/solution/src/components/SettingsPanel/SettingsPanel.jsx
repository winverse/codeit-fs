import { useSettingsStore, useNotificationStore } from '@/stores'
import styles from './SettingsPanel.module.css'

export function SettingsPanel() {
  const {
    theme,
    language,
    notifications,
    soundEnabled,
    setTheme,
    setLanguage,
    toggleNotifications,
    toggleSound,
    resetSettings
  } = useSettingsStore()

  const showSuccess = useNotificationStore((state) => state.showSuccess)

  function handleThemeChange(newTheme) {
    setTheme(newTheme)
    showSuccess(`테마가 ${newTheme === 'light' ? '라이트' : '다크'} 모드로 변경되었습니다!`)
  }

  function handleLanguageChange(newLanguage) {
    setLanguage(newLanguage)
    const languageNames = {
      ko: '한국어',
      en: 'English', 
      ja: '日本語',
      zh: '中文'
    }
    showSuccess(`언어가 ${languageNames[newLanguage]}로 변경되었습니다!`)
  }

  function handleReset() {
    resetSettings()
    showSuccess('모든 설정이 초기값으로 리셋되었습니다!')
  }

  return (
    <div className={styles.panel}>
      <h2>설정</h2>
      
      <div className={styles.success}>
        ✅ 해결됨: 이제 새로고침해도 설정이 유지됩니다! (persist 미들웨어 적용)
      </div>
      
      <div className={styles.section}>
        <h3>테마</h3>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={(e) => handleThemeChange(e.target.value)}
            />
            ☀️ 라이트 모드
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={(e) => handleThemeChange(e.target.value)}
            />
            🌙 다크 모드
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3>언어</h3>
        <select 
          value={language} 
          onChange={(e) => handleLanguageChange(e.target.value)}
          className={styles.select}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
          <option value="zh">中文</option>
        </select>
      </div>

      <div className={styles.section}>
        <h3>알림 설정</h3>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
          />
          푸시 알림 받기
        </label>
        
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={toggleSound}
          />
          사운드 효과
        </label>
      </div>

      <div className={styles.section}>
        <h3>디버깅 정보</h3>
        <div className={styles.debugInfo}>
          <p>현재 테마: <code>{theme}</code></p>
          <p>언어: <code>{language}</code></p>
          <p>알림: <code>{notifications ? 'ON' : 'OFF'}</code></p>
          <p>사운드: <code>{soundEnabled ? 'ON' : 'OFF'}</code></p>
          
          <div className={styles.devtools}>
            🎉 Redux DevTools를 열어보세요 - 이제 모든 액션이 추적됩니다!
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={handleReset}
          className={styles.resetButton}
        >
          설정 초기화
        </button>
      </div>
    </div>
  )
}