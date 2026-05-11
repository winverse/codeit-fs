import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const { user, register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "",
    acceptTerms: false,
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
      const newErrors = validateForm(formData);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      const result = await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        role: formData.role,
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

    if (!data.firstName.trim()) {
      errors.firstName = "이름을 입력해주세요";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "성을 입력해주세요";
    }

    if (!data.email) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!data.password) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (data.password.length < 8) {
      errors.password = "비밀번호는 8자 이상이어야 합니다";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (!data.company.trim()) {
      errors.company = "회사명을 입력해주세요";
    }

    if (!data.role) {
      errors.role = "역할을 선택해주세요";
    }

    if (!data.acceptTerms) {
      errors.acceptTerms = "이용약관에 동의해주세요";
    }

    return errors;
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

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h1>회원가입</h1>
        <p>TaskFlow에 가입하여 팀 협업을 시작하세요</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">이름</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? "error" : ""}
              placeholder="길동"
            />
            {errors.firstName && (
              <span className="field-error">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">성</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? "error" : ""}
              placeholder="홍"
            />
            {errors.lastName && (
              <span className="field-error">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">회사 이메일</label>
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

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="company">회사명</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={errors.company ? "error" : ""}
              placeholder="회사명을 입력하세요"
            />
            {errors.company && (
              <span className="field-error">{errors.company}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">역할</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={errors.role ? "error" : ""}
            >
              <option value="">역할을 선택하세요</option>
              <option value="developer">개발자</option>
              <option value="designer">디자이너</option>
              <option value="pm">프로젝트 매니저</option>
              <option value="po">프로덕트 오너</option>
              <option value="qa">QA 엔지니어</option>
              <option value="other">기타</option>
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>
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
            placeholder="8자 이상의 안전한 비밀번호"
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

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
            />
            <span className="checkmark"></span>
            <span>
              <Link to="/terms" className="terms-link">
                이용약관
              </Link>{" "}
              및{" "}
              <Link to="/privacy" className="terms-link">
                개인정보처리방침
              </Link>
              에 동의합니다
            </span>
          </label>
          {errors.acceptTerms && (
            <span className="field-error">{errors.acceptTerms}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={isLoading}
        >
          {isLoading ? "계정 생성 중..." : "계정 만들기"}
        </button>
      </form>

      <div className="signup-benefits">
        <h3>TaskFlow 시작하기</h3>
        <ul>
          <li>✅ 무제한 프로젝트 및 작업</li>
          <li>✅ 팀원 최대 10명까지 무료</li>
          <li>✅ 기본 통합 기능</li>
          <li>✅ 모바일 앱 지원</li>
          <li>✅ 24/7 고객 지원</li>
        </ul>
      </div>

      <div className="auth-footer">
        <p>
          이미 계정이 있으신가요?{" "}
          <Link to="/auth/login" className="auth-link">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
