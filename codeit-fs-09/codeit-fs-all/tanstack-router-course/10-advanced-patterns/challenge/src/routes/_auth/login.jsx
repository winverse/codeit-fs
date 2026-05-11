import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/_auth/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 이미 로그인된 사용자는 대시보드로 리디렉션
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const newErrors = {};
      if (!formData.email) newErrors.email = "이메일을 입력해주세요";
      if (!formData.password) newErrors.password = "비밀번호를 입력해주세요";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const result = await login(formData.email, formData.password);

      if (!result.success) {
        setErrors({ general: result.error });
        setIsLoading(false);
      }
    } catch (error) {
      setErrors({ general: "로그인 중 오류가 발생했습니다." });
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const fillDemoCredentials = (type) => {
    if (type === "user") {
      setFormData({
        email: "user@taskflow.com",
        password: "demo123",
        remember: false,
      });
    } else if (type === "admin") {
      setFormData({
        email: "admin@taskflow.com",
        password: "admin123",
        remember: false,
      });
    }
    setErrors({});
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h1>로그인</h1>
        <p>TaskFlow 계정으로 로그인하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
            placeholder="your@company.com"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? "error" : ""}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleInputChange}
            />
            <span className="checkmark"></span>
            로그인 상태 유지
          </label>
          <Link to="/auth/forgot-password" className="forgot-link">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="demo-section">
        <h3>데모 계정으로 빠른 체험</h3>
        <div className="demo-buttons">
          <button
            type="button"
            onClick={() => fillDemoCredentials("user")}
            className="btn btn-outline btn-small"
          >
            👤 일반 사용자
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials("admin")}
            className="btn btn-outline btn-small"
          >
            👑 프로젝트 매니저
          </button>
        </div>
      </div>

      <div className="auth-footer">
        <p>
          계정이 없으신가요?{" "}
          <Link to="/auth/register" className="auth-link">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
