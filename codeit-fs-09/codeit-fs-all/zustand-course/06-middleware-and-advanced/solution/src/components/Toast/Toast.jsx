import { useNotificationStore } from '@/stores'
import styles from './Toast.module.css'

const ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
}

export function Toast({ notification }) {
  const removeNotification = useNotificationStore((state) => state.removeNotification)

  function handleClose() {
    removeNotification(notification.id)
  }

  return (
    <div className={`${styles.toast} ${styles[notification.type]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>
          {ICONS[notification.type]}
        </span>
        <span className={styles.message}>
          {notification.message}
        </span>
      </div>
      
      <button 
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="알림 닫기"
      >
        ✕
      </button>
    </div>
  )
}