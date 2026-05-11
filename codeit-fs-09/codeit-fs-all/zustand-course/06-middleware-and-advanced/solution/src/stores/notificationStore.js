import { createAdvancedStore } from '@/utils/storeFactory'

export const useNotificationStore = createAdvancedStore(
  (set, get) => ({
    notifications: [],
    
    addNotification: (notification) => {
      const id = Date.now()
      const newNotification = { 
        id, 
        type: 'info', 
        duration: 5000,
        ...notification 
      }
      
      set((state) => ({
        notifications: [...state.notifications, newNotification]
      }), false, { 
        type: 'notifications/add', 
        payload: newNotification 
      })

      // 자동 제거 (duration 후)
      if (newNotification.duration > 0) {
        setTimeout(() => {
          get().removeNotification(id)
        }, newNotification.duration)
      }
    },
    
    removeNotification: (id) => set(
      (state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }), 
      false, 
      { type: 'notifications/remove', payload: { id } }
    ),
    
    clearAllNotifications: () => set(
      { notifications: [] }, 
      false, 
      'notifications/clearAll'
    ),

    // 타입별 편의 메서드들
    showSuccess: (message, options = {}) => get().addNotification({
      type: 'success',
      message,
      ...options
    }),

    showError: (message, options = {}) => get().addNotification({
      type: 'error',
      message,
      duration: 8000, // 에러는 더 오래 표시
      ...options
    }),

    showInfo: (message, options = {}) => get().addNotification({
      type: 'info',
      message,
      ...options
    }),

    showWarning: (message, options = {}) => get().addNotification({
      type: 'warning',
      message,
      duration: 7000,
      ...options
    }),
  }),
  {
    name: 'NotificationStore',
    devtools: { name: 'notification-store' },
    logger: { collapsed: false }, // 알림은 자세히 로깅
    performance: true,
  }
)