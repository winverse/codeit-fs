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

const settingsSchema = {
  theme: [validators.required],
  language: [validators.required],
  notifications: [validators.required],
  soundEnabled: [validators.required],
  fontSize: [validators.numberRange(12, 24)],
  autoSave: [validators.required],
}
*/

export const useSettingsStore = create(
  // TODO: 커스텀 미들웨어 체이닝 추가
  // loggerMiddleware({ prefix: 'Settings Store' })(
  // performanceMiddleware()(
  // validationMiddleware(settingsSchema)(
  // broadcastSyncMiddleware('settings-channel')(
  devtools(
    persist(
      (set, get) => ({
        // 기본 테마 설정
        theme: 'light',
        
        // 언어 설정
        language: 'ko',
        
        // 알림 설정
        notifications: true,
        
        // 사운드 설정
        soundEnabled: true,
        
        // TODO: 고급 설정 추가
        // fontSize: 16,
        // autoSave: true,
        // showAnimations: true,
        // compactMode: false,
        // highContrast: false,
        
        // TODO: 중첩 객체 설정 (복잡한 상태 관리)
        // uiPreferences: {
        //   sidebar: {
        //     collapsed: false,
        //     width: 240,
        //     position: 'left'
        //   },
        //   toolbar: {
        //     visible: true,
        //     compact: false,
        //     customButtons: []
        //   }
        // },
        
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
        
        // TODO: 고급 액션들 추가
        // setFontSize: (fontSize) => {
        //   // 범위 검증 로직
        //   if (fontSize >= 12 && fontSize <= 24) {
        //     set({ fontSize }, false, 'settings/setFontSize')
        //   }
        // },
        
        // updateUIPreference: (path, value) => set(
        //   (state) => {
        //     const newPrefs = { ...state.uiPreferences }
        //     // 중첩 객체 업데이트 로직
        //     const keys = path.split('.')
        //     let current = newPrefs
        //     for (let i = 0; i < keys.length - 1; i++) {
        //       current[keys[i]] = { ...current[keys[i]] }
        //       current = current[keys[i]]
        //     }
        //     current[keys[keys.length - 1]] = value
        //     return { uiPreferences: newPrefs }
        //   },
        //   false,
        //   'settings/updateUIPreference'
        // ),
        
        // 모든 설정 초기화
        resetSettings: () => {
          set({
            theme: 'light',
            language: 'ko',
            notifications: true,
            soundEnabled: true,
            // TODO: 추가 설정들도 초기화
            // fontSize: 16,
            // autoSave: true,
            // showAnimations: true,
            // compactMode: false,
            // highContrast: false,
          }, false, 'settings/reset')
        },
        
        // TODO: 설정 내보내기/가져오기 기능
        // exportSettings: () => {
        //   const state = get()
        //   const exportData = {
        //     version: 1,
        //     timestamp: Date.now(),
        //     settings: {
        //       theme: state.theme,
        //       language: state.language,
        //       notifications: state.notifications,
        //       soundEnabled: state.soundEnabled,
        //       // 추가 설정들
        //     }
        //   }
        //   return JSON.stringify(exportData, null, 2)
        // },
        
        // importSettings: (settingsJson) => {
        //   try {
        //     const data = JSON.parse(settingsJson)
        //     if (data.version === 1 && data.settings) {
        //       set(data.settings, false, 'settings/import')
        //       return { success: true, message: '설정을 성공적으로 가져왔습니다.' }
        //     }
        //     return { success: false, message: '잘못된 설정 파일입니다.' }
        //   } catch (error) {
        //     return { success: false, message: `설정 가져오기 실패: ${error.message}` }
        //   }
        // },
      }),
      {
        name: 'user-settings',
        storage: createJSONStorage(() => localStorage),
        
        // TODO: 선택적 저장 로직 개선
        // partialize: (state) => ({
        //   theme: state.theme,
        //   language: state.language,
        //   notifications: state.notifications,
        //   soundEnabled: state.soundEnabled,
        //   fontSize: state.fontSize,
        //   autoSave: state.autoSave,
        //   // uiPreferences는 제외 (너무 클 수 있음)
        // }),
        
        // TODO: 버전 관리 및 마이그레이션
        // version: 2,
        // migrate: (persistedState, version) => {
        //   if (version === 1) {
        //     // v1에서 v2로 마이그레이션
        //     return {
        //       ...persistedState,
        //       fontSize: persistedState.fontSize || 16,
        //       autoSave: persistedState.autoSave ?? true,
        //     }
        //   }
        //   return persistedState
        // },
        
        // 상태 복원 시 콜백
        onRehydrateStorage: () => {
          console.log('🔄 설정 복원 중...')
          return (state, error) => {
            if (error) {
              console.error('❌ 설정 복원 실패:', error)
            } else {
              console.log('✅ 설정 복원 완료:', state)
              // TODO: 복원 후 추가 작업
              // - 테마 적용
              // - 언어 설정 적용
              // - 다른 스토어와 동기화
            }
          }
        },
        
        // TODO: 저장 전/후 훅 추가
        // onRehydrateStorage: (state) => {
        //   // 저장 전 검증 로직
        //   console.log('💾 설정 저장 중...', state)
        //   return state
        // },
      }
    ),
    { 
      name: 'settings-store',
      // TODO: DevTools 옵션 확장
      // serialize: {
      //   options: {
      //     undefined: true,
      //     function: false,
      //   }
      // }
    }
  )
  // ) // broadcastSyncMiddleware 닫기
  // ) // validationMiddleware 닫기
  // ) // performanceMiddleware 닫기  
  // ) // loggerMiddleware 닫기
)