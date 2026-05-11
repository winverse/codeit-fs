import { useEffect } from 'react'
import { useSettingsStore, useNotificationStore } from '@/stores'
import { Header } from '@/components/Header'
import { SettingsPanel } from '@/components/SettingsPanel'
import { ToastContainer } from '@/components/Toast'
import '@/styles/global.css'

export function App() {
  const theme = useSettingsStore((state) => state.theme)
  const showInfo = useNotificationStore((state) => state.showInfo)

  // 테마 변경 시 body의 data-theme 속성 업데이트
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // 앱 로딩 시 환영 메시지
  useEffect(() => {
    const timer = setTimeout(() => {
      showInfo('미들웨어와 고급 기능 예제에 오신 것을 환영합니다! 🎉')
    }, 1000)

    return () => clearTimeout(timer)
  }, [showInfo])

  return (
    <div className="app">
      <Header />
      
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            background: 'var(--card-bg)', 
            borderRadius: '12px', 
            padding: '2rem',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{ 
              marginBottom: '1rem', 
              color: 'var(--text-color)',
              fontSize: '1.5rem'
            }}>
              🎉 미들웨어 솔루션
            </h2>
            
            <p style={{ 
              marginBottom: '1.5rem', 
              color: 'var(--text-color)', 
              lineHeight: '1.6'
            }}>
              이제 모든 미들웨어가 적용되어 다음 기능들이 작동합니다:
            </p>
            
            <ul style={{ 
              color: 'var(--text-color)', 
              lineHeight: '1.6',
              marginBottom: '2rem' 
            }}>
              <li>✅ <strong>persist</strong>: 새로고침해도 설정이 유지됩니다</li>
              <li>✅ <strong>devtools</strong>: Redux DevTools에서 모든 액션을 추적할 수 있습니다</li>
              <li>✅ <strong>스토어 분리</strong>: 설정, 인증, 알림 스토어가 독립적으로 관리됩니다</li>
              <li>✅ <strong>Toast 알림</strong>: 사용자 액션에 대한 실시간 피드백을 제공합니다</li>
              <li>✅ <strong>스토어 간 통신</strong>: 로그인/로그아웃 시 자동으로 알림이 표시됩니다</li>
            </ul>
            
            <div style={{
              background: '#d4edda',
              color: '#155724',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #c3e6cb'
            }}>
              <strong>🎯 체험해보세요:</strong><br />
              1. 테마나 언어를 변경해보세요 (Toast 알림 확인)<br />
              2. 로그인/로그아웃을 해보세요 (자동 알림 확인)<br />
              3. 브라우저를 새로고침해보세요 (설정 유지 확인)<br />
              4. Redux DevTools을 열어서 액션 추적을 확인해보세요<br />
              5. localStorage를 확인해서 데이터 저장을 확인해보세요
            </div>

            <div style={{
              background: 'var(--code-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem'
            }}>
              <strong>🔧 적용된 미들웨어:</strong><br />
              • <code>persist</code> - localStorage 자동 저장/복원<br />
              • <code>devtools</code> - Redux DevTools 통합<br />
              • <code>multiple stores</code> - 기능별 스토어 분리<br />
              • <code>cross-store communication</code> - 스토어 간 데이터 통신
            </div>
          </div>
          
          <SettingsPanel />
        </div>
      </main>

      <ToastContainer />
      <StoreInspector />
    </div>
  )
}n>

      <ToastContainer />
    </div>
  )
}