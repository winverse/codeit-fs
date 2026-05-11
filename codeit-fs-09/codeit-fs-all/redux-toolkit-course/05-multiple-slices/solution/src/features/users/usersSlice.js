import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {}, // 사용자 데이터를 id를 키로 하는 객체로 저장
  ids: [], // 사용자 id 목록
  currentUserId: null,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.entities[user.id] = user;
      if (!state.ids.includes(user.id)) {
        state.ids.push(user.id);
      }
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], ...updates };
      }
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      delete state.entities[userId];
      state.ids = state.ids.filter((id) => id !== userId);
      if (state.currentUserId === userId) {
        state.currentUserId = null;
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsersError: (state, action) => {
      state.error = action.payload;
    },
    clearUsersError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addUser,
  updateUser,
  removeUser,
  setCurrentUser,
  setUsersLoading,
  setUsersError,
  clearUsersError,
} = usersSlice.actions;

// Selectors
export const selectAllUsers = (state) =>
  state.users.ids.map((id) => state.users.entities[id]);

export const selectUserById = (state, userId) => state.users.entities[userId];

export const selectCurrentUser = (state) =>
  state.users.currentUserId
    ? state.users.entities[state.users.currentUserId]
    : null;

export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer;