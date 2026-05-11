import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const { user, register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      // 폼 유효성 검사
      const newErrors = validateForm(formData);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // 회원가입 시도
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setErrors({ general: result.error });
        setIsLoading(false);
      }
    } catch (error) {
      setErrors({ general: "회원가입 중 오류가 발생했습니다." });
      setIsLoading(false);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "이름을 입력해주세요";
    } else if (data.name.length < 2) {
      errors.name = "이름은 2글자 이상이어야 합니다";
    }

    if (!data.email) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!data.password) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (data.password.length < 6) {
      errors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>회원가입</h1>
          <p>UserDash에 가입하여 모든 기능을 이용해보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
              placeholder="홍길동"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error" : ""}
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
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
              placeholder="6자 이상의 비밀번호"
            />
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? "error" : ""}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <div className="form-tips">
          <h3>회원가입 혜택</h3>
          <ul>
            <li>개인화된 대시보드 이용</li>
            <li>활동 내역 및 통계 확인</li>
            <li>프로필 및 설정 관리</li>
            <li>보안된 데이터 저장</li>
          </ul>
        </div>

        <div className="auth-footer">
          <p>
            이미 계정이 있으신가요?{" "}
            <a href="/login" className="auth-link">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
