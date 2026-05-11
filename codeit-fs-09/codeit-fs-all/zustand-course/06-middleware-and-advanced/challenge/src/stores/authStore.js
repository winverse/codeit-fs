import { create } from 'zustand'
import { persist, createJSONStorage, devtools } from 'zustand/middleware'

// TODO: 커스텀 미들웨어 import 추가
// import { performanceMiddleware } from '../middleware/performanceMiddleware'
// import { validationMiddleware } from '../middleware/validationMiddleware'
// import { loggerMiddleware } from '../middleware/loggerMiddleware'
// import { broadcastSyncMiddleware } from '../middleware/broadcastSyncMiddleware'

// TODO: 검증 스키마 정의
/*
import { validators } from '../middleware/validationMiddleware'

const authSchema = {
  user: [(value) => {
    if (!value) return true // null은 허용
    return typeof value === 'object' && 
           typeof value.id === 'number' && 
           typeof value.email === 'string' &&
           validators.email(value.email)
  }],
  isAuthenticated: [validators.required],
  isLoading: [validators.required],
  error: [(value) => value === null || typeof value === 'string'],
}
*/

export const useAuthStore = create(
  // TODO: 커스텀 미들웨어 체이닝 추가
  // loggerMiddleware({ prefix: 'Auth Store' })(
  // performanceMiddleware()(
  // validationMiddleware(authSchema)(
  // broadcastSyncMiddleware('auth-channel')(
  devtools(
    persist(
      (set, get) => ({
        // 기본 인증 상태
        user: null,
        isAuthenticated: false,
        
        // TODO: 추가 상태 필드
        // isLoading: false,
        // error: null,
        // token: null,
        // refreshToken: null,
        // tokenExpiry: null,
        // lastActivity: null,
        // sessionTimeout: 30 * 60 * 1000, // 30분
        
        // TODO: 권한 관리
        // role: 'guest',
        // permissions: [],
        
        // TODO: 보안 설정
        // loginAttempts: 0,
        // maxLoginAttempts: 5,
        // lockoutTime: 15 * 60 * 1000, // 15분
        // lastFailedLogin: null,
        
        login: (userData) => {
          // TODO: 로딩 상태 및 에러 처리 추가
          // set({ isLoading: true, error: null })
          
          // 실제로는 API 호출이 있을 것
          const user = {
            ...userData,
            lastLogin: new Date().toISOString(),
            token: `token_${Date.now()}`, // 실제로는 서버에서 받음
            // TODO: 추가 사용자 정보
            // role: userData.role || 'user',
            // permissions: userData.permissions || ['read'],
            // profile: {
            //   preferences: {
            //     theme: 'light',
            //     language: 'ko',
            //     notifications: true
            //   }
            // }
          }
          
          set({ 
            user, 
            isAuthenticated: true,
            // TODO: 추가 상태 업데이트
            // isLoading: false,
            // error: null,
            // token: user.token,
            // tokenExpiry: Date.now() + (60 * 60 * 1000), // 1시간
            // lastActivity: Date.now(),
            // role: user.role,
            // permissions: user.permissions,
            // loginAttempts: 0, // 성공시 초기화
          }, false, 'auth/login')

          // TODO: 로그인 성공 후 작업
          // - 자동 로그아웃 타이머 설정
          // - 분석 이벤트 전송
          // - 다른 스토어 초기화/동기화

          // 로그인 성공 알림은 외부에서 처리 (순환 의존성 방지)
        },
        
        logout: () => {
          set({ 
            user: null, 
            isAuthenticated: false,
            // TODO: 추가 상태 초기화
            // token: null,
            // refreshToken: null,
            // tokenExpiry: null,
            // role: 'guest',
            // permissions: [],
            // error: null,
          }, false, 'auth/logout')

          // TODO: 로그아웃 후 작업
          // - 로컬 스토리지 정리
          // - 자동 로그아웃 타이머 해제
          // - 다른 스토어 초기화

          // 로그아웃 알림은 외부에서 처리 (순환 의존성 방지)
        },
        
        updateProfile: (updates) => set(
          (state) => ({ 
            user: { ...state.user, ...updates } 
          }), 
          false, 
          { type: 'auth/updateProfile', payload: updates }
        ),
        
        // TODO: 고급 인증 액션들
        // refreshToken: async () => {
        //   const state = get()
        //   if (!state.refreshToken) return false
        //   
        //   try {
        //     set({ isLoading: true })
        //     
        //     // API 호출
        //     const response = await refreshTokenAPI(state.refreshToken)
        //     
        //     set({
        //       token: response.token,
        //       refreshToken: response.refreshToken,
        //       tokenExpiry: Date.now() + (60 * 60 * 1000),
        //       lastActivity: Date.now(),
        //       isLoading: false
        //     })
        //     
        //     return true
        //   } catch (error) {
        //     get().logout()
        //     return false
        //   }
        // },
        
        // changePassword: async (oldPassword, newPassword) => {
        //   set({ isLoading: true, error: null })
        //   
        //   try {
        //     await changePasswordAPI(oldPassword, newPassword)
        //     set({ isLoading: false })
        //     return { success: true }
        //   } catch (error) {
        //     set({ error: error.message, isLoading: false })
        //     return { success: false, error: error.message }
        //   }
        // },
        
        // updateActivity: () => set({ lastActivity: Date.now() }),
        
        // clearError: () => set({ error: null }),
        
        // TODO: 계정 잠금 관리
        // handleFailedLogin: () => set((state) => {
        //   const attempts = state.loginAttempts + 1
        //   return {
        //     loginAttempts: attempts,
        //     lastFailedLogin: Date.now(),
        //     error: attempts >= state.maxLoginAttempts 
        //       ? '너무 많은 로그인 시도로 인해 계정이 잠겼습니다.'
        //       : `로그인 실패. ${state.maxLoginAttempts - attempts}회 남음`
        //   }
        // }),
        
        // isAccountLocked: () => {
        //   const state = get()
        //   if (state.loginAttempts < state.maxLoginAttempts) return false
        //   if (!state.lastFailedLogin) return false
        //   return Date.now() - state.lastFailedLogin < state.lockoutTime
        // },
        
        // TODO: 권한 확인 헬퍼
        // hasPermission: (permission) => {
        //   const state = get()
        //   return state.permissions?.includes(permission) || false
        // },
        
        // hasRole: (role) => {
        //   const state = get()
        //   return state.role === role
        // },
        
        // TODO: 세션 관리
        // isTokenExpired: () => {
        //   const state = get()
        //   return state.tokenExpiry ? Date.now() > state.tokenExpiry : true
        // },
        
        // isSessionActive: () => {
        //   const state = get()
        //   if (!state.lastActivity) return false
        //   return Date.now() - state.lastActivity < state.sessionTimeout
        // },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        
        // 민감한 정보는 저장하지 않음
        partialize: (state) => ({ 
          user: state.user ? {
            id: state.user.id,
            name: state.user.name,
            email: state.user.email,
            avatar: state.user.avatar,
            lastLogin: state.user.lastLogin,
            // token은 제외 (보안상 이유)
            // TODO: 추가 저장 필드
            // role: state.user.role,
            // profile: state.user.profile,
          } : null,
          isAuthenticated: state.isAuthenticated,
          // TODO: 추가 저장 상태 (보안 고려)
          // role: state.role,
          // permissions: state.permissions, // 권한은 민감할 수 있음
        }),
        
        // TODO: 버전 관리
        // version: 1,
        // migrate: (persistedState, version) => {
        //   if (version === 0) {
        //     return {
        //       ...persistedState,
        //       role: 'user',
        //       permissions: ['read'],
        //     }
        //   }
        //   return persistedState
        // },
        
        // TODO: 보안 강화 - 복원 시 검증
        // onRehydrateStorage: () => (state, error) => {
        //   if (error) {
        //     console.error('인증 상태 복원 실패:', error)
        //     return
        //   }
        //   
        //   if (state?.isAuthenticated) {
        //     // 저장된 로그인 상태 검증
        //     if (!state.user || !state.user.id) {
        //       // 비정상적인 상태면 로그아웃
        //       return {
        //         ...state,
        //         user: null,
        //         isAuthenticated: false,
        //       }
        //     }
        //   }
        // },
      }
    ),
    { 
      name: 'auth-store',
      // TODO: DevTools 옵션
      // serialize: {
      //   options: {
      //     undefined: true,
      //   }
      // }
    }
  )
  // ) // broadcastSyncMiddleware 닫기
  // ) // validationMiddleware 닫기
  // ) // performanceMiddleware 닫기  
  // ) // loggerMiddleware 닫기
)