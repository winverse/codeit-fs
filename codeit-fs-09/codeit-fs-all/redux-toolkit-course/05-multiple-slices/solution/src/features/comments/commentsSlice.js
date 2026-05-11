import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  byPostId: {}, // 게시글 ID별 댓글 목록
  loading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const comment = {
        ...action.payload,
        id: Date.now() + Math.random(), // 실제 앱에서는 서버에서 생성
        createdAt: new Date().toISOString(),
      };

      state.entities[comment.id] = comment;
      state.ids.push(comment.id);

      // 게시글별 댓글 인덱스 업데이트
      if (!state.byPostId[comment.postId]) {
        state.byPostId[comment.postId] = [];
      }
      state.byPostId[comment.postId].push(comment.id);
    },
    updateComment: (state, action) => {
      const { id, updates } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], ...updates };
      }
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;
      const comment = state.entities[commentId];

      if (comment) {
        delete state.entities[commentId];
        state.ids = state.ids.filter((id) => id !== commentId);

        // 게시글별 댓글 인덱스에서도 제거
        if (state.byPostId[comment.postId]) {
          state.byPostId[comment.postId] = state.byPostId[
            comment.postId
          ].filter((id) => id !== commentId);
        }
      }
    },
    deleteCommentsByPostId: (state, action) => {
      const postId = action.payload;
      const commentIds = state.byPostId[postId] || [];

      // 해당 게시글의 모든 댓글 삭제
      commentIds.forEach((commentId) => {
        delete state.entities[commentId];
        state.ids = state.ids.filter((id) => id !== commentId);
      });

      delete state.byPostId[postId];
    },
    setCommentsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCommentsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addComment,
  updateComment,
  deleteComment,
  deleteCommentsByPostId,
  setCommentsLoading,
  setCommentsError,
} = commentsSlice.actions;

// Selectors
export const selectAllComments = (state) =>
  state.comments.ids.map((id) => state.comments.entities[id]);

export const selectCommentById = (state, commentId) =>
  state.comments.entities[commentId];

export const selectCommentsByPostId = (state, postId) => {
  const commentIds = state.comments.byPostId[postId] || [];
  return commentIds
    .map((id) => state.comments.entities[id])
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

export const selectCommentsCount = (state) => state.comments.ids.length;

export const selectCommentsCountByPostId = (state, postId) =>
  state.comments.byPostId[postId]?.length || 0;

export default commentsSlice.reducer;