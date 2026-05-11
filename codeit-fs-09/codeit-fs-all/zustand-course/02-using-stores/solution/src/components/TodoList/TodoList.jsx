import { useTodoStore } from '@/stores/todoStore';
import { TodoItem } from '@/components/TodoItem';
import styles from './TodoList.module.css';

export function TodoList() {
  // Zustand 스토어에서 필터된 투두 목록 가져오기
  const getFilteredTodos = useTodoStore(state => state.getFilteredTodos);
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📝</div>
          <h3>할 일이 없습니다!</h3>
          <p>새로운 할 일을 추가해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>할 일 목록 ({filteredTodos.length}개)</h2>
      <div className={styles.list}>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
