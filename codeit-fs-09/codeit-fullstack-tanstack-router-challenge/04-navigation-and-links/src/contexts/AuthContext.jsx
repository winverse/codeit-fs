import { createContext, useContext } from 'react';

// TODO: Provider를 보고 기본 값으로 채우세요
export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
