import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: "/profile",
        },
      });
    }
  },
  component: ProfileComponent,
});

function ProfileComponent() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // 폼 유효성 검사
      const newErrors = validateForm(formData);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // 프로필 업데이트
      const result = await updateProfile(formData);

      if (result.success) {
        setSuccessMessage("프로필이 성공적으로 업데이트되었습니다.");
        setIsEditing(false);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: "프로필 업데이트 중 오류가 발생했습니다." });
    } finally {
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

    if (data.website && !/^https?:\/\/.+/.test(data.website)) {
      errors.website =
        "올바른 웹사이트 URL을 입력해주세요 (http:// 또는 https://)";
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

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
    });
    setErrors({});
    setSuccessMessage("");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="btn btn-outline btn-small">
              프로필 사진 변경
            </button>
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            {user.role === "admin" && (
              <span className="role-badge admin">관리자</span>
            )}
          </div>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>기본 정보</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline"
                >
                  편집
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    onClick={handleCancel}
                    className="btn btn-secondary btn-small"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary btn-small"
                    disabled={isLoading}
                  >
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                </div>
              )}
            </div>

            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "error" : ""}
                    />
                  ) : (
                    <div className="form-display">
                      {formData.name || "설정되지 않음"}
                    </div>
                  )}
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "error" : ""}
                    />
                  ) : (
                    <div className="form-display">
                      {formData.email || "설정되지 않음"}
                    </div>
                  )}
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">자기소개</label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="자신에 대해 간단히 소개해주세요..."
                  />
                ) : (
                  <div className="form-display bio">
                    {formData.bio || "자기소개가 설정되지 않았습니다."}
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">위치</label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="서울, 대한민국"
                    />
                  ) : (
                    <div className="form-display">
                      {formData.location || "설정되지 않음"}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="website">웹사이트</label>
                  {isEditing ? (
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className={errors.website ? "error" : ""}
                      placeholder="https://yourwebsite.com"
                    />
                  ) : (
                    <div className="form-display">
                      {formData.website ? (
                        <a
                          href={formData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-link"
                        >
                          {formData.website}
                        </a>
                      ) : (
                        "설정되지 않음"
                      )}
                    </div>
                  )}
                  {errors.website && (
                    <span className="field-error">{errors.website}</span>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="profile-section">
            <h2>계정 정보</h2>
            <div className="account-info">
              <div className="info-item">
                <span className="info-label">계정 등급:</span>
                <span className="info-value">
                  {user.role === "admin" ? "관리자" : "일반 사용자"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">가입일:</span>
                <span className="info-value">
                  {user.createdAt || "2024년 1월"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">마지막 로그인:</span>
                <span className="info-value">
                  {user.lastLogin || "방금 전"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
