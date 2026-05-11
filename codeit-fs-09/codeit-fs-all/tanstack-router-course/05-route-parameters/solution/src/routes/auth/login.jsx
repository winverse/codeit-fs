import { createFileRoute, useNavigate, Navigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Breadcrumb } from '../../components/Breadcrumb'
import styles from './login.module.css'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage
})

function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await login(credentials.username, credentials.password)
    
    if (result.success) {
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
        
        <div className={styles.loginContainer}>
          <h1 className={`page-title ${styles.title}`}>
            로그인
          </h1>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>
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

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
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
              className={`btn ${styles.fullWidth}`}
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

          <div className={`alert alert-info ${styles.infoBox}`}>
            <h4>테스트 계정</h4>
            <p><strong>관리자:</strong> admin / password</p>
            <p><strong>일반 사용자:</strong> user / password</p>
          </div>

          <div className={styles.notes}>
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
