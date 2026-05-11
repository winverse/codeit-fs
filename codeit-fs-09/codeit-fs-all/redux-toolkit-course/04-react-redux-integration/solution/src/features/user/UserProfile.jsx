import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectUserProfile,
  selectIsLoggedIn,
  updateProfile,
  login,
  logout,
} from "./userSlice";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const profile = useAppSelector(selectUserProfile);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleLogin = () => {
    const mockProfile = {
      name: "홍길동",
      email: "hong@example.com",
      avatar: "https://via.placeholder.com/100",
    };
    dispatch(login({ profile: mockProfile }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setEditMode(false);
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <h2>사용자 로그인</h2>
        <button onClick={handleLogin} className={styles.loginButton}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <h2>사용자 프로필</h2>

      {editMode ? (
        <div className={styles.editForm}>
          <div className={styles.inputGroup}>
            <label>이름:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>이메일:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={handleSave} className={styles.saveButton}>
              저장
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.profileView}>
          {profile.avatar && (
            <img src={profile.avatar} alt="Avatar" className={styles.avatar} />
          )}
          <p>
            <strong>이름:</strong> {profile.name}
          </p>
          <p>
            <strong>이메일:</strong> {profile.email}
          </p>

          <div className={styles.buttonGroup}>
            <button
              onClick={() => setEditMode(true)}
              className={styles.editButton}
            >
              편집
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}