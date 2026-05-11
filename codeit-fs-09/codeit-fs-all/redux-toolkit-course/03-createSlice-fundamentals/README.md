# 3. createSlice 기본

createSlice는 Redux Toolkit의 핵심 기능으로, 액션 생성자와 리듀서를 한 번에 정의할 수 있게 해줍니다. 이 챕터에서는 createSlice의 고급 기능인 prepare 함수와 복잡한 리듀서 패턴을 학습합니다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있게 됩니다:

- **prepare 함수 활용**: 액션 페이로드를 사전 처리하고 자동으로 메타데이터 생성
- **고급 리듀서 구현**: 여러 상태를 동시에 업데이트하는 복잡한 로직 작성
- **Immer 패턴 이해**: 중첩된 객체와 배열을 자연스럽게 다루는 방법
- **액션 생성자 커스터마이징**: 비즈니스 로직에 맞는 액션 인터페이스 설계

## 주요 개념

### 1. createSlice의 기본 구조

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    // 간단한 리듀서
    increment: (state) => {
      state.value += 1;
    },
    
    // prepare 함수가 있는 리듀서
    incrementByAmount: {
      prepare(amount) {
        return { payload: { amount } };
      },
      reducer(state, action) {
        state.value += action.payload.amount;
      },
    },
  },
});
```

### 2. prepare 함수의 역할

prepare 함수는 액션이 디스패치되기 전에 페이로드를 가공할 수 있게 해줍니다:

- **메타데이터 자동 생성**: ID, 타임스탬프 등
- **데이터 검증**: 입력값 유효성 검사
- **형태 변환**: 다양한 매개변수를 일관된 페이로드로 변환

```javascript
import { nanoid } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
});
```

### 3. Immer를 활용한 불변성 관리

Redux Toolkit은 내부적으로 Immer를 사용하여 불변성을 자동으로 처리합니다:

```javascript
// ❌ 기존 Redux 방식
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.payload.id 
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}

// ✅ Redux Toolkit + Immer 방식
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // 직접 변경해도 안전!
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed; // 직접 변경해도 안전!
      }
    },
  },
});
```

💡 **심화 학습: Immer의 동작 원리**

Immer는 Proxy를 사용해 변경사항을 추적하고, 실제로는 불변 업데이트를 수행합니다. 이로 인해 코드는 가변적으로 보이지만 실제로는 불변성이 유지됩니다.

## 강의 시연 스크립트

### 1단계: 기본 useState에서 시작 (starter 상태)

먼저 starter 프로젝트를 실행해보겠습니다. 현재는 로컬 useState를 사용한 카운터입니다.

```bash
npm install
npm run dev
```

코드를 살펴보면 `CounterAdvanced` 컴포넌트에서 복잡한 상태 관리를 useState로 하고 있습니다. 이를 Redux Toolkit으로 변환해보겠습니다.

### 2단계: counterSlice 생성

`src/store/counterSlice.js` 파일을 생성하고 createSlice로 리듀서를 만듭니다:

```javascript
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  history: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: {
      reducer(state) {
        const previousValue = state.value;
        state.value += 1;
        
        state.history.push({
          id: nanoid(),
          action: 'increment',
          previousValue,
          newValue: state.value,
          timestamp: new Date().toISOString(),
        });
      },
    },
  },
});
```

### 3단계: prepare 함수 추가

incrementByAmount 액션에 prepare 함수를 추가합니다:

```javascript
incrementByAmount: {
  prepare(amount) {
    return {
      payload: {
        amount,
        timestamp: new Date().toISOString(),
        id: nanoid(),
      },
    };
  },
  reducer(state, action) {
    const { amount, timestamp, id } = action.payload;
    const previousValue = state.value;
    state.value += amount;
    
    state.history.push({
      id,
      action: 'incrementByAmount',
      amount,
      previousValue,
      newValue: state.value,
      timestamp,
    });
  },
},
```

### 4단계: 복잡한 리듀서 - reset 액션

여러 상태를 동시에 업데이트하는 복잡한 리듀서를 구현합니다:

```javascript
reset: {
  prepare() {
    return {
      payload: {
        timestamp: new Date().toISOString(),
        id: nanoid(),
      },
    };
  },
  reducer(state, action) {
    const { timestamp, id } = action.payload;
    
    // 리셋 기록을 히스토리에 추가
    state.history.push({
      id,
      action: 'reset',
      previousValue: state.value,
      newValue: 0,
      timestamp,
      totalHistoryCleared: state.history.length,
    });
    
    // 상태 초기화
    state.value = 0;
    state.history = [state.history[state.history.length - 1]];
  },
},
```

### 5단계: 스토어 설정 및 컴포넌트 연동

스토어를 설정하고 컴포넌트에서 사용합니다:

```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

컴포넌트에서 Redux를 사용하도록 변경:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, incrementByAmount, reset } from '@/store/counterSlice.js';

export function CounterAdvanced() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.value);
  const history = useSelector(state => state.counter.history);
  
  // 이벤트 핸들러들
}
```

### 6단계: 추가 기능 구현

고급 기능들을 추가합니다:
- undoLastAction: 마지막 액션 되돌리기
- clearHistory: 히스토리만 지우기
- 셀렉터 함수들: 데이터 접근 최적화

## 챌린지 과제

### 미션

`challenge` 폴더에서 **게임 점수 관리 시스템**이 완전 구현되었습니다! 이 시스템은 다음 기능을 포함합니다:

1. **점수 시스템**: 다양한 방법으로 점수 획득 (적 처치, 보너스, 스테이지 클리어)
2. **생명 관리**: 생명 증가/감소 로직
3. **레벨 시스템**: 100점마다 자동 레벨업
4. **업적 시스템**: 특정 조건 달성 시 업적 해제
5. **게임 히스토리**: 모든 액션의 상세한 기록

### 핵심 요구사항

- **prepare 함수 활용**: 모든 액션에서 자동으로 ID와 타임스탬프 생성
- **복잡한 리듀서**: 한 액션에서 여러 상태 동시 업데이트
- **조건부 로직**: 업적 중복 방지, 레벨업 계산 등
- **Immer 패턴**: 중첩된 배열과 객체 자연스럽게 조작

### 확인하기

완성된 시스템에서 다음을 확인해보세요:

- [ ] 점수 증가 시 히스토리에 상세 정보가 기록되는가?
- [ ] 100점마다 레벨이 자동으로 올라가는가?
- [ ] 업적이 중복으로 해제되지 않는가?
- [ ] 게임 리셋이 올바르게 작동하는가?
- [ ] 모든 액션에 고유한 ID와 타임스탬프가 있는가?

---

**💡 학습 포인트**: 이 챕터의 핵심은 createSlice의 유연성을 이해하는 것입니다. prepare 함수로 액션을 풍부하게 만들고, Immer의 도움으로 복잡한 상태 업데이트를 간단하게 표현할 수 있습니다.

이 챕터에서는 Redux Toolkit의 핵심 함수인 `createSlice`를 깊이 있게 학습합니다. Reducer와 action creator를 동시에 생성하고, Immer를 활용한 불변성 관리의 혁신적인 방법을 체험해봅시다.

## 학습 목표

이 챕터를 완료하면 다음을 할 수 있습니다:

- `createSlice` 함수의 구조와 사용법 이해하기
- Immer를 활용한 직관적인 불변성 관리 체험하기
- 자동 생성되는 action creator 활용하기
- 복잡한 상태 구조에서 createSlice 적용하기

## 주요 개념

### createSlice의 핵심 기능

`createSlice`는 Redux Toolkit의 가장 중요한 함수로, 다음을 자동화합니다:

1. **Action Type 자동 생성**: `name/reducerName` 패턴으로 생성
2. **Action Creator 자동 생성**: reducer 이름과 동일한 함수 생성
3. **Immer 통합**: 불변성을 자동으로 관리
4. **TypeScript 지원**: 타입 추론과 안전성 제공

### Immer의 마법

Immer 덕분에 다음과 같은 직관적인 코드 작성이 가능합니다:

```javascript
// 전통적인 Redux (복잡함)
return {
  ...state,
  items: state.items.map((item) =>
    item.id === action.payload.id
      ? { ...item, completed: !item.completed }
      : item
  ),
};

// Redux Toolkit (간단함)
const item = state.items.find((item) => item.id === action.payload.id);
if (item) {
  item.completed = !item.completed;
}
```

💡 **심화 학습: Action Type 네이밍**
createSlice는 `name/reducerName` 형태로 액션 타입을 생성합니다. 예를 들어 name이 'todos'이고 reducer가 'addTodo'라면 액션 타입은 'todos/addTodo'가 됩니다.

## 강의 시연 스크립트

### 1단계: 기본 todo slice 생성

할 일 관리 애플리케이션을 위한 slice를 만들어봅시다.

`src/features/todos/todosSlice.js` 파일을 생성합니다:

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all", // 'all', 'active', 'completed'
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setFilter,
  clearCompleted,
} = todosSlice.actions;

export default todosSlice.reducer;
```

### 2단계: Prepare 콜백을 사용한 고급 action creator

더 복잡한 로직이 필요한 경우 prepare 콜백을 사용할 수 있습니다.

`todosSlice.js`에 다음 reducer를 추가합니다:

```javascript
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ... 기존 reducers
    addTodoWithId: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => {
        return {
          payload: {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    bulkAddTodos: (state, action) => {
      action.payload.forEach((todo) => {
        state.items.push({
          id: Date.now() + Math.random(),
          text: todo,
          completed: false,
        });
      });
    },
  },
});
```

### 3단계: Selector 함수 생성

상태를 효율적으로 조회하기 위한 selector 함수들을 생성합니다.

`todosSlice.js` 파일 끝에 추가합니다:

```javascript
// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodoById = (state, todoId) =>
  state.todos.items.find((todo) => todo.id === todoId);

export const selectFilteredTodos = (state) => {
  const allTodos = selectAllTodos(state);
  const filter = state.todos.filter;

  switch (filter) {
    case "active":
      return allTodos.filter((todo) => !todo.completed);
    case "completed":
      return allTodos.filter((todo) => todo.completed);
    default:
      return allTodos;
  }
};

export const selectTodosStats = (state) => {
  const allTodos = selectAllTodos(state);
  return {
    total: allTodos.length,
    active: allTodos.filter((todo) => !todo.completed).length,
    completed: allTodos.filter((todo) => todo.completed).length,
  };
};
```

### 4단계: TodoList 컴포넌트 생성

`src/features/todos/TodoList.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  selectFilteredTodos,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "./todosSlice";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

export function TodoList() {
  const todos = useAppSelector(selectFilteredTodos);
  const dispatch = useAppDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, text) => {
    dispatch(editTodo({ id, text }));
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </ul>
  );
}
```

### 5단계: TodoItem 컴포넌트 생성

`src/features/todos/TodoItem.jsx` 파일을 생성합니다:

```javascript
import { useState } from "react";
import styles from "./TodoItem.module.css";

export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
            className={styles.editInput}
            autoFocus
          />
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className={styles.checkbox}
          />
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={styles.todoText}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className={styles.deleteButton}
          >
            ×
          </button>
        </>
      )}
    </li>
  );
}
```

### 6단계: AddTodo 컴포넌트 생성

`src/features/todos/AddTodo.jsx` 파일을 생성합니다:

```javascript
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { addTodo } from "./todosSlice";
import styles from "./AddTodo.module.css";

export function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoForm}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className={styles.addTodoInput}
      />
      <button type="submit" className={styles.addTodoButton}>
        추가
      </button>
    </form>
  );
}
```

### 7단계: TodoFilter 컴포넌트 생성

`src/features/todos/TodoFilter.jsx` 파일을 생성합니다:

```javascript
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { setFilter, clearCompleted, selectTodosStats } from "./todosSlice";
import styles from "./TodoFilter.module.css";

export function TodoFilter() {
  const filter = useAppSelector((state) => state.todos.filter);
  const stats = useAppSelector(selectTodosStats);
  const dispatch = useAppDispatch();

  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className={styles.todoFilter}>
      <span className={styles.todoCount}>{stats.active}개 남음</span>
      <div className={styles.filterButtons}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => dispatch(setFilter(key))}
            className={`${styles.filterButton} ${
              filter === key ? styles.active : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {stats.completed > 0 && (
        <button
          onClick={() => dispatch(clearCompleted())}
          className={styles.clearButton}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
```

### 8단계: 스토어에 todos reducer 추가

`src/app/store.js` 파일을 수정합니다:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## 챌린지 과제

### 미션

`challenge` 폴더에서 다음 과제를 수행해보세요:

1. **쇼핑 카트 slice 구현하기**

   - 상품 추가/제거, 수량 조절, 전체 가격 계산 기능
   - 복잡한 객체 배열 상태 관리 연습
   - prepare 콜백을 사용한 고급 action creator 구현

2. **사용자 프로필 slice 구현하기**
   - 중첩된 객체 구조의 상태 관리
   - 부분 업데이트 로직 구현
   - 유효성 검사 로직 포함

### 확인하기

- [ ] 할 일 추가 기능이 정상 작동하는가?
- [ ] 할 일 토글(완료/미완료) 기능이 정상 작동하는가?
- [ ] 할 일 삭제 기능이 정상 작동하는가?
- [ ] 할 일 편집 기능이 정상 작동하는가?
- [ ] 필터링 기능 (전체/활성/완료)이 정상 작동하는가?
- [ ] 완료된 할 일 일괄 삭제가 정상 작동하는가?
- [ ] Redux DevTools에서 모든 액션과 상태 변화를 확인할 수 있는가?
- [ ] 쇼핑 카트와 사용자 프로필 slice가 정상적으로 구현되었는가?
