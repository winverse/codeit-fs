import { useState } from 'react';
import styles from './TodoInput.module.css';
import { useTodoStore } from '@/stores/todoStore';

export function TodoInput() {
  const [inputValue, setInputValue] = useState('');

  // TODO: useTodoStore에서 addTodo 액션을 가져오세요
  const addTodo = useTodoStore(state => state.addTodo);

  function handleSubmit(e) {
    e.preventDefault();

    // TODO: addTodo 액션을 호출하세요
    addTodo(inputValue);
    console.log('TODO: Add todo -', inputValue);
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
