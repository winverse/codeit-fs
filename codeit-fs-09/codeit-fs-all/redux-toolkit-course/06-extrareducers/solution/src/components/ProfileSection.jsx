import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, toggleEditing } from '@/features/profile/profileSlice';
import styles from './ProfileSection.module.css';

export function ProfileSection() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  function handleEditProfile() {
    dispatch(toggleEditing());
  }

  function handleUpdateProfile() {
    // 실제로는 폼에서 입력받은 데이터로 업데이트
    dispatch(
      setProfile({
        nickname: '업데이트된 닉네임',
        bio: '프로필이 업데이트되었습니다!',
      })
    );
    dispatch(toggleEditing());
  }

  return (
    <div className={styles.section}>
      <h3>프로필</h3>
      
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {profile.avatar}
        </div>
        
        <div className={styles.info}>
          {profile.isEditing ? (
            <div className={styles.editing}>
              <p>편집 모드</p>
              <button 
                onClick={handleUpdateProfile}
                className={styles.saveButton}
              >
                저장
              </button>
            </div>
          ) : (
            <>
              <p className={styles.nickname}>
                {profile.nickname || '닉네임 없음'}
              </p>
              <p className={styles.bio}>
                {profile.bio || '소개 없음'}
              </p>
              <button 
                onClick={handleEditProfile}
                className={styles.editButton}
              >
                편집
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className={styles.settings}>
        <p><strong>테마:</strong> {profile.settings.theme}</p>
        <p><strong>알림:</strong> {profile.settings.notifications ? '켜짐' : '꺼짐'}</p>
      </div>
    </div>
  );
}