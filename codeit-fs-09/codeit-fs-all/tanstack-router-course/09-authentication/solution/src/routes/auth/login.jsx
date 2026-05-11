import { createFileRoute, useNavigate, Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { Breadcrumb } from '../../components/Breadcrumb'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage
})

function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  // 이미 로그인된 경우 대시보드로 리디렉션
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await login(credentials.username, credentials.password)
    
    if (result.success) {
      // 로그인 성공 시 대시보드로 이동
      navigate({ to: '/dashboard' })
    } else {
      setError(result.error)
    }
  }

  const handleInputChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="content-area">
      <div className="container">
        <Breadcrumb />
        
        <div style={{ 
          maxWidth: '400px', 
          margin: '4rem auto',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            로그인
          </h1>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
                사용자명
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="search-input"
                placeholder="admin 또는 user"
                required
                disabled={isLoading}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="search-input"
                placeholder="password"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn"
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          <div className="alert alert-info" style={{ marginTop: '2rem' }}>
            <h4>테스트 계정</h4>
            <p><strong>관리자:</strong> admin / password</p>
            <p><strong>일반 사용자:</strong> user / password</p>
          </div>

          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '6px',
            marginTop: '1.5rem'
          }}>
            <h4>내비게이션 가드 예제</h4>
            <p>
              이 페이지는 <strong>Navigate 컴포넌트</strong>를 사용하여 
              이미 로그인된 사용자를 자동으로 대시보드로 리디렉션합니다.
            </p>
            <p>
              로그인 성공 후에는 <strong>useNavigate 훅</strong>을 사용하여 
              프로그래매틱하게 대시보드로 이동합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}