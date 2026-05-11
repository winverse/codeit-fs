import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  selectedUserId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload);
      },
      prepare(name, email) {
        return {
          payload: {
            id: nanoid(),
            name,
            email,
            joinedAt: Date.now(),
            isActive: true,
          },
        };
      },
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      // 선택된 사용자가 삭제되면 선택 해제
      if (state.selectedUserId === action.payload) {
        state.selectedUserId = null;
      }
    },
    toggleUserStatus: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.isActive = !user.isActive;
      }
    },
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        Object.assign(user, updates);
      }
    },
  },
});

export const { addUser, removeUser, toggleUserStatus, selectUser, updateUser } = usersSlice.actions;

// 선택자들
export const selectAllUsers = (state) => state.users.users;
export const selectSelectedUserId = (state) => state.users.selectedUserId;

export const selectActiveUsers = (state) => {
  return selectAllUsers(state).filter((user) => user.isActive);
};

export const selectSelectedUser = (state) => {
  const userId = selectSelectedUserId(state);
  return userId ? selectAllUsers(state).find((user) => user.id === userId) : null;
};

export const selectUsersCount = (state) => {
  const users = selectAllUsers(state);
  return {
    total: users.length,
    active: users.filter((user) => user.isActive).length,
    inactive: users.filter((user) => !user.isActive).length,
  };
};

export default usersSlice.reducer;