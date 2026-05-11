import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => console.warn('login not implemented'),
  logout: () => console.warn('logout not implemented'),
});

export function useAuth() {
  return useContext(AuthContext);
}
