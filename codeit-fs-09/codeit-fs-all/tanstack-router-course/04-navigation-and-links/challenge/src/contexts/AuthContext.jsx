import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = () => {
    // TODO: 'user' state를 간단한 사용자 객체로 설정하세요. 예: { name: 'Student' }
  };

  const logout = () => {
    // TODO: 'user' state를 null로 설정하여 로그아웃 상태를 만드세요.
  };

  // isAuthenticated를 'user' 객체의 존재 여부로 계산하세요.
  const isAuthenticated = false; // TODO: 이 부분을 수정하세요.

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}