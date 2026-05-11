import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.todos.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            createdAt: Date.now(),
          },
        };
      },
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todosSlice.actions;

// 선택자들
export const selectAllTodos = (state) => state.todos.todos;
export const selectTodoFilter = (state) => state.todos.filter;

export const selectFilteredTodos = (state) => {
  const todos = selectAllTodos(state);
  const filter = selectTodoFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const selectTodosCount = (state) => {
  const todos = selectAllTodos(state);
  return {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };
};

export default todosSlice.reducer;