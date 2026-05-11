import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username, password) => {
    setIsLoading(true)
    try {
      // 실제 앱에서는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (username === 'admin' && password === 'password') {
        setUser({ 
          id: 1, 
          username: 'admin', 
          name: 'Admin User',
          role: 'admin'
        })
        return { success: true }
      } else if (username === 'user' && password === 'password') {
        setUser({ 
          id: 2, 
          username: 'user', 
          name: 'Regular User',
          role: 'user'
        })
        return { success: true }
      } else {
        return { 
          success: false, 
          error: '잘못된 사용자명 또는 비밀번호입니다.' 
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}