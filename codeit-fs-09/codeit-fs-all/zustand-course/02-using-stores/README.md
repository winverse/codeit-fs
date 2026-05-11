# 2. Using Stores

Zustand 스토어를 효율적으로 사용하는 방법을 배우고, selector 패턴을 통해 필요한 상태만 선택적으로 구독하는 방법을 알아보겠습니다.

## 학습 목표

이 챕터를 완료하면 다음과 같은 능력을 갖게 됩니다:

- **Selector 패턴 마스터**: 컴포넌트별로 필요한 상태만 효율적으로 구독하는 방법
- **상태 업데이트 최적화**: 불변성을 지키면서 상태를 업데이트하는 다양한 패턴 습득
- **리렌더링 제어**: 언제, 어떤 컴포넌트가 리렌더링되는지 이해하고 제어
- **실무 패턴 적용**: 투두 리스트를 통한 CRUD 작업과 상태 관리 패턴 구현

## 주요 개념

### 1. Selector Pattern (선택자 패턴)

Zustand의 가장 강력한 기능 중 하나는 필요한 상태만 선택적으로 구독할 수 있다는 점입니다:

```javascript
// ❌ 전체 스토어 구독 (비효율적)
const store = useStore();

// ✅ 필요한 상태만 선택 (효율적)
const todos = useStore((state) => state.todos);
const addTodo = useStore((state) => state.addTodo);
```

### 2. 상태 업데이트 패턴

#### 2-1. 직접 업데이트

```javascript
const increment = () => set({ count: store.count + 1 });
```

#### 2-2. 함수형 업데이트 (권장)

```javascript
const increment = () => set((state) => ({ count: state.count + 1 }));
```

#### 2-3. 부분 업데이트

```javascript
// 객체의 일부만 업데이트
set({ loading: false }); // 다른 상태는 유지됨
```

### 3. 배열과 객체 상태 관리

#### 배열 상태 업데이트

```javascript
// 아이템 추가
set((state) => ({
  todos: [...state.todos, newTodo],
}));

// 아이템 제거
set((state) => ({
  todos: state.todos.filter((todo) => todo.id !== id),
}));

// 아이템 수정
set((state) => ({
  todos: state.todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ),
}));
```

### 💡 심화 학습: get 함수 활용

`create` 함수의 두 번째 매개변수인 `get`을 활용하면 액션 내에서 현재 상태에 접근할 수 있습니다:

```javascript
const useStore = create((set, get) => ({
  todos: [],
  completedCount: 0,

  addTodo: (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    set((state) => ({ todos: [...state.todos, newTodo] }));

    // 완료된 할 일 개수 업데이트
    const { todos } = get();
    set({ completedCount: todos.filter((t) => t.completed).length });
  },
}));
```

## 강의 시연 스크립트

### 단계 1: 투두 스토어 설계

`src/stores/todoStore.js` 파일을 생성합니다:

```javascript
import { create } from "zustand";

export const useTodoStore = create((set, get) => ({
  // 상태
  todos: [],
  filter: "all", // 'all', 'active', 'completed'

  // 액션
  addTodo: (text) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  editTodo: (id, newText) => {
    if (!newText.trim()) return;

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ),
    }));
  },

  setFilter: (filter) => {
    set({ filter });
  },

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },

  // 계산된 값 (getter 스타일)
  getFilteredTodos: () => {
    const { todos, filter } = get();

    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },

  getTodoStats: () => {
    const { todos } = get();
    return {
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    };
  },
}));
```

**💬 설명 포인트:**

- `get` 함수를 활용한 계산된 값 구현
- 배열 상태의 불변성을 지키는 업데이트 패턴
- 유효성 검사를 포함한 실무적인 액션 구현

### 단계 2: TodoInput 컴포넌트

`src/components/TodoInput/TodoInput.jsx`:

```javascript
import { useState } from "react";
import { useTodoStore } from "@/stores/todoStore";
import styles from "./TodoInput.module.css";

export function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        추가
      </button>
    </form>
  );
}
```

### 단계 3: TodoItem 컴포넌트

`src/components/TodoItem/TodoItem.jsx`:

```javascript
import { useState } from "react";
import { useTodoStore } from "@/stores/todoStore";
import styles from "./TodoItem.module.css";

export function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  function handleEdit() {
    editTodo(todo.id, editText);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className={styles.checkbox}
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className={styles.editInput}
          autoFocus
        />
      ) : (
        <span className={styles.text} onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <button
        onClick={() => deleteTodo(todo.id)}
        className={styles.deleteButton}
      >
        삭제
      </button>
    </div>
  );
}
```

**💬 설명 포인트:**

- 각 액션을 개별적으로 구독하여 성능 최적화
- 로컬 상태(편집 모드)와 전역 상태의 적절한 분리
- UX를 고려한 키보드 이벤트 처리

### 단계 4: TodoList 컴포넌트

`src/components/TodoList/TodoList.jsx`:

```javascript
import { useTodoStore } from "@/stores/todoStore";
import { TodoItem } from "@/components/TodoItem";
import styles from "./TodoList.module.css";

export function TodoList() {
  const getFilteredTodos = useTodoStore((state) => state.getFilteredTodos);
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>할 일이 없습니다! 🎉</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

### 단계 5: TodoFilter 컴포넌트

`src/components/TodoFilter/TodoFilter.jsx`:

```javascript
import { useTodoStore } from "@/stores/todoStore";
import styles from "./TodoFilter.module.css";

const filters = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행중" },
  { key: "completed", label: "완료" },
];

export function TodoFilter() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const getTodoStats = useTodoStore((state) => state.getTodoStats);

  const stats = getTodoStats();

  return (
    <div className={styles.filter}>
      <div className={styles.tabs}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`${styles.tab} ${filter === key ? styles.active : ""}`}
          >
            {label}
            {key === "active" && stats.active > 0 && (
              <span className={styles.badge}>{stats.active}</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.stats}>
        총 {stats.total}개 · 완료 {stats.completed}개
      </div>

      {stats.completed > 0 && (
        <button onClick={clearCompleted} className={styles.clearButton}>
          완료된 항목 삭제
        </button>
      )}
    </div>
  );
}
```

**💬 설명 포인트:**

- 계산된 값을 활용한 통계 정보 표시
- 조건부 렌더링을 통한 UX 개선
- 필터 상태에 따른 동적 스타일링

### 단계 6: App 컴포넌트에 통합

`src/App.jsx`:

```javascript
import { TodoInput } from "@/components/TodoInput";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Zustand Todo App</h1>
        <p>스토어 사용하기 실습</p>
      </header>

      <main className={styles.main}>
        <TodoInput />
        <TodoFilter />
        <TodoList />
      </main>
    </div>
  );
}
```

## 챌린지 과제

학생들이 `challenge` 폴더에서 수행해야 할 미션입니다.

### 미션

간단한 **메모 관리 앱**을 만들어보세요!

#### 요구사항:

1. **메모 스토어 생성**: `src/stores/memoStore.js`

   - `memos`: 메모 배열
   - `selectedCategory`: 현재 선택된 카테고리
   - `addMemo(title, content, category)`: 메모 추가
   - `deleteMemo(id)`: 메모 삭제
   - `editMemo(id, title, content)`: 메모 수정
   - `setCategory(category)`: 카테고리 필터링
   - `searchMemos(keyword)`: 메모 검색

2. **메모 구조**:

   ```javascript
   {
     id: timestamp,
     title: "메모 제목",
     content: "메모 내용",
     category: "work" | "personal" | "study",
     createdAt: "ISO 날짜 문자열",
     updatedAt: "ISO 날짜 문자열"
   }
   ```

3. **컴포넌트 구현**:
   - `MemoForm`: 메모 추가/수정 폼
   - `MemoCard`: 개별 메모 카드
   - `MemoList`: 메모 목록
   - `MemoFilter`: 카테고리 필터링
   - `MemoSearch`: 메모 검색

#### 추가 기능 (선택사항):

- 메모 개수 표시 (카테고리별)
- 최근 수정된 메모 하이라이트
- 메모 내용 미리보기 (100자 제한)
- 즐겨찾기 기능

### 확인하기

다음 기능이 정상적으로 작동하는지 확인하세요:

- [ ] 메모를 추가할 수 있다
- [ ] 메모를 수정할 수 있다 (제목, 내용)
- [ ] 메모를 삭제할 수 있다
- [ ] 카테고리별로 메모를 필터링할 수 있다
- [ ] 제목이나 내용으로 메모를 검색할 수 있다
- [ ] 각 컴포넌트가 필요한 상태만 구독한다
- [ ] 상태 업데이트 시 불변성이 지켜진다
- [ ] 빈 상태일 때 적절한 메시지가 표시된다

### 💡 힌트

- `filter`와 `includes` 메서드를 조합해 검색 기능 구현
- `Date.now()`를 활용해 고유한 ID 생성
- 객체 스프레드 연산자로 불변성 유지
- 조건부 렌더링으로 UX 개선
- 디바운싱을 적용해 검색 성능 최적화

---

## 다음 챕터 미리보기

다음 챕터 **"Performance Optimization"**에서는:

- `useShallow`를 활용한 리렌더링 최적화
- 복잡한 객체 상태의 효율적 관리
- 성능 측정과 분석 방법
- 실무에서 마주치는 성능 이슈와 해결책

지금까지 Zustand의 기본적인 사용법을 익혔다면, 이제 성능까지 고려한 고급 패턴을 배워볼 시간입니다! 🚀
