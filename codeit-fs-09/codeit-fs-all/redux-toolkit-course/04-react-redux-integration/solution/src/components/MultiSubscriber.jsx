import { useAppSelector } from "@/app/hooks";
import {
  selectUserProfile,
  selectTheme,
  selectIsLoggedIn,
} from "@/features/user/userSlice";
import styles from "./MultiSubscriber.module.css";

export function MultiSubscriber() {
  // 여러 상태를 개별적으로 구독
  const profile = useAppSelector(selectUserProfile);
  const theme = useAppSelector(selectTheme);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // 또는 여러 상태를 한 번에 구독 (주의: 매번 새 객체 생성)
  const userInfo = useAppSelector((state) => ({
    name: state.user.profile.name,
    theme: state.user.preferences.theme,
    isLoggedIn: state.user.isLoggedIn,
  }));

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h3>다중 상태 구독</h3>

      <div className={styles.section}>
        <h4>개별 구독:</h4>
        <p>이름: {isLoggedIn ? profile.name : "로그인 필요"}</p>
        <p>테마: {theme}</p>
        <p>로그인 상태: {isLoggedIn ? "로그인됨" : "로그아웃됨"}</p>
      </div>

      <div className={styles.section}>
        <h4>통합 구독:</h4>
        <p>이름: {userInfo.isLoggedIn ? userInfo.name : "로그인 필요"}</p>
        <p>테마: {userInfo.theme}</p>
        <p>로그인 상태: {userInfo.isLoggedIn ? "로그인됨" : "로그아웃됨"}</p>
      </div>
    </div>
  );
}