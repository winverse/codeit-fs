# Challenge: 로딩 상태와 스켈레톤 UI 구현

## 목표
이 챌린지에서는 TanStack Router의 `loader`와 `pendingComponent`를 사용하여, 데이터 로딩 중에 스켈레톤 UI를 보여주는 기능을 구현합니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```
   개발 서버가 실행되면, `/posts` 페이지에서 게시물 링크를 클릭하여 실습을 진행하세요.

## 챌린지 과제

`src/routes/posts/$postId.jsx` 파일을 열고, `// TODO:` 주석으로 표시된 부분을 단계별로 완성하세요.

### 1. `loader` 함수 구현
- `createFileRoute`의 옵션으로 `loader` 함수를 추가하세요.
- `loader` 함수 내에서, `params` 객체로부터 `postId`를 가져와 `fetchPost(postId)` 함수를 호출하여 특정 게시물의 데이터를 불러오세요.

### 2. `pendingComponent` 구현
- `createFileRoute`의 옵션으로 `pendingComponent`를 추가하세요.
- 이 컴포넌트는 `PostSkeleton`이라는 이름의 함수로, `src/index.css`에 정의된 `.skeleton` 관련 클래스를 사용하여 로딩 중임을 나타내는 스켈레톤 UI를 렌더링해야 합니다.

### 3. `useLoaderData`로 데이터 사용
- `PostDetail` 컴포넌트에서 `Route.useLoaderData()` 훅을 사용하여 `loader`가 반환한 `post` 데이터를 가져와 화면에 렌더링하세요.

## 완료 후 확인사항
- [ ] 게시물 목록 페이지에서 특정 게시물을 클릭했을 때, 상세 페이지로 즉시 이동하지 않고 잠시 스켈레톤 UI가 보이는가?
- [ ] 약 1초 후, 스켈레톤 UI가 사라지고 실제 게시물 제목과 내용이 올바르게 표시되는가?
- [ ] 다른 게시물을 클릭해도 동일한 로딩 상태 로직이 잘 작동하는가?

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
