import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../../contexts/AuthContext'

export const Route = createFileRoute('/auth/')({
  component: () => {
    const { isAuthenticated } = useAuth()
    
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />
    }
    
    return <Navigate to="/auth/login" />
  }
})