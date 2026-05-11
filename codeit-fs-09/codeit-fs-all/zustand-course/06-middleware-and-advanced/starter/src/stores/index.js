import { create } from 'zustand'

// TODO: persist 미들웨어 적용 필요
// TODO: devtools 미들웨어 적용 필요
// 문제점: 새로고침 시 설정이 초기화됨
export const useSettingsStore = create((set) => ({
  // 테마 설정
  theme: 'light',
  
  // 언어 설정
  language: 'ko',
  
  // 알림 설정
  notifications: true,
  
  // 사운드 설정
  soundEnabled: true,
  
  // 액션들 (DevTools에서 추적되지 않음)
  setTheme: (theme) => {
    console.log('테마 변경:', theme) // 임시 로그
    set({ theme })
  },
  
  setLanguage: (language) => {
    console.log('언어 변경:', language) // 임시 로그
    set({ language })
  },
  
  toggleNotifications: () => set((state) => ({ 
    notifications: !state.notifications 
  })),
  
  toggleSound: () => set((state) => ({ 
    soundEnabled: !state.soundEnabled 
  })),
  
  // 모든 설정 초기화
  resetSettings: () => {
    console.log('설정 초기화')
    set({
      theme: 'light',
      language: 'ko',
      notifications: true,
      soundEnabled: true,
    })
  }
}))

// TODO: 사용자 정보를 위한 별도 스토어 필요
// 현재는 모든 상태가 하나의 스토어에 섞여있음 (안티패턴)
export const useUserStore = create((set) => ({
  user: null,
  
  // TODO: 실제 로그인 로직에서는 persist 필요
  login: (userData) => {
    console.log('로그인:', userData) // 임시 로그
    set({ user: userData })
  },
  
  logout: () => {
    console.log('로그아웃') // 임시 로그
    set({ user: null })
  }
}))

// TODO: 알림 시스템을 위한 별도 스토어 필요
// 현재는 console.log로만 처리 중 (임시)