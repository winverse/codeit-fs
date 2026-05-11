import { createAdvancedStore } from '@/utils/storeFactory'

export const useSettingsStore = createAdvancedStore(
  (set) => ({
    // 테마 설정
    theme: 'light',
    
    // 언어 설정
    language: 'ko',
    
    // 알림 설정
    notifications: true,
    
    // 사운드 설정
    soundEnabled: true,
    
    // 액션들 (DevTools에서 추적됨)
    setTheme: (theme) => {
      set({ theme }, false, 'settings/setTheme')
    },
    
    setLanguage: (language) => {
      set({ language }, false, 'settings/setLanguage')
    },
    
    toggleNotifications: () => set(
      (state) => ({ notifications: !state.notifications }), 
      false, 
      'settings/toggleNotifications'
    ),
    
    toggleSound: () => set(
      (state) => ({ soundEnabled: !state.soundEnabled }), 
      false, 
      'settings/toggleSound'
    ),
    
    // 모든 설정 초기화
    resetSettings: () => {
      set({
        theme: 'light',
        language: 'ko',
        notifications: true,
        soundEnabled: true,
      }, false, 'settings/reset')
    }
  }),
  {
    name: 'SettingsStore',
    persist: {
      name: 'user-settings',
      // 상태 복원 시 콜백
      onRehydrateStorage: () => {
        console.log('🔄 설정 복원 중...')
        return (state, error) => {
          if (error) {
            console.error('❌ 설정 복원 실패:', error)
          } else {
            console.log('✅ 설정 복원 완료:', state)
          }
        }
      },
    },
    devtools: { name: 'settings-store' },
    logger: true,
    performance: true,
  }
)