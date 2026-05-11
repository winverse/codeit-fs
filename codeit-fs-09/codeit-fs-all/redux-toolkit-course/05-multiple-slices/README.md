# Chapter 05: Multiple Slices Management
# Redux Toolkit에서 여러 슬라이스 조합한 복합 상태 관리

Redux Toolkit 과정의 다섯 번째 챕터에서는 **여러 slice를 효율적으로 조합하여 복잡한 애플리케이션 상태를 관리**하는 방법을 학습합니다.

## 🎯 학습 목표

- **여러 slice 간의 관계 설계**: 독립성과 상호작용의 균형
- **정규화된 상태 구조**: entities 패턴으로 효율적인 데이터 관리  
- **크로스 슬라이스 선택자**: createSelector로 복잡한 데이터 조합
- **복합 필터링 시스템**: 다차원 필터로 정교한 데이터 검색
- **비동기 thunk와 slice 연동**: createAsyncThunk 활용

## 📁 프로젝트 구조

```
05-multiple-slices/
├── starter/          # 다중 slice 기본 구조
├── solution/         # 블로그 시스템 완전 구현  
├── challenge/        # 프로젝트 관리 시스템
└── README.md         # 이 파일
```

## 🚀 Starter 프로젝트

**목적**: 여러 slice가 독립적으로 작동하는 기본 구조 이해

### 핵심 특징

- **3개 독립 slice**: counter, todos, users
- **기본 선택자**: 각 slice별 간단한 데이터 조회
- **상태 격리**: slice 간 의존성 없는 구조

### 주요 학습 포인트

```javascript
// store/store.js - 여러 slice 결합
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer, 
    users: usersReducer,
  },
});

// 각 slice별 독립적인 상태 관리
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    // ...
  },
});
```

### 실행 방법

```bash
cd starter
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (✓ built in 920ms)
```

## 🎯 Solution 프로젝트  

**목적**: 관계형 데이터를 가진 실제 블로그 시스템 구현

### 핵심 특징

- **정규화된 상태**: users, posts, comments의 관계형 구조
- **복합 선택자**: 여러 slice 데이터를 조합하는 선택자
- **참조 무결성**: 사용자-게시글-댓글 간 관계 유지

### 상태 구조 설계

```javascript
// 정규화된 구조 예시
state = {
  users: {
    items: { '1': { id: '1', name: 'Alice' } },
    ids: ['1']
  },
  posts: {
    items: { '1': { id: '1', title: 'Post', authorId: '1' } },
    ids: ['1']
  },
  comments: {
    items: { '1': { id: '1', text: 'Comment', postId: '1', authorId: '1' } },
    ids: ['1']
  }
}
```

### 크로스 슬라이스 선택자

```javascript
// 게시글과 작성자 정보를 함께 조회
export const selectPostsWithAuthors = createSelector(
  [selectAllPosts, selectAllUsers],
  (posts, users) => {
    return posts.map(post => ({
      ...post,
      author: users.find(user => user.id === post.authorId)
    }));
  }
);
```

### 실행 방법

```bash
cd solution
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (✓ built in 1.29s)
```

## 🔥 Challenge 프로젝트

**목적**: 엔터프라이즈급 프로젝트 관리 시스템 구현

### 고급 기능들

1. **4개 복합 slice**: projects, tasks, members, statistics
2. **비동기 작업**: createAsyncThunk로 API 호출 시뮬레이션
3. **복잡한 필터링**: 다차원 필터 조합 시스템
4. **실시간 통계**: 메모이제이션된 계산 선택자
5. **탭 기반 UI**: 단일 앱에서 다중 도메인 관리

### 아키텍처 하이라이트

```javascript
// 정규화된 entities 패턴
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: {},     // { [id]: project }
    ids: [],       // [id1, id2, ...]
    loading: false,
    error: null,
    selectedProjectId: null,
  },
  // ...
});

// 비동기 thunk 액션
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await simulateApiCall(mockData);
    return response;
  }
);

// 복합 통계 선택자
export const selectOverallStatistics = createSelector(
  [selectAllTasks, selectAllMembers, selectAllProjects],
  (tasks, members, projects) => {
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      // ... 복잡한 계산 로직
    };
  }
);
```

### 특별한 기능들

- **크로스 슬라이스 데이터 조합**: tasks + members + projects
- **동적 필터링**: 상태/우선순위/담당자별 실시간 필터
- **통계 대시보드**: 생산성/진행률/워크로드 분석
- **상태 간 연동**: 프로젝트 삭제 시 관련 할 일 자동 정리

### 실행 방법

```bash
cd challenge
npm install
npm run dev      # http://localhost:5173
npm run build    # 프로덕션 빌드 (✓ built in 2.40s)
```

## 🏗 상태 설계 패턴

### 1. 독립성 vs 연관성

```javascript
// ✅ Good: 적절한 분리
{
  users: { /* 사용자 도메인 */ },
  posts: { /* 게시글 도메인 */ },
  ui: { /* UI 상태는 별도 관리 */ }
}

// ❌ Bad: 과도한 중첩
{
  app: {
    users: { /* ... */ },
    posts: { /* ... */ }
  }
}
```

### 2. 정규화 패턴

```javascript
// ✅ 정규화된 구조
{
  items: { [id]: entity },  // 빠른 조회
  ids: [id1, id2, ...],     // 순서 유지
  loading: boolean,         // 비동기 상태
  error: string | null      // 에러 처리
}
```

### 3. 선택자 조합 패턴

```javascript
// 기본 선택자
export const selectAllTasks = (state) => 
  state.tasks.ids.map(id => state.tasks.items[id]);

// 조합 선택자
export const selectTasksWithAssignees = createSelector(
  [selectAllTasks, selectAllMembers],
  (tasks, members) => {
    // 메모이제이션으로 성능 최적화
    return tasks.map(task => ({
      ...task,
      assignee: members.find(m => m.id === task.assigneeId)
    }));
  }
);
```

## 🔧 개발 패턴 & 베스트 프랙티스

### 1. Slice 설계 원칙

```javascript
// ✅ 단일 책임 원칙
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // 사용자 관련 액션만 처리
    addUser: (state, action) => { /* ... */ },
    updateUser: (state, action) => { /* ... */ },
  },
});

// ✅ 명확한 액션 이름
dispatch(addUser({ name, email }));      // 명확함
dispatch(update({ type: 'user' }));      // 모호함 ❌
```

### 2. 선택자 최적화

```javascript
// ✅ createSelector로 메모이제이션
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilter],
  (tasks, filter) => {
    // 의존성이 바뀔 때만 재계산
    return tasks.filter(task => matchesFilter(task, filter));
  }
);

// ❌ 매번 새 배열 생성
export const selectFilteredTasks = (state) => 
  selectAllTasks(state).filter(task => 
    matchesFilter(task, selectFilter(state))
  );
```

### 3. 에러 처리 패턴

```javascript
// extraReducers에서 일관된 에러 처리
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      // 데이터 업데이트
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
```

## � 성능 최적화 전략

### 1. 선택자 메모이제이션

- `createSelector` 사용으로 불필요한 재계산 방지
- 복잡한 변환 로직을 선택자로 분리
- 의존성 배열 최소화

### 2. 정규화의 이점

- O(1) 시간복잡도로 개체 조회
- 중복 데이터 제거로 메모리 효율성
- 부분 업데이트로 렌더링 최적화

### 3. 컴포넌트 분리

```javascript
// ✅ 관심사 분리
function TaskList() {
  const tasks = useSelector(selectFilteredTasks);
  return tasks.map(task => <TaskItem key={task.id} task={task} />);
}

function TaskItem({ task }) {
  // 개별 아이템만 구독
  return <div>{task.title}</div>;
}
```

## 🧪 테스트 전략

### 빌드 테스트 결과

```bash
# Starter 프로젝트
✓ built in 920ms

# Solution 프로젝트  
✓ built in 1.29s

# Challenge 프로젝트
✓ built in 2.40s
```

### 기능 테스트

각 프로젝트에서 다음 시나리오를 확인:

1. **데이터 조회**: 선택자가 올바른 데이터 반환
2. **상태 업데이트**: 액션 디스패치 후 상태 변경
3. **관계 유지**: 연관 데이터 간 일관성 보장
4. **에러 처리**: 비정상 상황에서의 견고함

## 🎓 학습 권장 사항

### 1. 순차적 학습

1. **Starter**: 기본 다중 slice 구조 이해
2. **Solution**: 관계형 데이터 패턴 학습  
3. **Challenge**: 엔터프라이즈 패턴 응용

### 2. 실습 포인트

- 새로운 slice 추가해보기
- 크로스 슬라이스 선택자 작성
- 복잡한 필터링 로직 구현
- 비동기 작업과 에러 처리

### 3. 확장 아이디어

- 실시간 알림 시스템 추가
- 데이터 캐싱 전략 구현
- 옵티미스틱 업데이트 패턴
- 오프라인 상태 처리

## 🔗 다음 단계

이 챕터를 완료하면 다음을 학습할 준비가 됩니다:

- **Chapter 06**: extraReducers 고급 패턴
- **Chapter 07**: createAsyncThunk 심화
- **Chapter 08**: 고급 비동기 패턴
- **Chapter 09**: thunk API 유틸리티

## 💡 핵심 개념 정리

### 이번 챕터에서 마스터한 내용

1. **Multiple Slices**: 도메인별 상태 분리와 조합
2. **Normalized State**: entities 패턴으로 효율적인 데이터 구조
3. **Cross-Slice Selectors**: createSelector로 복합 데이터 조회
4. **Complex Filtering**: 다차원 필터 시스템 구현
5. **Async Integration**: createAsyncThunk와 slice 연동

### 실무 적용 가능한 패턴들

- 대규모 애플리케이션의 상태 아키텍처 설계
- 성능을 고려한 선택자 최적화
- 복잡한 비즈니스 로직의 Redux 패턴화
- 사용자 경험을 고려한 로딩/에러 상태 관리

---

**Redux Toolkit 여러 슬라이스 관리를 완전히 마스터했습니다!** 🎉

이제 여러분은 복잡한 실무 프로젝트에서도 확장 가능하고 유지보수하기 쉬운 Redux 애플리케이션을 설계할 수 있습니다.

## 강의 시연 스크립트

### 1단계: 사용자 관리 slice 생성

`src/features/users/usersSlice.js` 파일을 생성합니다:

```javascript
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
      state.ids.push(user.id);
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
```

### 2단계: 게시글 관리 slice 생성

`src/features/posts/postsSlice.js` 파일을 생성합니다:

```javascript
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
        id: Date.now(), // 실제 앱에서는 서버에서 생성
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
```

### 3단계: 댓글 관리 slice 생성

`src/features/comments/commentsSlice.js` 파일을 생성합니다:

```javascript
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
```

### 4단계: 통합 스토어 구성

`src/app/store.js` 파일을 업데이트합니다:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/usersSlice";
import postsReducer from "@/features/posts/postsSlice";
import commentsReducer from "@/features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Store 타입 추론을 위한 유틸리티
export const selectRootState = (state) => state;
```

### 5단계: 통합 훅 생성

`src/app/hooks.js` 파일을 업데이트합니다:

```javascript
import { useDispatch, useSelector } from "react-redux";

// 기본 훅들을 재사용하기 쉽게 래핑
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// 자주 사용되는 selector를 위한 커스텀 훅들
export function useCurrentUser() {
  return useAppSelector((state) => {
    const currentUserId = state.users.currentUserId;
    return currentUserId ? state.users.entities[currentUserId] : null;
  });
}

export function usePostWithAuthor(postId) {
  return useAppSelector((state) => {
    const post = state.posts.entities[postId];
    if (!post) return null;

    const author = state.users.entities[post.authorId];
    return { ...post, author };
  });
}

export function usePostsWithAuthors() {
  return useAppSelector((state) => {
    const posts = state.posts.ids.map((id) => state.posts.entities[id]);
    return posts.map((post) => ({
      ...post,
      author: state.users.entities[post.authorId] || { name: "Unknown" },
      commentsCount: state.comments.byPostId[post.id]?.length || 0,
    }));
  });
}
```

### 6단계: 블로그 대시보드 컴포넌트 생성

`src/components/BlogDashboard.jsx` 파일을 생성합니다:

```javascript
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  usePostsWithAuthors,
} from "@/app/hooks";
import { addUser, setCurrentUser } from "@/features/users/usersSlice";
import { addPost, selectPost } from "@/features/posts/postsSlice";
import { PostList } from "@/features/posts/PostList";
import { PostForm } from "@/features/posts/PostForm";
import { UserSelector } from "@/features/users/UserSelector";
import styles from "./BlogDashboard.module.css";

export function BlogDashboard() {
  const dispatch = useAppDispatch();
  const posts = usePostsWithAuthors();
  const currentUser = useAppSelector((state) =>
    state.users.currentUserId
      ? state.users.entities[state.users.currentUserId]
      : null
  );

  // 초기 데이터 설정
  useEffect(() => {
    // 샘플 사용자 데이터
    const sampleUsers = [
      { id: 1, name: "김개발", email: "kim@example.com", avatar: "👨‍💻" },
      { id: 2, name: "박디자인", email: "park@example.com", avatar: "👩‍🎨" },
      { id: 3, name: "이기획", email: "lee@example.com", avatar: "👨‍💼" },
    ];

    sampleUsers.forEach((user) => {
      dispatch(addUser(user));
    });

    // 기본 사용자 설정
    dispatch(setCurrentUser(1));

    // 샘플 게시글 데이터
    const samplePosts = [
      {
        title: "Redux Toolkit 시작하기",
        content:
          "Redux Toolkit을 사용하면 Redux 코드를 훨씬 간단하게 작성할 수 있습니다.",
        authorId: 1,
        status: "published",
        tags: ["Redux", "JavaScript", "Frontend"],
      },
      {
        title: "리액트 성능 최적화",
        content: "React 앱의 성능을 향상시키는 다양한 기법들을 알아봅시다.",
        authorId: 2,
        status: "draft",
        tags: ["React", "Performance", "Optimization"],
      },
    ];

    samplePosts.forEach((post) => {
      dispatch(addPost(post));
    });
  }, [dispatch]);

  const handleCreatePost = (postData) => {
    if (currentUser) {
      dispatch(
        addPost({
          ...postData,
          authorId: currentUser.id,
          status: "draft",
          tags: postData.tags || [],
        })
      );
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>블로그 대시보드</h1>
        <UserSelector />
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <PostForm onSubmit={handleCreatePost} />
        </aside>

        <main className={styles.main}>
          <PostList posts={posts} />
        </main>
      </div>
    </div>
  );
}
```

### 7단계: 사용자 선택기 컴포넌트

`src/features/users/UserSelector.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectAllUsers,
  selectCurrentUser,
  setCurrentUser,
} from "./usersSlice";
import styles from "./UserSelector.module.css";

export function UserSelector() {
  const users = useAppSelector(selectAllUsers);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleUserChange = (event) => {
    const userId = parseInt(event.target.value);
    dispatch(setCurrentUser(userId));
  };

  return (
    <div className={styles.userSelector}>
      <label htmlFor="user-select">현재 사용자:</label>
      <select
        id="user-select"
        value={currentUser?.id || ""}
        onChange={handleUserChange}
        className={styles.select}
      >
        <option value="">사용자 선택</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.avatar} {user.name}
          </option>
        ))}
      </select>
      {currentUser && (
        <span className={styles.currentUser}>
          {currentUser.avatar} {currentUser.name}
        </span>
      )}
    </div>
  );
}
```

### 8단계: 게시글 목록 컴포넌트

`src/features/posts/PostList.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectFilteredPosts,
  setPostsFilter,
  setPostsSort,
  deletePost,
  togglePostStatus,
  selectPost,
} from "./postsSlice";
import { selectCommentsCountByPostId } from "@/features/comments/commentsSlice";
import { PostItem } from "./PostItem";
import styles from "./PostList.module.css";

export function PostList() {
  const posts = useAppSelector(selectFilteredPosts);
  const filter = useAppSelector((state) => state.posts.filter);
  const sortBy = useAppSelector((state) => state.posts.sortBy);
  const sortOrder = useAppSelector((state) => state.posts.sortOrder);
  const dispatch = useAppDispatch();

  const handleFilterChange = (newFilter) => {
    dispatch(setPostsFilter(newFilter));
  };

  const handleSortChange = (newSortBy) => {
    const newSortOrder =
      sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setPostsSort({ sortBy: newSortBy, sortOrder: newSortOrder }));
  };

  return (
    <div className={styles.postList}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <button
            onClick={() => handleFilterChange("all")}
            className={filter === "all" ? styles.active : ""}
          >
            전체
          </button>
          <button
            onClick={() => handleFilterChange("published")}
            className={filter === "published" ? styles.active : ""}
          >
            게시됨
          </button>
          <button
            onClick={() => handleFilterChange("draft")}
            className={filter === "draft" ? styles.active : ""}
          >
            초안
          </button>
        </div>

        <div className={styles.sorting}>
          <button onClick={() => handleSortChange("createdAt")}>
            날짜순 {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button onClick={() => handleSortChange("title")}>
            제목순 {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      <div className={styles.posts}>
        {posts.length === 0 ? (
          <p className={styles.empty}>게시글이 없습니다.</p>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
```

## 챌린지 과제

### 미션

`challenge` 폴더에서 다음 과제를 수행해보세요:

1. **전자상거래 앱 구현하기**

   - 상품(products), 카테고리(categories), 장바구니(cart), 주문(orders) slice 생성
   - 각 slice 간 관계성을 고려한 정규화된 상태 구조 설계
   - 복합 selector와 크로스 도메인 로직 구현

2. **상태 분석 대시보드 추가하기**
   - 전체 애플리케이션 상태의 통계 정보 표시
   - 각 slice별 데이터 개수, 상태 변화 추적
   - 성능 모니터링을 위한 selector 최적화

### 확인하기

- [ ] 사용자 추가/수정/삭제 기능이 정상 작동하는가?
- [ ] 게시글 CRUD 기능이 정상 작동하는가?
- [ ] 댓글과 게시글의 연관 관계가 올바르게 관리되는가?
- [ ] 필터링과 정렬 기능이 정상 작동하는가?
- [ ] 현재 사용자 변경 시 관련 UI가 적절히 업데이트되는가?
- [ ] 게시글 삭제 시 관련 댓글도 함께 삭제되는가?
- [ ] Redux DevTools에서 모든 상태 변화를 추적할 수 있는가?
- [ ] 각 slice가 독립적으로 동작하면서도 필요시 협력하는가?
