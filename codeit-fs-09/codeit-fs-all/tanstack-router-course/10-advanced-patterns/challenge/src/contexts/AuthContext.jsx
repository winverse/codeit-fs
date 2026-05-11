import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

const AuthContext = createContext(null);

// 데모용 사용자 데이터
const DEMO_USERS = {
  "user@taskflow.com": {
    id: 1,
    name: "김개발자",
    email: "user@taskflow.com",
    password: "demo123",
    role: "developer",
    company: "TechCorp",
    avatar: "👨‍💻",
    joinedAt: "2023년 3월",
    permissions: ["projects.read", "tasks.create", "tasks.update"],
  },
  "admin@taskflow.com": {
    id: 2,
    name: "박매니저",
    email: "admin@taskflow.com",
    password: "admin123",
    role: "pm",
    company: "TechCorp",
    avatar: "👩‍💼",
    joinedAt: "2022년 12월",
    permissions: ["*"], // 모든 권한
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("taskflow_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // 로딩 시뮬레이션

      const demoUser = DEMO_USERS[email];
      if (!demoUser || demoUser.password !== password) {
        return {
          success: false,
          error: "이메일 또는 비밀번호가 올바르지 않습니다.",
        };
      }

      const { password: _, ...userInfo } = demoUser;
      setUser(userInfo);
      localStorage.setItem("taskflow_user", JSON.stringify(userInfo));

      navigate({ to: "/dashboard" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "로그인 중 오류가 발생했습니다.",
      };
    }
  };

  const register = async (userData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (DEMO_USERS[userData.email]) {
        return {
          success: false,
          error: "이미 사용 중인 이메일입니다.",
        };
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        company: userData.company,
        avatar: getRandomAvatar(userData.role),
        joinedAt: new Date().toLocaleDateString("ko-KR"),
        permissions: getRolePermissions(userData.role),
      };

      setUser(newUser);
      localStorage.setItem("taskflow_user", JSON.stringify(newUser));

      navigate({ to: "/dashboard" });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "회원가입 중 오류가 발생했습니다.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskflow_user");
    navigate({ to: "/" });
  };

  const updateProfile = async (profileData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedUser = {
        ...user,
        ...profileData,
      };

      setUser(updatedUser);
      localStorage.setItem("taskflow_user", JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "프로필 업데이트 중 오류가 발생했습니다.",
      };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions.includes("*")) return true;
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 유틸리티 함수들
function getRandomAvatar(role) {
  const avatars = {
    developer: ["👨‍💻", "👩‍💻", "🧑‍💻"],
    designer: ["👨‍🎨", "👩‍🎨", "🧑‍🎨"],
    pm: ["👨‍💼", "👩‍💼", "🧑‍💼"],
    po: ["👨‍💼", "👩‍💼", "🧑‍💼"],
    qa: ["👨‍🔬", "👩‍🔬", "🧑‍🔬"],
    other: ["👤", "👥", "🙋‍♂️", "🙋‍♀️"],
  };

  const roleAvatars = avatars[role] || avatars.other;
  return roleAvatars[Math.floor(Math.random() * roleAvatars.length)];
}

function getRolePermissions(role) {
  const permissions = {
    developer: ["projects.read", "tasks.create", "tasks.update", "tasks.read"],
    designer: [
      "projects.read",
      "tasks.create",
      "tasks.update",
      "tasks.read",
      "files.upload",
    ],
    pm: ["*"], // 프로젝트 매니저는 모든 권한
    po: ["projects.*", "tasks.*", "reports.read"],
    qa: ["projects.read", "tasks.read", "tasks.update", "bugs.create"],
    other: ["projects.read", "tasks.read"],
  };

  return permissions[role] || permissions.other;
}
