import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addUser,
  removeUser,
  toggleUserStatus,
  selectUser,
  updateUser,
  selectAllUsers,
  selectSelectedUser,
  selectUsersCount,
  selectActiveUsers,
} from './usersSlice';
import styles from './UserManager.module.css';

function UserManager() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  const users = useSelector(selectAllUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const usersCount = useSelector(selectUsersCount);
  const activeUsers = useSelector(selectActiveUsers);
  
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (userName.trim() && userEmail.trim()) {
      if (editingUser) {
        dispatch(updateUser({
          id: editingUser.id,
          updates: { name: userName.trim(), email: userEmail.trim() }
        }));
        setEditingUser(null);
      } else {
        dispatch(addUser(userName.trim(), userEmail.trim()));
      }
      setUserName('');
      setUserEmail('');
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
  }

  function handleCancelEdit() {
    setEditingUser(null);
    setUserName('');
    setUserEmail('');
  }

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('ko-KR');
  }

  return (
    <div className={styles.container}>
      <h3>사용자 관리</h3>

      {/* 통계 */}
      <div className={styles.stats}>
        <span className="badge info">전체: {usersCount.total}명</span>
        <span className="badge success">활성: {usersCount.active}명</span>
        <span className="badge warning">비활성: {usersCount.inactive}명</span>
      </div>

      {/* 사용자 추가/수정 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="사용자 이름"
          className="input"
        />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="이메일"
          className="input"
        />
        <button type="submit" className="button">
          {editingUser ? '수정' : '추가'}
        </button>
        {editingUser && (
          <button type="button" onClick={handleCancelEdit} className="button">
            취소
          </button>
        )}
      </form>

      {/* 사용자 목록 */}
      <div className={styles.userList}>
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`${styles.userCard} ${selectedUser?.id === user.id ? styles.selected : ''}`}
            onClick={() => dispatch(selectUser(user.id))}
          >
            <div className={styles.userInfo}>
              <h4 className={styles.userName}>
                {user.name}
                <span className={`badge ${user.isActive ? 'success' : 'warning'}`}>
                  {user.isActive ? '활성' : '비활성'}
                </span>
              </h4>
              <p className={styles.userEmail}>{user.email}</p>
              <p className={styles.userDate}>가입일: {formatDate(user.joinedAt)}</p>
            </div>
            <div className={styles.userActions}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleUserStatus(user.id));
                }}
                className={`button ${styles.statusButton}`}
              >
                {user.isActive ? '비활성화' : '활성화'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(user);
                }}
                className={`button ${styles.editButton}`}
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeUser(user.id));
                }}
                className={`button ${styles.deleteButton}`}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 사용자 상세 정보 */}
      {selectedUser && (
        <div className={styles.selectedUser}>
          <h4>선택된 사용자</h4>
          <div className={styles.userDetails}>
            <p><strong>이름:</strong> {selectedUser.name}</p>
            <p><strong>이메일:</strong> {selectedUser.email}</p>
            <p><strong>상태:</strong> {selectedUser.isActive ? '활성' : '비활성'}</p>
            <p><strong>가입일:</strong> {formatDate(selectedUser.joinedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManager;