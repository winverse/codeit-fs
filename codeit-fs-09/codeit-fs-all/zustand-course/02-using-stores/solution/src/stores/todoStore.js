import { create } from 'zustand';

export const useTodoStore = create((set, get) => ({
  // === 상태 ===
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'

  // === 액션 ===

  // 투두 추가
  addTodo: text => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    set(state => ({
      todos: [...state.todos, newTodo],
    }));
  },

  // 투두 완료/미완료 토글
  toggleTodo: id => {
    set(state => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  // 투두 삭제
  deleteTodo: id => {
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  },

  // 투두 수정
  editTodo: (id, newText) => {
    if (!newText.trim()) return;

    set(state => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ),
    }));
  },

  // 필터 설정
  setFilter: filter => {
    set({ filter });
  },

  // 완료된 투두들 모두 삭제
  clearCompleted: () => {
    set(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  },

  // === 계산된 값 (Getter 스타일) ===

  // 필터에 따른 투두 목록
  getFilteredTodos: () => {
    const { todos, filter } = get();

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  },

  // 투두 통계
  getTodoStats: () => {
    const { todos } = get();
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
    };
  },
}));
