import { useState } from 'react';
import { useTodoStore } from '@/stores/todoStore';
import styles from './TodoInput.module.css';

export function TodoInput() {
  const [inputValue, setInputValue] = useState('');

  // Zustand 스토어에서 addTodo 액션 가져오기
  const addTodo = useTodoStore(state => state.addTodo);

  function handleSubmit(e) {
    e.preventDefault();

    // 투두 추가
    addTodo(inputValue);
    setInputValue('');
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새 할 일 추가</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={!inputValue.trim()}
        >
          ➕ 추가
        </button>
      </form>
    </div>
  );
}
