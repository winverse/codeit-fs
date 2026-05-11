import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute("/settings")({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: "/settings",
        },
      });
    }
  },
  component: SettingsComponent,
});

function SettingsComponent() {
  const { user, updatePassword, deleteAccount } = useAuth();
  const [activeTab, setActiveTab] = useState("security");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: user.preferences?.emailNotifications ?? true,
    pushNotifications: user.preferences?.pushNotifications ?? false,
    darkMode: user.preferences?.darkMode ?? false,
    language: user.preferences?.language ?? "ko",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // 폼 유효성 검사
      const newErrors = validatePasswordForm(passwordForm);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsLoading(false);
        return;
      }

      // 비밀번호 변경
      const result = await updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      if (result.success) {
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setErrors({ password: result.error });
      }
    } catch (error) {
      setErrors({ password: "비밀번호 변경 중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePasswordForm = (data) => {
    const errors = {};

    if (!data.currentPassword) {
      errors.currentPassword = "현재 비밀번호를 입력해주세요";
    }

    if (!data.newPassword) {
      errors.newPassword = "새 비밀번호를 입력해주세요";
    } else if (data.newPassword.length < 6) {
      errors.newPassword = "비밀번호는 6자 이상이어야 합니다";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "새 비밀번호 확인을 입력해주세요";
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "새 비밀번호가 일치하지 않습니다";
    }

    if (data.currentPassword === data.newPassword) {
      errors.newPassword = "새 비밀번호는 현재 비밀번호와 달라야 합니다";
    }

    return errors;
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      const result = await deleteAccount();
      if (!result.success) {
        setErrors({ general: result.error });
      }
    }
  };

  const tabs = [
    { id: "security", label: "보안", icon: "🔐" },
    { id: "notifications", label: "알림", icon: "🔔" },
    { id: "preferences", label: "환경설정", icon: "⚙️" },
    { id: "danger", label: "위험 구역", icon: "⚠️" },
  ];

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>설정</h1>
          <p>계정 설정과 환경 설정을 관리하세요</p>
        </div>

        <div className="settings-content">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="settings-main">
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            {/* 보안 설정 */}
            {activeTab === "security" && (
              <div className="settings-section">
                <h2>보안 설정</h2>

                <div className="setting-group">
                  <h3>비밀번호 변경</h3>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">현재 비밀번호</label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordInputChange}
                        className={errors.currentPassword ? "error" : ""}
                      />
                      {errors.currentPassword && (
                        <span className="field-error">
                          {errors.currentPassword}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword">새 비밀번호</label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordInputChange}
                        className={errors.newPassword ? "error" : ""}
                      />
                      {errors.newPassword && (
                        <span className="field-error">
                          {errors.newPassword}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordInputChange}
                        className={errors.confirmPassword ? "error" : ""}
                      />
                      {errors.confirmPassword && (
                        <span className="field-error">
                          {errors.confirmPassword}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "변경 중..." : "비밀번호 변경"}
                    </button>
                  </form>
                </div>

                <div className="setting-group">
                  <h3>2단계 인증</h3>
                  <p>계정 보안을 강화하기 위해 2단계 인증을 설정하세요.</p>
                  <button className="btn btn-outline">2단계 인증 설정</button>
                </div>
              </div>
            )}

            {/* 알림 설정 */}
            {activeTab === "notifications" && (
              <div className="settings-section">
                <h2>알림 설정</h2>

                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>이메일 알림</h3>
                      <p>중요한 알림을 이메일로 받습니다</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={preferences.emailNotifications}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>푸시 알림</h3>
                      <p>브라우저 푸시 알림을 받습니다</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={preferences.pushNotifications}
                        onChange={(e) =>
                          handlePreferenceChange(
                            "pushNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 환경설정 */}
            {activeTab === "preferences" && (
              <div className="settings-section">
                <h2>환경설정</h2>

                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>다크 모드</h3>
                      <p>어두운 테마를 사용합니다</p>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={preferences.darkMode}
                        onChange={(e) =>
                          handlePreferenceChange("darkMode", e.target.checked)
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>언어</h3>
                      <p>인터페이스 언어를 선택합니다</p>
                    </div>
                    <select
                      value={preferences.language}
                      onChange={(e) =>
                        handlePreferenceChange("language", e.target.value)
                      }
                      className="form-select"
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 위험 구역 */}
            {activeTab === "danger" && (
              <div className="settings-section danger-zone">
                <h2>위험 구역</h2>
                <p>아래 작업들은 신중하게 수행해주세요. 되돌릴 수 없습니다.</p>

                <div className="setting-group">
                  <div className="danger-item">
                    <div className="danger-info">
                      <h3>계정 삭제</h3>
                      <p>
                        계정을 영구적으로 삭제합니다. 모든 데이터가 삭제되며
                        복구할 수 없습니다.
                      </p>
                    </div>
                    <button
                      onClick={handleDeleteAccount}
                      className="btn btn-danger"
                    >
                      계정 삭제
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
