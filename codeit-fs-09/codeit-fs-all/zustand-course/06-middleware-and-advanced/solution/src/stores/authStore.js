import { createAdvancedStore } from '@/utils/storeFactory'

export const useAuthStore = createAdvancedStore(
  (set, get) => ({
    user: null,
    isAuthenticated: false,
    
    login: (userData) => {
      // 실제로는 API 호출이 있을 것
      const user = {
        ...userData,
        lastLogin: new Date().toISOString(),
        token: `token_${Date.now()}` // 실제로는 서버에서 받음
      }
      
      set({ 
        user, 
        isAuthenticated: true 
      }, false, 'auth/login')

      // 로그인 성공 알림은 외부에서 처리 (순환 의존성 방지)
    },
    
    logout: () => {
      set({ 
        user: null, 
        isAuthenticated: false 
      }, false, 'auth/logout')

      // 로그아웃 알림은 외부에서 처리 (순환 의존성 방지)
    },
    
    updateProfile: (updates) => set(
      (state) => ({ 
        user: { ...state.user, ...updates } 
      }), 
      false, 
      { type: 'auth/updateProfile', payload: updates }
    ),
  }),
  {
    name: 'AuthStore',
    persist: {
      name: 'auth-storage',
      // 민감한 정보는 저장하지 않음
      partialize: (state) => ({ 
        user: state.user ? {
          id: state.user.id,
          name: state.user.name,
          email: state.user.email,
          avatar: state.user.avatar,
          // token은 제외 (보안상 이유)
        } : null,
        isAuthenticated: state.isAuthenticated 
      }),
    },
    devtools: { name: 'auth-store' },
    logger: true,
    performance: true,
  }
)