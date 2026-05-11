import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectUserPreferences,
  selectIsLoggedIn,
  updatePreferences,
  toggleTheme,
} from "./userSlice";
import styles from "./UserPreferences.module.css";

export function UserPreferences() {
  const preferences = useAppSelector(selectUserPreferences);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const handlePreferenceChange = (key, value) => {
    dispatch(updatePreferences({ [key]: value }));
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <p>로그인 후 설정을 변경할 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3>사용자 설정</h3>

      <div className={styles.preferenceGroup}>
        <label>테마:</label>
        <div className={styles.themeToggle}>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`${styles.themeButton} ${
              preferences.theme === "light" ? styles.active : ""
            }`}
          >
            밝게
          </button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`${styles.themeButton} ${
              preferences.theme === "dark" ? styles.active : ""
            }`}
          >
            어둡게
          </button>
        </div>
      </div>

      <div className={styles.preferenceGroup}>
        <label>언어:</label>
        <select
          value={preferences.language}
          onChange={(e) => handlePreferenceChange("language", e.target.value)}
          className={styles.select}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div className={styles.preferenceGroup}>
        <label>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) =>
              handlePreferenceChange("notifications", e.target.checked)
            }
          />
          알림 받기
        </label>
      </div>
    </div>
  );
}