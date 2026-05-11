import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectTodoFilter,
  selectTodosCount,
} from './todosSlice';
import styles from './TodoList.module.css';

function TodoList() {
  const [todoText, setTodoText] = useState('');
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector(selectTodoFilter);
  const counts = useSelector(selectTodosCount);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (todoText.trim()) {
      dispatch(addTodo(todoText.trim()));
      setTodoText('');
    }
  }

  function handleFilterChange(newFilter) {
    dispatch(setFilter(newFilter));
  }

  return (
    <div className={styles.container}>
      <h3>할 일 목록</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="할 일을 입력하세요..."
          className="input"
        />
        <button type="submit" className="button">
          추가
        </button>
      </form>

      <div className={styles.filters}>
        <button
          className={`button ${filter === 'all' ? styles.active : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          전체 ({counts.total})
        </button>
        <button
          className={`button ${filter === 'active' ? styles.active : ''}`}
          onClick={() => handleFilterChange('active')}
        >
          진행중 ({counts.active})
        </button>
        <button
          className={`button ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          완료 ({counts.completed})
        </button>
      </div>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className={`list-item ${styles.todoItem}`}>
            <div className={styles.todoContent}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className={styles.checkbox}
              />
              <span 
                className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className={`button ${styles.deleteButton}`}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {counts.completed > 0 && (
        <button
          onClick={() => dispatch(clearCompleted())}
          className={`button ${styles.clearButton}`}
        >
          완료된 항목 정리 ({counts.completed}개)
        </button>
      )}
    </div>
  );
}

export default TodoList;