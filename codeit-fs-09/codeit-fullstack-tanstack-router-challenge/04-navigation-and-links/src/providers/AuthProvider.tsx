import { AuthContext } from '@/contexts/AuthContext';
import { useState } from 'react';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 로그아웃 상태

  const login = () => {
    // TODO: 'user' state를 간단한 사용자 객체로 설정하세요. 예: { name: 'Student' }
    setUser({ name: 'Student' });
  };

  const logout = () => {
    // TODO: 'user' state를 null로 설정하여 로그아웃 상태를 만드세요.
    setUser(null);
  };

  // isAuthenticated를 'user' 객체의 존재 여부로 계산하세요.
  const isAuthenticated = !!user; // TODO: 이 부분을 수정하세요.

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
