import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectAllUsers,
  selectCurrentUser,
  setCurrentUser,
} from "./usersSlice";
import styles from "./UserSelector.module.css";

export function UserSelector() {
  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleUserChange = (event) => {
    const userId = parseInt(event.target.value);
    dispatch(setCurrentUser(userId));
  };

  return (
    <div className={styles.userSelector}>
      <label htmlFor="user-select">현재 사용자:</label>
      <select
        id="user-select"
        value={currentUser?.id || ""}
        onChange={handleUserChange}
        className={styles.select}
      >
        <option value="">사용자 선택</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.avatar} {user.name}
          </option>
        ))}
      </select>
      {currentUser && (
        <span className={styles.currentUser}>
          {currentUser.avatar} {currentUser.name}
        </span>
      )}
    </div>
  );
}