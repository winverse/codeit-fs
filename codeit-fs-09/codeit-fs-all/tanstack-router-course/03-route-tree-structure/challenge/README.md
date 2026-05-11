# Challenge: 레이아웃 라우트 실습

## 목표
이 챌린지에서는 TanStack Router의 핵심 기능인 레이아웃 라우트(`_layout.jsx`)를 사용하여, 여러 페이지가 공통된 UI 구조를 공유하도록 만들어 봅니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```

## 챌린지 과제

### 1. Admin 섹션 레이아웃 구현

관리자 페이지들을 위한 공통 레이아웃을 만듭니다. `src/routes/admin/_layout.jsx` 파일을 **새로 생성**하고, 이 레이아웃이 사이드바를 갖도록 구현하세요.

**요구사항:**
- `_layout.jsx` 파일은 `dashboard-layout`, `dashboard-sidebar`, `sidebar-nav`, `dashboard-main` 등의 `className`을 사용하여 `src/index.css`에 이미 정의된 스타일을 적용해야 합니다.
- 사이드바에는 관리자 대시보드(`/admin`), 사용자 관리(`/admin/users`), 리포트 관리(`/admin/reports`) 페이지로 이동하는 `Link`가 포함되어야 합니다.

### 2. Admin 하위 페이지 생성

레이아웃을 공유할 실제 페이지들을 생성합니다.

```
src/routes/admin/
├── _layout.jsx          → 관리자 전용 레이아웃
├── index.jsx            → /admin (관리자 대시보드)
├── users.jsx            → /admin/users (사용자 관리)
└── reports.jsx          → /admin/reports (리포트 관리)
```

**요구사항:**
- 위 파일 구조에 맞게 `index.jsx`, `users.jsx`, `reports.jsx` 파일을 생성하세요.
- 각 페이지는 간단한 제목과 설명(`<h1>`, `<p>`)을 포함해야 합니다. (예: `<h1>Admin Dashboard</h1>`)
- 각 페이지의 최상위 `div`에는 `page-content` 클래스를 적용하여 일관된 스타일을 유지하세요.

### 3. 루트 네비게이션 완성

`src/routes/__root.jsx` 파일을 수정하여, 메인 네비게이션에 Admin 섹션으로 진입하는 링크를 추가하세요.

- `<ul>` 태그 안에 `<li><Link to="/admin">📊 Admin</Link></li>`와 같이 링크를 추가합니다.
- 다른 링크들과 마찬가지로 `activeProps`를 적용하는 것을 잊지 마세요.

## 완료 후 확인사항
- [ ] 메인 네비게이션의 'Admin' 링크가 잘 작동하는가?
- [ ] `/admin`, `/admin/users`, `/admin/reports` 경로로 이동했을 때, 각 페이지가 사이드바 레이아웃 안에서 올바르게 표시되는가?
- [ ] 사이드바의 링크들도 모두 정상적으로 작동하는가?

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
