import { useEffect } from 'react'
import { useSettingsStore } from '@/stores'
import { Header } from '@/components/Header'
import { SettingsPanel } from '@/components/SettingsPanel'
import '@/styles/global.css'

export function App() {
  const theme = useSettingsStore((state) => state.theme)

  // 테마 변경 시 body의 data-theme 속성 업데이트
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

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
              미들웨어 시작하기
            </h2>
            
            <p style={{ 
              marginBottom: '1.5rem', 
              color: 'var(--text-color)', 
              lineHeight: '1.6'
            }}>
              현재 상태에서는 다음과 같은 문제점들이 있습니다:
            </p>
            
            <ul style={{ 
              color: 'var(--text-color)', 
              lineHeight: '1.6',
              marginBottom: '2rem' 
            }}>
              <li>새로고침 시 모든 설정이 초기화됨 (persist 미들웨어 필요)</li>
              <li>Redux DevTools에서 상태 추적 불가능 (devtools 미들웨어 필요)</li>
              <li>상태 변경에 대한 명확한 액션명 없음</li>
              <li>여러 스토어가 분리되지 않아 관리가 어려움</li>
              <li>개발 중 디버깅 정보가 부족함</li>
            </ul>
            
            <div style={{
              background: '#e7f3ff',
              color: '#0066cc',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <strong>💡 실습 가이드:</strong><br />
              1. 설정을 변경해보세요<br />
              2. 브라우저를 새로고침해보세요<br />
              3. Redux DevTools 확장 프로그램을 열어보세요<br />
              4. 변경사항이 어떻게 추적되지 않는지 확인하세요
            </div>
          </div>
          
          <SettingsPanel />
        </div>
      </main>
    </div>
  )
}