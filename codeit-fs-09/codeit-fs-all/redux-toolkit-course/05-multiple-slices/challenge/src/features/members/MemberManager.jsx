import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchMembers,
  addMember,
  selectMember,
  removeMember,
  setMemberStatus,
  selectAllMembers,
  selectSelectedMember,
  selectMembersLoading,
  selectMembersCount,
} from './membersSlice';
import styles from './MemberManager.module.css';

function MemberManager() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'developer',
    avatar: '👤',
  });

  const members = useSelector(selectAllMembers);
  const selectedMember = useSelector(selectSelectedMember);
  const loading = useSelector(selectMembersLoading);
  const membersCount = useSelector(selectMembersCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      dispatch(addMember(formData));
      setFormData({ name: '', email: '', role: 'developer', avatar: '👤' });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function getStatusBadgeClass(status) {
    const statusMap = {
      active: 'success',
      busy: 'warning',
      offline: 'danger',
    };
    return statusMap[status] || 'info';
  }

  const avatarOptions = ['👤', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍💼', '👩‍💼', '🧑‍🔧', '👨‍🔬', '👩‍🔬'];

  if (loading) {
    return (
      <div className={styles.container}>
        <h2>팀원 관리</h2>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>팀원 관리</h2>
      </div>

      {/* 팀원 통계 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{membersCount.total}</div>
          <div className="stat-label">전체 팀원</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{membersCount.active}</div>
          <div className="stat-label">활동중</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{membersCount.developers}</div>
          <div className="stat-label">개발자</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{membersCount.designers}</div>
          <div className="stat-label">디자이너</div>
        </div>
      </div>

      {/* 새 팀원 추가 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>새 팀원 추가</h3>
        <div className={styles.formRow}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름"
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일"
            className="input"
            required
          />
        </div>
        <div className={styles.formRow}>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="select"
          >
            <option value="developer">개발자</option>
            <option value="designer">디자이너</option>
            <option value="manager">매니저</option>
            <option value="tester">테스터</option>
          </select>
          <select
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
            className="select"
          >
            {avatarOptions.map(avatar => (
              <option key={avatar} value={avatar}>
                {avatar} {avatar}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="button" disabled={loading}>
          팀원 추가
        </button>
      </form>

      {/* 팀원 목록 */}
      <div className={styles.memberList}>
        <h3>팀원 목록</h3>
        {members.length === 0 ? (
          <div className={styles.emptyState}>
            팀원이 없습니다. 새로운 팀원을 추가해보세요!
          </div>
        ) : (
          members.map(member => (
            <div 
              key={member.id} 
              className={`card ${styles.memberCard} ${
                selectedMember?.id === member.id ? styles.selected : ''
              }`}
              onClick={() => dispatch(selectMember(member.id))}
            >
              <div className={styles.memberHeader}>
                <div className={styles.memberInfo}>
                  <span className={styles.avatar}>{member.avatar}</span>
                  <div>
                    <h4 className={styles.memberName}>
                      {member.name}
                      <span className={`badge ${getStatusBadgeClass(member.status)}`}>
                        {member.status}
                      </span>
                      <span className="badge info">{member.role}</span>
                    </h4>
                    <p className={styles.memberEmail}>{member.email}</p>
                  </div>
                </div>
                
                <div className={styles.memberActions}>
                  <select
                    value={member.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(setMemberStatus({ 
                        memberId: member.id, 
                        status: e.target.value 
                      }));
                    }}
                    className="select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="active">활동중</option>
                    <option value="busy">바쁨</option>
                    <option value="offline">오프라인</option>
                  </select>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeMember(member.id));
                    }}
                    className="button"
                    style={{ backgroundColor: '#f56565', color: 'white' }}
                  >
                    제거
                  </button>
                </div>
              </div>
              
              <div className={styles.memberMeta}>
                <small>
                  가입일: {new Date(member.joinedAt).toLocaleDateString('ko-KR')}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 선택된 팀원 상세 정보 */}
      {selectedMember && (
        <div className={styles.selectedMember}>
          <h3>선택된 팀원</h3>
          <div className="card">
            <div className={styles.memberDetails}>
              <span className={styles.largeAvatar}>{selectedMember.avatar}</span>
              <div>
                <h4>{selectedMember.name}</h4>
                <p><strong>이메일:</strong> {selectedMember.email}</p>
                <p><strong>역할:</strong> {selectedMember.role}</p>
                <p><strong>상태:</strong> {selectedMember.status}</p>
                <p><strong>가입일:</strong> {new Date(selectedMember.joinedAt).toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberManager;