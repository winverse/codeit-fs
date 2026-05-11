# 5. 비동기 작업 처리하기

실제 웹 애플리케이션에서는 서버 API 호출, 데이터 페칭, 파일 업로드 등 다양한 비동기 작업을 처리해야 합니다. 이번 챕터에서는 Zustand를 사용하여 비동기 작업을 효과적으로 관리하는 방법을 학습합니다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있게 됩니다:

- Zustand 스토어에서 비동기 액션 구현하기
- 로딩 상태와 에러 상태를 체계적으로 관리하기
- API 호출 결과를 상태에 저장하고 활용하기
- 재시도(retry) 메커니즘 구현하기
- 비동기 작업의 성능 최적화 기법 적용하기

## 주요 개념

### 1. 비동기 상태 패턴

#### 기본 패턴 (Loading, Error, Data)

```javascript
const useApiStore = create((set, get) => ({
  // 상태
  data: null,
  loading: false,
  error: null,

  // 액션
  fetchData: async (params) => {
    set({ loading: true, error: null });

    try {
      const data = await apiCall(params);
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
```

#### 고급 패턴 (Multiple States)

```javascript
const useAdvancedApiStore = create((set, get) => ({
  // 각 엔드포인트별 상태 관리
  states: {
    users: { data: [], loading: false, error: null, lastFetch: null },
    posts: { data: [], loading: false, error: null, lastFetch: null },
  },

  // 제네릭 API 호출 헬퍼
  callAPI: async (key, apiFunction, ...args) => {
    set((state) => ({
      states: {
        ...state.states,
        [key]: { ...state.states[key], loading: true, error: null },
      },
    }));

    try {
      const data = await apiFunction(...args);
      set((state) => ({
        states: {
          ...state.states,
          [key]: {
            ...state.states[key],
            data,
            loading: false,
            lastFetch: Date.now(),
          },
        },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        states: {
          ...state.states,
          [key]: { ...state.states[key], error: error.message, loading: false },
        },
      }));
      throw error;
    }
  },
}));
```

### 2. 캐싱 전략

#### Time-based Caching

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5분

const isCacheValid = (lastFetch, duration = CACHE_DURATION) => {
  return lastFetch && Date.now() - lastFetch < duration;
};

// 사용
const fetchUsers = async (force = false) => {
  const { states } = get();
  const userState = states.users;

  if (
    !force &&
    userState.data.length > 0 &&
    isCacheValid(userState.lastFetch)
  ) {
    return userState.data; // 캐시된 데이터 반환
  }

  return await get().callAPI("users", fetchUsersAPI);
};
```

### 3. 요청 중복 제거 (Deduplication)

```javascript
const pendingRequests = new Map();

const deduplicatedFetch = async (key, apiFunction, ...args) => {
  // 이미 진행 중인 요청이 있다면 그 결과를 기다림
  if (pendingRequests.has(key)) {
    return await pendingRequests.get(key);
  }

  const promise = apiFunction(...args);
  pendingRequests.set(key, promise);

  try {
    const result = await promise;
    pendingRequests.delete(key);
    return result;
  } catch (error) {
    pendingRequests.delete(key);
    throw error;
  }
};
```

## 강의 시연 스크립트

### 단계 1: 소셜 미디어 앱 비동기 스토어

실무에서 자주 사용되는 소셜 미디어 앱의 비동기 데이터 관리를 구현해보겠습니다.

`src/stores/socialStore.js`:

```javascript
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

    // 전체 로딩 상태 (하나라도 로딩 중이면 true)
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
```

**💬 설명 포인트:**

- 요청 상태를 체계적으로 관리하는 패턴
- 캐싱과 중복 요청 방지 메커니즘
- 낙관적 업데이트 (삭제 기능)
- 정규화된 데이터 구조에 API 응답 저장

### 단계 2: 커스텀 Async 훅

복잡한 비동기 로직을 추상화한 재사용 가능한 훅을 만들어보겠습니다.

`src/hooks/useAsyncOperation.js`:

```javascript
import { useState, useCallback, useRef, useEffect } from "react";

export function useAsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (asyncFunction, ...args) => {
    // 이전 요청이 있다면 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController 생성
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(
        {
          signal: abortController.signal,
          ...args[0],
        },
        ...args.slice(1)
      );

      // 요청이 취소되지 않았다면 결과 저장
      if (!abortController.signal.aborted) {
        setData(result);
        setLoading(false);
        return result;
      }
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err.message);
        setLoading(false);
        throw err;
      }
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  // 컴포넌트 언마운트 시 요청 취소
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
  };
}

// 재시도 기능이 포함된 버전
export function useAsyncOperationWithRetry(maxRetries = 3, retryDelay = 1000) {
  const baseHook = useAsyncOperation();
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(
    async (asyncFunction, ...args) => {
      let lastError = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await baseHook.execute(asyncFunction, ...args);
          setRetryCount(0); // 성공 시 재시도 카운트 초기화
          return result;
        } catch (error) {
          lastError = error;
          setRetryCount(attempt + 1);

          // 마지막 시도가 아니라면 대기 후 재시도
          if (attempt < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * Math.pow(2, attempt))
            ); // 지수 백오프
          }
        }
      }

      throw lastError;
    },
    [baseHook.execute, maxRetries, retryDelay]
  );

  return {
    ...baseHook,
    execute: executeWithRetry,
    retryCount,
    maxRetries,
  };
}
```

### 단계 3: 실시간 데이터 스토어

WebSocket을 활용한 실시간 데이터 업데이트를 구현해보겠습니다.

`src/stores/realTimeStore.js`:

```javascript
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

class WebSocketManager {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
    this.isConnecting = false;
  }

  connect(url) {
    if (
      this.isConnecting ||
      (this.ws && this.ws.readyState === WebSocket.OPEN)
    ) {
      return Promise.resolve();
    }

    this.isConnecting = true;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log("🔌 WebSocket 연결됨");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("WebSocket 메시지 파싱 오류:", error);
        }
      };

      this.ws.onclose = (event) => {
        console.log("🔌 WebSocket 연결 종료됨", event.code);
        this.isConnecting = false;

        // 정상 종료가 아닌 경우 재연결 시도
        if (
          event.code !== 1000 &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          setTimeout(() => {
            this.reconnectAttempts++;
            console.log(
              `🔄 재연결 시도 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
            );
            this.connect(url);
          }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
        }
      };

      this.ws.onerror = (error) => {
        console.error("🔌 WebSocket 오류:", error);
        this.isConnecting = false;
        reject(error);
      };
    });
  }

  handleMessage(data) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach((callback) => callback(payload));
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);

    // 구독 해제 함수 반환
    return () => {
      const listeners = this.listeners.get(eventType) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket이 연결되지 않음");
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000); // 정상 종료
      this.ws = null;
    }
    this.listeners.clear();
  }
}

const wsManager = new WebSocketManager();

export const useRealTimeStore = create(
  subscribeWithSelector((set, get) => ({
    // 연결 상태
    connectionStatus: "disconnected", // 'disconnected', 'connecting', 'connected', 'error'

    // 실시간 데이터
    onlineUsers: [],
    liveNotifications: [],

    // 연결 관리
    connect: async () => {
      set({ connectionStatus: "connecting" });

      try {
        await wsManager.connect("wss://your-websocket-server.com");
        set({ connectionStatus: "connected" });

        // 이벤트 리스너 설정
        get().setupEventListeners();
      } catch (error) {
        set({ connectionStatus: "error" });
        console.error("WebSocket 연결 실패:", error);
      }
    },

    disconnect: () => {
      wsManager.disconnect();
      set({
        connectionStatus: "disconnected",
        onlineUsers: [],
        liveNotifications: [],
      });
    },

    setupEventListeners: () => {
      // 사용자 상태 업데이트
      wsManager.subscribe("user:online", (user) => {
        set((state) => ({
          onlineUsers: [
            ...state.onlineUsers.filter((u) => u.id !== user.id),
            user,
          ],
        }));
      });

      wsManager.subscribe("user:offline", (userId) => {
        set((state) => ({
          onlineUsers: state.onlineUsers.filter((u) => u.id !== userId),
        }));
      });

      // 실시간 알림
      wsManager.subscribe("notification:new", (notification) => {
        set((state) => ({
          liveNotifications: [notification, ...state.liveNotifications].slice(
            0,
            50
          ), // 최대 50개
        }));

        // 브라우저 알림 (권한이 있는 경우)
        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/icon.png",
          });
        }
      });

      // 포스트 실시간 업데이트 (다른 스토어와 연동)
      wsManager.subscribe("post:created", (post) => {
        // 소셜 스토어 업데이트
        const socialStore = useSocialStore.getState();
        socialStore.entities.posts[post.id] = post;
      });

      wsManager.subscribe("post:updated", (updatedPost) => {
        const socialStore = useSocialStore.getState();
        if (socialStore.entities.posts[updatedPost.id]) {
          socialStore.entities.posts[updatedPost.id] = updatedPost;
        }
      });

      wsManager.subscribe("post:deleted", (postId) => {
        const socialStore = useSocialStore.getState();
        delete socialStore.entities.posts[postId];
      });
    },

    // 메시지 전송
    sendMessage: (type, payload) => {
      wsManager.send({ type, payload });
    },

    // 알림 관리
    markNotificationAsRead: (notificationId) => {
      set((state) => ({
        liveNotifications: state.liveNotifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        ),
      }));

      // 서버에도 읽음 처리 전송
      wsManager.send({
        type: "notification:read",
        payload: { notificationId },
      });
    },

    clearNotifications: () => {
      set({ liveNotifications: [] });
    },

    // 사용자 상태 조회
    isUserOnline: (userId) => {
      return get().onlineUsers.some((user) => user.id === userId);
    },

    getUnreadNotifications: () => {
      return get().liveNotifications.filter((n) => !n.isRead);
    },
  }))
);

// 브라우저 알림 권한 요청
export async function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return Notification.permission === "granted";
}
```

### 단계 4: 컴포넌트에서 활용

실제 컴포넌트에서 비동기 스토어들을 활용하는 방법을 보여줍니다.

`src/components/PostFeed/PostFeed.jsx`:

```javascript
import { useEffect, useState, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { useSocialStore } from "@/stores/socialStore";
import { useRealTimeStore } from "@/stores/realTimeStore";
import { useAsyncOperationWithRetry } from "@/hooks/useAsyncOperation";
import { PostCard } from "./PostCard";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import styles from "./PostFeed.module.css";

export function PostFeed() {
  const [posts, isLoading, fetchPosts, hasNextPage, nextCursor] =
    useSocialStore(
      useShallow((state) => [
        Object.values(state.entities.posts).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
        state.isLoading("fetchPosts"),
        state.fetchPosts,
        state.meta.posts.hasNextPage,
        state.meta.posts.nextCursor,
      ])
    );

  const connectionStatus = useRealTimeStore((state) => state.connectionStatus);

  // 무한 스크롤을 위한 async 훅
  const {
    loading: loadingMore,
    error: loadMoreError,
    execute: executeLoadMore,
  } = useAsyncOperationWithRetry(3, 1000);

  // 새로고침을 위한 async 훅
  const {
    loading: refreshing,
    error: refreshError,
    execute: executeRefresh,
  } = useAsyncOperationWithRetry(2, 500);

  // 초기 데이터 로딩
  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts.length]);

  // 더 많은 포스트 로딩
  const loadMorePosts = useCallback(async () => {
    if (!hasNextPage || loadingMore) return;

    try {
      await executeLoadMore(fetchPosts, { cursor: nextCursor });
    } catch (error) {
      console.error("더 많은 포스트 로딩 실패:", error);
    }
  }, [hasNextPage, loadingMore, executeLoadMore, fetchPosts, nextCursor]);

  // 새로고침
  const refreshPosts = useCallback(async () => {
    try {
      await executeRefresh(fetchPosts, { force: true });
    } catch (error) {
      console.error("새로고침 실패:", error);
    }
  }, [executeRefresh, fetchPosts]);

  // 스크롤 이벤트 (무한 스크롤)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts]);

  // 에러 상태 처리
  const error = useSocialStore((state) => state.getError("fetchPosts"));

  if (error && posts.length === 0) {
    return (
      <ErrorMessage
        title="포스트를 불러올 수 없습니다"
        message={error}
        onRetry={() => fetchPosts({ force: true })}
      />
    );
  }

  return (
    <div className={styles.feed}>
      {/* 연결 상태 표시 */}
      <div className={styles.status}>
        <span className={`${styles.indicator} ${styles[connectionStatus]}`} />
        실시간 업데이트: {connectionStatus === "connected"
          ? "연결됨"
          : "연결 안됨"}
      </div>

      {/* 새로고침 버튼 */}
      <div className={styles.actions}>
        <button
          onClick={refreshPosts}
          disabled={refreshing || isLoading}
          className={styles.refreshButton}
        >
          {refreshing ? <LoadingSpinner size="small" /> : "🔄"}
          새로고침
        </button>
        {refreshError && <span className={styles.error}>{refreshError}</span>}
      </div>

      {/* 포스트 목록 */}
      <div className={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* 로딩 상태 */}
        {isLoading && posts.length === 0 && (
          <div className={styles.loading}>
            <LoadingSpinner />
            <p>포스트를 불러오는 중...</p>
          </div>
        )}

        {/* 더 로딩 버튼/상태 */}
        {hasNextPage && (
          <div className={styles.loadMore}>
            {loadingMore ? (
              <LoadingSpinner />
            ) : (
              <button onClick={loadMorePosts} className={styles.loadMoreButton}>
                더 많은 포스트 보기
              </button>
            )}
            {loadMoreError && (
              <ErrorMessage
                message={loadMoreError}
                onRetry={loadMorePosts}
                compact
              />
            )}
          </div>
        )}

        {/* 모든 포스트를 다 본 경우 */}
        {!hasNextPage && posts.length > 0 && (
          <div className={styles.endMessage}>
            🎉 모든 포스트를 다 보셨습니다!
          </div>
        )}
      </div>
    </div>
  );
}
```

## 챌린지 과제

### 미션

**날씨 대시보드 앱**을 구축하여 비동기 데이터 관리의 다양한 패턴을 적용해보세요!

#### 요구사항:

1. **WeatherStore**: 날씨 데이터 관리

   - 현재 위치 날씨
   - 5일 예보
   - 여러 도시 날씨 비교
   - 캐싱 (30분)

2. **기능 구현**:

   - 위치 기반 자동 날씨 조회
   - 도시 검색 및 즐겨찾기
   - 백그라운드 자동 새로고침
   - 오프라인 모드 (캐시 활용)

3. **고급 패턴**:
   - 중복 API 호출 방지
   - 재시도 로직 (네트워크 오류 시)
   - 낙관적 업데이트 (즐겨찾기)
   - 실시간 업데이트 (WebSocket으로 기상 경보)

#### API 구조:

```javascript
// 날씨 API 응답
{
  current: {
    temperature: 23,
    condition: "sunny",
    humidity: 65,
    windSpeed: 5.2,
    location: { name: "Seoul", country: "KR" }
  },
  forecast: [
    {
      date: "2024-01-01",
      high: 25,
      low: 15,
      condition: "partly-cloudy",
      precipitation: 10
    }
  ]
}
```

#### 성능 최적화:

- [ ] API 응답 캐싱 (30분)
- [ ] 중복 요청 제거
- [ ] 백그라운드 새로고침
- [ ] 지능적 재시도 (지수 백오프)
- [ ] 오프라인 감지 및 처리

### 확인하기

- [ ] 로딩 상태가 적절히 표시되는가?
- [ ] 에러 상황에서 사용자 친화적인 메시지가 표시되는가?
- [ ] 네트워크 실패 시 재시도가 작동하는가?
- [ ] 캐시된 데이터가 효율적으로 활용되는가?
- [ ] 실시간 업데이트가 정상 작동하는가?

---

## 비동기 패턴 베스트 프랙티스

### 1. 에러 처리 전략

```javascript
// 계층적 에러 처리
const ERROR_TYPES = {
  NETWORK: "network",
  VALIDATION: "validation",
  AUTH: "authentication",
  SERVER: "server",
  UNKNOWN: "unknown",
};

function categorizeError(error) {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return ERROR_TYPES.NETWORK;
  }

  if (error.status === 401) {
    return ERROR_TYPES.AUTH;
  }

  if (error.status >= 400 && error.status < 500) {
    return ERROR_TYPES.VALIDATION;
  }

  if (error.status >= 500) {
    return ERROR_TYPES.SERVER;
  }

  return ERROR_TYPES.UNKNOWN;
}
```

### 2. 요청 취소 패턴

```javascript
// AbortController 활용
const createCancellableRequest = (apiFunction) => {
  let currentController = null;

  return async (...args) => {
    // 이전 요청 취소
    if (currentController) {
      currentController.abort();
    }

    // 새 컨트롤러 생성
    currentController = new AbortController();

    try {
      return await apiFunction(
        {
          signal: currentController.signal,
          ...args[0],
        },
        ...args.slice(1)
      );
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request cancelled");
        return null;
      }
      throw error;
    } finally {
      currentController = null;
    }
  };
};
```

### 3. 배치 처리 패턴

```javascript
// 여러 요청을 효율적으로 배치 처리
class RequestBatcher {
  constructor(batchSize = 5, delay = 100) {
    this.batchSize = batchSize;
    this.delay = delay;
    this.queue = [];
    this.timer = null;
  }

  add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });

      if (this.queue.length >= this.batchSize) {
        this.flush();
      } else {
        this.scheduleFlush();
      }
    });
  }

  scheduleFlush() {
    if (this.timer) return;

    this.timer = setTimeout(() => {
      this.flush();
    }, this.delay);
  }

  async flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const batch = this.queue.splice(0, this.batchSize);

    if (batch.length === 0) return;

    try {
      const results = await Promise.allSettled(
        batch.map(({ request }) => request())
      );

      batch.forEach(({ resolve, reject }, index) => {
        const result = results[index];
        if (result.status === "fulfilled") {
          resolve(result.value);
        } else {
          reject(result.reason);
        }
      });
    } catch (error) {
      batch.forEach(({ reject }) => reject(error));
    }
  }
}
```

---

## 다음 챕터 미리보기

다음 챕터 **"Middleware and Advanced"**에서는:

- Zustand의 강력한 미들웨어 시스템
- 커스텀 미들웨어 개발
- DevTools 통합과 디버깅
- 타입 안전성과 고급 TypeScript 패턴 (참고용)

비동기 작업을 마스터했다면, 이제 Zustand의 모든 고급 기능을 활용해 전문가 수준의 상태 관리를 구현해보겠습니다! 🚀
