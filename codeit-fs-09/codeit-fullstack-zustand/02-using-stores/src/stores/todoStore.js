import { create } from 'zustand';

export const useTodoStore = create(() => ({
  // 상태
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'

  // 액션
  addTodo: (text) => {},

  toggleTodo: (id) => {},

  deleteTodo: (id) => {},

  editTodo: (id, newText) => {},

  setFilter: (filter) => {},

  clearCompleted: () => {},

  getTodoStats: () => {},

  getFilteredTodos: () => {},
}));
