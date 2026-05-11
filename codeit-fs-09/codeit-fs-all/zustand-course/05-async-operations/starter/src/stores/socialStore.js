import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// 요청 상태 타입
const REQUEST_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// 캐시 설정
const CACHE_CONFIG = {
  posts: 2 * 60 * 1000, // 2분
  users: 10 * 60 * 1000, // 10분
  comments: 1 * 60 * 1000, // 1분
};

// 진행 중인 요청 추적
const pendingRequests = new Map();

export const useSocialStore = create(
  immer((set, get) => ({
    // 데이터
    entities: {
      posts: {},
      users: {},
      comments: {},
    },

    // 요청 상태
    requests: {
      fetchPosts: { status: REQUEST_STATUS.IDLE, error: null },
      fetchUserPosts: { status: REQUEST_STATUS.IDLE, error: null },
      createPost: { status: REQUEST_STATUS.IDLE, error: null },
      deletePost: { status: REQUEST_STATUS.IDLE, error: null },
      fetchComments: { status: REQUEST_STATUS.IDLE, error: null },
      createComment: { status: REQUEST_STATUS.IDLE, error: null },
    },

    // 메타데이터
    meta: {
      posts: {
        lastFetch: null,
        hasNextPage: true,
        nextCursor: null,
      },
      users: {
        lastFetch: null,
      },
      comments: {},
    },

    // === 포스트 관련 액션 ===

    fetchPosts: async (options = {}) => {
      // TODO: Implement fetchPosts logic as per README.md
      console.log("TODO: fetchPosts");
    },

    fetchUserPosts: async (userId, force = false) => {
      // TODO: Implement fetchUserPosts logic as per README.md
      console.log("TODO: fetchUserPosts");
    },

    createPost: async (postData) => {
      // TODO: Implement createPost logic as per README.md
      console.log("TODO: createPost");
    },

    deletePost: async (postId) => {
      // TODO: Implement deletePost logic as per README.md
      console.log("TODO: deletePost");
    },

    // === 댓글 관련 액션 ===

    fetchComments: async (postId, force = false) => {
      // TODO: Implement fetchComments logic as per README.md
      console.log("TODO: fetchComments");
    },

    createComment: async (commentData) => {
      // TODO: Implement createComment logic as per README.md
      console.log("TODO: createComment");
    },

    // === 유틸리티 메서드 ===

    _executeRequest: async (requestKey, apiFunction) => {
      // TODO: Implement _executeRequest logic as per README.md
      console.log("TODO: _executeRequest");
    },

    _notifySuccess: (message) => {
      // TODO: Implement _notifySuccess logic as per README.md
      console.log("TODO: _notifySuccess");
    },

    _notifyError: (message) => {
      // TODO: Implement _notifyError logic as per README.md
      console.log("TODO: _notifyError");
    },

    // === 선택자 (Selectors) ===

    getPostById: (id) => get().entities.posts[id],

    getPostsByUser: (userId) => {
      return Object.values(get().entities.posts)
        .filter((post) => post.authorId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getCommentsByPost: (postId) => {
      return Object.values(get().entities.comments)
        .filter((comment) => comment.postId === postId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    },

    isLoading: (requestKey) => {
      return get().requests[requestKey]?.status === REQUEST_STATUS.LOADING;
    },

    getError: (requestKey) => {
      return get().requests[requestKey]?.error;
    },

    isAnyLoading: () => {
      return Object.values(get().requests).some(
        (req) => req.status === REQUEST_STATUS.LOADING
      );
    },
  }))
);

// === API 함수들 (실제로는 별도 파일에) ===

async function fetchPostsAPI(cursor = null) {
  // 시뮬레이션된 API 응답
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500)
  );

  const posts = Array.from({ length: 10 }, (_, i) => ({
    id: (cursor || 0) * 10 + i + 1,
    title: `Post ${(cursor || 0) * 10 + i + 1}`,
    content: `This is content for post ${(cursor || 0) * 10 + i + 1}`,
    authorId: Math.floor(Math.random() * 5) + 1,
    author: {
      id: Math.floor(Math.random() * 5) + 1,
      name: `User ${Math.floor(Math.random() * 5) + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${
        Math.floor(Math.random() * 5) + 1
      }`,
    },
    likesCount: Math.floor(Math.random() * 100),
    commentsCount: Math.floor(Math.random() * 20),
    createdAt: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));

  return {
    posts,
    hasNextPage: cursor < 3, // 최대 4페이지
    nextCursor: cursor + 1,
  };
}

async function fetchUserPostsAPI(userId) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return []; // 구현 생략
}

async function createPostAPI(postData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: Date.now(),
    ...postData,
    authorId: 1, // 현재 사용자
    likesCount: 0,
    commentsCount: 0,
    createdAt: new Date().toISOString(),
  };
}

async function deletePostAPI(postId) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // 실제 삭제 API 호출
}

async function fetchCommentsAPI(postId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
    id: `${postId}-${i}`,
    content: `Comment ${i + 1} for post ${postId}`,
    postId,
    authorId: Math.floor(Math.random() * 5) + 1,
    createdAt: new Date(
      Date.now() - Math.random() * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
}

async function createCommentAPI(commentData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: Date.now(),
    ...commentData,
    createdAt: new Date().toISOString(),
  };
}