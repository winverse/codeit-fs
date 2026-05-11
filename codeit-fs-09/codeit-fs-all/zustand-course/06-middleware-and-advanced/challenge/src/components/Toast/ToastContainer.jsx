import { useNotificationStore } from '@/stores'
import { Toast } from './Toast'
import styles from './ToastContainer.module.css'

export function ToastContainer() {
  const notifications = useNotificationStore((state) => state.notifications)

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Toast 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  )
}