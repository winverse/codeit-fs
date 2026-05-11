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
      const { force = false, cursor = null } = options;
      const requestKey = `fetchPosts:${cursor || "initial"}`;

      // 중복 요청 방지
      if (pendingRequests.has(requestKey)) {
        return await pendingRequests.get(requestKey);
      }

      // 캐시 확인
      if (!force && !cursor) {
        const { meta } = get();
        const isValid =
          meta.posts.lastFetch &&
          Date.now() - meta.posts.lastFetch < CACHE_CONFIG.posts;

        if (isValid) {
          return Object.values(get().entities.posts);
        }
      }

      // API 호출
      const promise = get()._executeRequest("fetchPosts", async () => {
        const response = await fetchPostsAPI(cursor);

        set((state) => {
          // 새로운 포스트들 추가
          response.posts.forEach((post) => {
            state.entities.posts[post.id] = post;

            // 작성자 정보도 함께 저장
            if (post.author) {
              state.entities.users[post.author.id] = post.author;
            }
          });

          // 메타데이터 업데이트
          state.meta.posts = {
            lastFetch: cursor ? state.meta.posts.lastFetch : Date.now(),
            hasNextPage: response.hasNextPage,
            nextCursor: response.nextCursor,
          };
        });

        return response.posts;
      });

      pendingRequests.set(requestKey, promise);

      try {
        const result = await promise;
        pendingRequests.delete(requestKey);
        return result;
      } catch (error) {
        pendingRequests.delete(requestKey);
        throw error;
      }
    },

    fetchUserPosts: async (userId, force = false) => {
      const requestKey = `fetchUserPosts:${userId}`;

      if (pendingRequests.has(requestKey)) {
        return await pendingRequests.get(requestKey);
      }

      const promise = get()._executeRequest("fetchUserPosts", async () => {
        const posts = await fetchUserPostsAPI(userId);

        set((state) => {
          posts.forEach((post) => {
            state.entities.posts[post.id] = post;
          });
        });

        return posts;
      });

      pendingRequests.set(requestKey, promise);

      try {
        const result = await promise;
        pendingRequests.delete(requestKey);
        return result;
      } catch (error) {
        pendingRequests.delete(requestKey);
        throw error;
      }
    },

    createPost: async (postData) => {
      return await get()._executeRequest("createPost", async () => {
        const newPost = await createPostAPI(postData);

        set((state) => {
          state.entities.posts[newPost.id] = newPost;
        });

        // 성공 알림 등 추가 로직
        get()._notifySuccess("포스트가 작성되었습니다.");

        return newPost;
      });
    },

    deletePost: async (postId) => {
      // 낙관적 업데이트 (Optimistic Update)
      const originalPost = get().entities.posts[postId];

      set((state) => {
        if (state.entities.posts[postId]) {
          state.entities.posts[postId].deleting = true;
        }
      });

      try {
        await get()._executeRequest("deletePost", async () => {
          await deletePostAPI(postId);

          set((state) => {
            delete state.entities.posts[postId];
          });
        });

        get()._notifySuccess("포스트가 삭제되었습니다.");
      } catch (error) {
        // 실패 시 원복
        set((state) => {
          if (originalPost) {
            state.entities.posts[postId] = originalPost;
          }
        });

        get()._notifyError("포스트 삭제에 실패했습니다.");
        throw error;
      }
    },

    // === 댓글 관련 액션 ===

    fetchComments: async (postId, force = false) => {
      const requestKey = `fetchComments:${postId}`;

      // 캐시 확인
      if (!force) {
        const { meta } = get();
        const commentMeta = meta.comments[postId];
        const isValid =
          commentMeta?.lastFetch &&
          Date.now() - commentMeta.lastFetch < CACHE_CONFIG.comments;

        if (isValid) {
          return Object.values(get().entities.comments).filter(
            (c) => c.postId === postId
          );
        }
      }

      if (pendingRequests.has(requestKey)) {
        return await pendingRequests.get(requestKey);
      }

      const promise = get()._executeRequest("fetchComments", async () => {
        const comments = await fetchCommentsAPI(postId);

        set((state) => {
          comments.forEach((comment) => {
            state.entities.comments[comment.id] = comment;
          });

          state.meta.comments[postId] = {
            lastFetch: Date.now(),
          };
        });

        return comments;
      });

      pendingRequests.set(requestKey, promise);

      try {
        const result = await promise;
        pendingRequests.delete(requestKey);
        return result;
      } catch (error) {
        pendingRequests.delete(requestKey);
        throw error;
      }
    },

    createComment: async (commentData) => {
      return await get()._executeRequest("createComment", async () => {
        const newComment = await createCommentAPI(commentData);

        set((state) => {
          state.entities.comments[newComment.id] = newComment;
        });

        return newComment;
      });
    },

    // === 유틸리티 메서드 ===

    // 제네릭 요청 실행기
    _executeRequest: async (requestKey, apiFunction) => {
      set((state) => {
        state.requests[requestKey] = {
          status: REQUEST_STATUS.LOADING,
          error: null,
        };
      });

      try {
        const result = await apiFunction();

        set((state) => {
          state.requests[requestKey] = {
            status: REQUEST_STATUS.SUCCESS,
            error: null,
          };
        });

        return result;
      } catch (error) {
        set((state) => {
          state.requests[requestKey] = {
            status: REQUEST_STATUS.ERROR,
            error: error.message,
          };
        });

        throw error;
      }
    },

    // 알림 헬퍼 (실제로는 별도 스토어나 외부 서비스)
    _notifySuccess: (message) => {
      console.log("✅ Success:", message);
    },

    _notifyError: (message) => {
      console.log("❌ Error:", message);
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