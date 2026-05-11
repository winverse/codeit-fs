import React, { useState, useEffect } from 'react';
import { useBlogStore } from '@/store/blogStore';
import styles from './PostForm.module.css';

function PostForm({ postId }) {
  const { 
    selectedPost,
    fetchPost,
    createPost,
    updatePost,
    setView,
    // TODO: 로딩 및 에러 상태 추가
    // isCreating,
    // isUpdating,
    // formError
  } = useBlogStore();

  // TODO: 폼 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1 // TODO: 실제 로그인된 사용자 ID 사용
  });

  // TODO: 유효성 검사 상태
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const isEditMode = Boolean(postId);

  useEffect(() => {
    if (isEditMode && postId) {
      // TODO: 수정 모드일 때 기존 포스트 데이터 로드
      fetchPost(postId);
    }
  }, [postId, isEditMode, fetchPost]);

  useEffect(() => {
    // TODO: 수정 모드일 때 폼에 기존 데이터 채우기
    if (isEditMode && selectedPost) {
      setFormData({
        title: selectedPost.title,
        body: selectedPost.body,
        userId: selectedPost.userId
      });
    }
  }, [isEditMode, selectedPost]);

  // TODO: 입력값 변경 처리
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // TODO: 실시간 유효성 검사
    if (touched[field]) {
      validateField(field, value);
    }
  };

  // TODO: 필드 블러 처리
  const handleFieldBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field, formData[field]);
  };

  // TODO: 유효성 검사 함수
  const validateField = (field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Title is required';
        } else if (value.trim().length < 3) {
          newErrors.title = 'Title must be at least 3 characters';
        } else if (value.trim().length > 100) {
          newErrors.title = 'Title must be less than 100 characters';
        } else {
          delete newErrors.title;
        }
        break;

      case 'body':
        if (!value.trim()) {
          newErrors.body = 'Content is required';
        } else if (value.trim().length < 10) {
          newErrors.body = 'Content must be at least 10 characters';
        } else if (value.trim().length > 1000) {
          newErrors.body = 'Content must be less than 1000 characters';
        } else {
          delete newErrors.body;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: 전체 폼 유효성 검사
  const validateForm = () => {
    const titleValid = validateField('title', formData.title);
    const bodyValid = validateField('body', formData.body);
    
    setTouched({
      title: true,
      body: true
    });

    return titleValid && bodyValid;
  };

  // TODO: 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        // TODO: 포스트 수정
        // await updatePost(postId, formData);
        console.log('TODO: updatePost 구현 필요', postId, formData);
      } else {
        // TODO: 새 포스트 생성
        // await createPost(formData);
        console.log('TODO: createPost 구현 필요', formData);
      }

      // TODO: 성공 시 목록으로 이동
      setView('list');
    } catch (error) {
      console.error('Failed to save post:', error);
      // TODO: 에러 토스트 표시
    }
  };

  // TODO: 취소 처리
  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        setView('list');
      }
    } else {
      setView('list');
    }
  };

  // TODO: 변경사항 확인 함수
  const hasUnsavedChanges = () => {
    if (isEditMode && selectedPost) {
      return (
        formData.title !== selectedPost.title ||
        formData.body !== selectedPost.body
      );
    }
    return formData.title.trim() !== '' || formData.body.trim() !== '';
  };

  // TODO: 초안 저장 (로컬스토리지 활용)
  const saveDraft = () => {
    const draftKey = isEditMode ? `draft-edit-${postId}` : 'draft-new';
    localStorage.setItem(draftKey, JSON.stringify(formData));
    // TODO: 초안 저장 완료 토스트 표시
    console.log('Draft saved to localStorage');
  };

  // TODO: 초안 불러오기
  const loadDraft = () => {
    const draftKey = isEditMode ? `draft-edit-${postId}` : 'draft-new';
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      const draftData = JSON.parse(draft);
      setFormData(draftData);
      // TODO: 초안 불러오기 완료 토스트 표시
      console.log('Draft loaded from localStorage');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* TODO: 폼 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h2>
          
          {/* TODO: 초안 관리 버튼들 */}
          <div className={styles.draftActions}>
            <button
              type="button"
              className={styles.draftButton}
              onClick={saveDraft}
            >
              💾 Save Draft
            </button>
            <button
              type="button"
              className={styles.draftButton}
              onClick={loadDraft}
            >
              📄 Load Draft
            </button>
          </div>
        </div>

        {/* TODO: 제목 입력 필드 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.error : ''}`}
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            onBlur={() => handleFieldBlur('title')}
            placeholder="Enter post title..."
            maxLength={100}
          />
          <div className={styles.fieldMeta}>
            <span className={styles.characterCount}>
              {formData.title.length}/100
            </span>
            {errors.title && touched.title && (
              <span className={styles.errorMessage}>
                {errors.title}
              </span>
            )}
          </div>
        </div>

        {/* TODO: 내용 입력 필드 */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="body">
            Content *
          </label>
          <textarea
            id="body"
            className={`${styles.textarea} ${errors.body ? styles.error : ''}`}
            value={formData.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
            onBlur={() => handleFieldBlur('body')}
            placeholder="Write your post content here..."
            rows={12}
            maxLength={1000}
          />
          <div className={styles.fieldMeta}>
            <span className={styles.characterCount}>
              {formData.body.length}/1000
            </span>
            {errors.body && touched.body && (
              <span className={styles.errorMessage}>
                {errors.body}
              </span>
            )}
          </div>
        </div>

        {/* TODO: 작성자 선택 (선택사항) */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="userId">
            Author
          </label>
          <select
            id="userId"
            className={styles.select}
            value={formData.userId}
            onChange={(e) => handleInputChange('userId', parseInt(e.target.value))}
          >
            <option value={1}>User 1</option>
            <option value={2}>User 2</option>
            <option value={3}>User 3</option>
            {/* TODO: 실제 사용자 목록으로 대체 */}
          </select>
        </div>

        {/* TODO: 폼 액션 버튼들 */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={Object.keys(errors).length > 0}
          >
            {isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>

      {/* TODO: 미리보기 패널 (선택사항) */}
      <div className={styles.preview}>
        <h3 className={styles.previewTitle}>Preview</h3>
        <div className={styles.previewContent}>
          <h4 className={styles.previewPostTitle}>
            {formData.title || 'Post Title'}
          </h4>
          <div className={styles.previewMeta}>
            By User {formData.userId} • Just now
          </div>
          <div className={styles.previewBody}>
            {formData.body ? (
              formData.body.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p className={styles.previewPlaceholder}>
                Post content will appear here...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;