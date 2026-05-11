import { createSlice } from '@reduxjs/toolkit';
import { logout, resetAllData } from '@/features/auth/authSlice';

const initialState = {
  items: [],
  filter: 'all', // 'all', 'my', 'draft'
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      const post = {
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
        authorId: action.payload.authorId,
        authorName: action.payload.authorName,
        status: 'draft',
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      state.items.unshift(post);
    },
    updatePost: (state, action) => {
      const { id, updates } = action.payload;
      const post = state.items.find((item) => item.id === id);
      if (post) {
        Object.assign(post, updates);
      }
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    publishPost: (state, action) => {
      const post = state.items.find((item) => item.id === action.payload);
      if (post) {
        post.status = 'published';
        post.publishedAt = new Date().toISOString();
      }
    },
    likePost: (state, action) => {
      const post = state.items.find((item) => item.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그아웃 시 현재 사용자의 초안 게시글만 제거
      .addCase(logout, (state, action) => {
        // 로그아웃하는 사용자의 초안 게시글만 제거
        state.items = state.items.filter(
          (post) => post.status === 'published' || !post.authorId
        );
        state.filter = 'all';
      })
      // 전체 데이터 리셋
      .addCase(resetAllData, (state) => {
        return initialState;
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  publishPost,
  likePost,
  setFilter,
  setLoading,
} = postsSlice.actions;
export const postsReducer = postsSlice.reducer;