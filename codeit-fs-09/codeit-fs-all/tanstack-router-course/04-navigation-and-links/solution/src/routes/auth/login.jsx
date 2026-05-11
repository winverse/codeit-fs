import { createFileRoute, useNavigate, Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

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
    <div className="login-container">
      <h1 className="login-title">로그인</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            사용자명
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            className="form-control"
            placeholder="admin 또는 user"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="form-control"
            placeholder="password"
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-full-width"
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

      <div className="alert alert-info">
        <h4>테스트 계정</h4>
        <p><strong>관리자:</strong> admin / password</p>
        <p><strong>일반 사용자:</strong> user / password</p>
      </div>
    </div>
  )
}
