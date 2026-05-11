import { useSettingsStore } from '@/stores'
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

  return (
    <div className={styles.panel}>
      <h2>설정</h2>
      
      <div className={styles.warning}>
        ⚠️ 문제점: 새로고침하면 모든 설정이 초기화됩니다!
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
              onChange={(e) => setTheme(e.target.value)}
            />
            ☀️ 라이트 모드
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.target.value)}
            />
            🌙 다크 모드
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3>언어</h3>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
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
            💡 Redux DevTools를 열어보세요 - 아직 연결되지 않았습니다!
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          onClick={resetSettings}
          className={styles.resetButton}
        >
          설정 초기화
        </button>
      </div>
    </div>
  )
}