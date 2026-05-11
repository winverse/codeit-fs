import { useState } from 'react';
// TODO: useMemoStore import 추가
// import { useMemoStore } from '@/stores/memoStore'
import styles from './MemoForm.module.css';

const categories = [
  { key: 'work', label: '업무', icon: '💼' },
  { key: 'personal', label: '개인', icon: '🏠' },
  { key: 'study', label: '공부', icon: '📚' },
];

export function MemoForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('work');

  // TODO: useMemoStore에서 addMemo 액션 가져오기
  // const addMemo = useMemoStore((state) => state.addMemo)

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: addMemo 액션 호출
    // addMemo(title, content, category)
    console.log('TODO: Add memo', { title, content, category });

    setTitle('');
    setContent('');
    setCategory('work');
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 새 메모</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="메모 제목을 입력하세요..."
          className={styles.titleInput}
          required
        />

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="메모 내용을 입력하세요..."
          className={styles.contentInput}
          rows={5}
          required
        />

        <div className={styles.categorySection}>
          <label className={styles.categoryLabel}>카테고리:</label>
          <div className={styles.categoryOptions}>
            {categories.map(({ key, label, icon }) => (
              <label key={key} className={styles.categoryOption}>
                <input
                  type="radio"
                  name="category"
                  value={key}
                  checked={category === key}
                  onChange={e => setCategory(e.target.value)}
                />
                <span className={styles.categoryButton}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!title.trim() || !content.trim()}
        >
          ➕ 메모 추가
        </button>
      </form>
    </div>
  );
}
