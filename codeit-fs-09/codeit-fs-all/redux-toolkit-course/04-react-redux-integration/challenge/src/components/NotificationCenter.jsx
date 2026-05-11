// TODO: 필요한 훅들 import하기
// import { useAppSelector, useAppDispatch } from '@/hooks/hooks.js'
// import { selectAllNotifications, selectUnreadCount, markAsRead, removeNotification, clearAllNotifications } from '../features/notifications/notificationsSlice.js'

import styles from './NotificationCenter.module.css'

export function NotificationCenter() {
  // TODO: Redux 상태와 디스패치 함수 가져오기
  // const notifications = useAppSelector(selectAllNotifications)
  // const unreadCount = useAppSelector(selectUnreadCount)
  // const dispatch = useAppDispatch()
  
  // 임시 데이터 (TODO 완료 후 제거)
  const notifications = []
  const unreadCount = 0
  
  const handleMarkAsRead = (notificationId) => {
    // TODO: markAsRead 액션 디스패치
    console.log('TODO: 알림 읽음 처리', notificationId)
  }
  
  const handleRemove = (notificationId) => {
    // TODO: removeNotification 액션 디스패치  
    console.log('TODO: 알림 제거', notificationId)
  }
  
  const handleClearAll = () => {
    // TODO: clearAllNotifications 액션 디스패치
    console.log('TODO: 모든 알림 제거')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>알림 센터</h2>
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
        
        {notifications.length > 0 && (
          <button onClick={handleClearAll} className={styles.clearAllButton}>
            모두 지우기
          </button>
        )}
      </div>
      
      {notifications.length === 0 ? (
        <div className={styles.empty}>
          <p>🔔 새로운 알림이 없습니다</p>
          <p className={styles.todoNote}>
            ⚠️ Redux 연결 후 알림 기능이 작동합니다
          </p>
        </div>
      ) : (
        <div className={styles.notifications}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notification} ${notification.read ? styles.read : styles.unread}`}
            >
              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <span className={`${styles.type} ${styles[notification.type]}`}>
                    {notification.type === 'success' && '✅'}
                    {notification.type === 'warning' && '⚠️'}  
                    {notification.type === 'error' && '❌'}
                    {notification.type === 'info' && 'ℹ️'}
                  </span>
                  <h4>{notification.title}</h4>
                  <span className={styles.timestamp}>
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                <p className={styles.message}>{notification.message}</p>
              </div>
              
              <div className={styles.actions}>
                {!notification.read && (
                  <button 
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={styles.markReadButton}
                  >
                    읽음
                  </button>
                )}
                <button 
                  onClick={() => handleRemove(notification.id)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}