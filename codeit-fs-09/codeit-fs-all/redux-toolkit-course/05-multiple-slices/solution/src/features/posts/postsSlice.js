import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  selectedPostId: null,
  filter: "all", // 'all', 'published', 'draft'
  sortBy: "createdAt", // 'createdAt', 'title', 'author'
  sortOrder: "desc", // 'asc', 'desc'
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        ...action.payload,
        id: Date.now() + Math.random(), // 실제 앱에서는 서버에서 생성
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.entities[post.id] = post;
      state.ids.push(post.id);
    },
    updatePost: (state, action) => {
      const { id, updates } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = {
          ...state.entities[id],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      delete state.entities[postId];
      state.ids = state.ids.filter((id) => id !== postId);
      if (state.selectedPostId === postId) {
        state.selectedPostId = null;
      }
    },
    selectPost: (state, action) => {
      state.selectedPostId = action.payload;
    },
    setPostsFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPostsSort: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      if (sortBy) state.sortBy = sortBy;
      if (sortOrder) state.sortOrder = sortOrder;
    },
    togglePostStatus: (state, action) => {
      const postId = action.payload;
      const post = state.entities[postId];
      if (post) {
        post.status = post.status === "published" ? "draft" : "published";
        post.updatedAt = new Date().toISOString();
      }
    },
    setPostsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  selectPost,
  setPostsFilter,
  setPostsSort,
  togglePostStatus,
  setPostsLoading,
  setPostsError,
} = postsSlice.actions;

// Selectors
export const selectAllPosts = (state) =>
  state.posts.ids.map((id) => state.posts.entities[id]);

export const selectPostById = (state, postId) => state.posts.entities[postId];

export const selectSelectedPost = (state) =>
  state.posts.selectedPostId
    ? state.posts.entities[state.posts.selectedPostId]
    : null;

export const selectFilteredPosts = (state) => {
  const allPosts = selectAllPosts(state);
  const { filter, sortBy, sortOrder } = state.posts;

  // 필터링
  let filteredPosts = allPosts;
  if (filter !== "all") {
    filteredPosts = allPosts.filter((post) => post.status === filter);
  }

  // 정렬
  filteredPosts.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "author") {
      // 작성자 이름으로 정렬하는 경우 사용자 정보를 가져와야 함
      const users = state.users || {};
      aValue = users.entities?.[a.authorId]?.name || "";
      bValue = users.entities?.[b.authorId]?.name || "";
    }

    if (sortOrder === "desc") {
      return aValue > bValue ? -1 : 1;
    }
    return aValue > bValue ? 1 : -1;
  });

  return filteredPosts;
};

export const selectPostsByAuthor = (state, authorId) =>
  selectAllPosts(state).filter((post) => post.authorId === authorId);

export default postsSlice.reducer;