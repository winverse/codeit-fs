# 8. 에러 처리 (Error Handling)

이번 챕터에서는 TanStack Router의 내장된 에러 처리 시스템을 사용하여, 데이터 로딩 실패나 예상치 못한 오류가 발생했을 때 사용자에게 적절한 피드백을 제공하는 방법을 배웁니다. 각 라우트 레벨에서 `errorComponent`를 사용하여 독립적인 에러 UI를 구현합니다.

## 학습 목표

- `loader` 함수 내에서 `Error`를 `throw`하여 에러 상태를 트리거할 수 있다.
- `errorComponent` 옵션을 사용하여 특정 라우트에서 에러가 발생했을 때 보여줄 UI를 정의할 수 있다.
- `errorComponent`가 받는 `error`와 `reset` props를 사용하여, 에러 메시지를 표시하고 사용자가 재시도할 수 있는 기능을 제공할 수 있다.
- 404 (Not Found) 에러를 처리하는 기본 원리를 이해할 수 있다.

## 주요 개념

- **`errorComponent`**: 라우트의 `loader`나 `component`에서 에러가 발생했을 때 자동으로 렌더링되는 컴포넌트입니다. React의 에러 바운더리(Error Boundary)와 유사하게 작동합니다.
- **`error` prop**: `errorComponent`로 전달되는 에러 객체입니다. `error.message` 등을 통해 사용자에게 어떤 문제가 발생했는지 알려줄 수 있습니다.
- **`reset` prop**: `errorComponent`로 전달되는 함수입니다. 이 함수를 호출하면 해당 라우트의 `loader`를 다시 실행하여 데이터 로딩을 재시도할 수 있습니다.
- **Not Found Error**: TanStack Router는 일치하는 경로가 없을 때 특별한 종류의 에러를 발생시킵니다. 이를 잡아서 404 페이지를 보여줄 수 있습니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `loader`에서 에러 발생시키기

`src/routes/posts/$postId.jsx` 파일의 `loader` 함수를 수정하여, 특정 조건(예: `postId`가 '99')일 때 의도적으로 에러를 발생시키도록 만듭니다.

```jsx
// src/routes/posts/$postId.jsx (수정)
import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPost } from '../../lib/api';

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    // '99'번 게시물 요청 시 에러 발생
    if (params.postId === '99') {
      throw new Error('게시물을 불러오는 데 실패했습니다. (서버 오류 시뮬레이션)');
    }
    return fetchPost(params.postId);
  },
  // ...
});
```

### 2단계: `errorComponent` 구현하기

동일한 파일에 `errorComponent` 옵션을 추가합니다. 이 컴포넌트는 에러가 발생했을 때 사용자에게 보여줄 UI를 담당하며, `error` 객체와 `reset` 함수를 props로 받습니다.

```jsx
// src/routes/posts/$postId.jsx (수정)
// ...
export const Route = createFileRoute('/posts/$postId')({
  loader: /* ... */,
  // errorComponent 추가
  errorComponent: ({ error, reset }) => (
    <div className="error-container">
      <h2>앗, 문제가 발생했어요!</h2>
      <p className="error-message">{error.message}</p>
      <button onClick={reset} className="btn">
        다시 시도
      </button>
    </div>
  ),
  component: PostDetail,
  pendingComponent: PostSkeleton,
});
// ...
```

### 3단계: 개발 서버 실행 및 테스트

```bash
npm run dev
```

1.  `/posts/1`과 같은 정상적인 경로로 접속하여 게시물이 잘 보이는지 확인합니다.
2.  `/posts/99` 경로로 접속하여, 우리가 정의한 `errorComponent`가 에러 메시지와 "다시 시도" 버튼과 함께 올바르게 표시되는지 확인합니다.
3.  "다시 시도" 버튼을 클릭했을 때, `loader`가 다시 실행되면서 `errorComponent`가 계속 표시되는지(에러가 여전히 발생하므로) 확인합니다.

이 과정을 통해 라우트 레벨에서 발생하는 에러를 사용자 친화적으로 처리하는 방법을 익힐 수 있습니다.
