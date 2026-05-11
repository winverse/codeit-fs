import { useState } from 'react';
import styles from './MemoCard.module.css';

const categoryIcons = {
  work: '💼',
  personal: '👤',
  study: '📚',
  ideas: '💡',
};

const categoryLabels = {
  work: '업무',
  personal: '개인',
  study: '학습',
  ideas: '아이디어',
};

export function MemoCard({ memo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(memo.title);
  const [editContent, setEditContent] = useState(memo.content);
  const [editCategory, setEditCategory] = useState(memo.category);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '어제';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: 유효성 검사 추가
    if (!editTitle.trim() || !editContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const updatedMemo = {
      ...memo,
      title: editTitle.trim(),
      content: editContent.trim(),
      category: editCategory,
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedMemo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(memo.title);
    setEditContent(memo.content);
    setEditCategory(memo.category);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('정말 이 메모를 삭제하시겠습니까?')) {
      onDelete(memo.id);
    }
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <div className={styles.editForm}>
          <input
            type="text"
            className={styles.editTitle}
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="메모 제목"
          />

          <textarea
            className={styles.editContent}
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            placeholder="메모 내용"
            rows={4}
          />

          <div className={styles.categorySection}>
            <span className={styles.categoryLabel}>카테고리:</span>
            <div className={styles.categoryOptions}>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <label key={key} className={styles.categoryOption}>
                  <input
                    type="radio"
                    name="editCategory"
                    value={key}
                    checked={editCategory === key}
                    onChange={e => setEditCategory(e.target.value)}
                  />
                  <span className={styles.categoryButton}>
                    {categoryIcons[key]} {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.editActions}>
            <button className={styles.saveButton} onClick={handleSave}>
              저장
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.categoryBadge}>
          <span className={styles.categoryIcon}>
            {categoryIcons[memo.category]}
          </span>
          <span className={styles.categoryName}>
            {categoryLabels[memo.category]}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={handleEdit}
            title="편집"
          >
            ✏️
          </button>
          <button
            className={styles.actionButton}
            onClick={handleDelete}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{memo.title}</h3>
        <p className={styles.description}>{memo.content}</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{formatDate(memo.updatedAt)}</span>
        {memo.createdAt !== memo.updatedAt && (
          <span className={styles.edited}>수정됨</span>
        )}
      </div>
    </div>
  );
}
