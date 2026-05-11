import { useState } from 'react';
import styles from './TodoItem.module.css';
import clsx from 'clsx';

export function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo?.text || '');

  const toggleTodo = id => console.log('TODO: Toggle todo', id);
  const deleteTodo = id => console.log('TODO: Delete todo', id);
  const editTodo = (id, text) => console.log('TODO: Edit todo', id, text);

  // todo가 없는 경우 처리
  if (!todo) {
    return null;
  }

  function handleEdit() {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <div className={clsx(styles.item, styles.completed && todo.completed)}>
      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className={styles.checkbox}
        />
        <span className={styles.checkmark}></span>
      </label>

      <div className={styles.content}>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <span
            className={styles.text}
            onDoubleClick={() => setIsEditing(true)}
            title="더블클릭하여 수정"
          >
            {todo.text}
          </span>
        )}

        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
          title="수정"
        >
          ✏️
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className={styles.deleteButton}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
