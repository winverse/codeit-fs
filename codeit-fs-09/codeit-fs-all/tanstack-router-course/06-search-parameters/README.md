# 6. 검색 파라미터 (Search Parameters)

이번 챕터에서는 URL의 쿼리 스트링(Query String), 즉 검색 파라미터를 타입 안전하게 다루는 방법을 배웁니다. `useSearch` 훅을 사용하여 검색, 필터링, 페이지네이션과 같이 동적인 데이터 조회 기능을 구현합니다.

## 학습 목표

- `validateSearch` 옵션을 사용하여 검색 파라미터의 타입을 검증하고 기본값을 설정할 수 있다.
- `useSearch` 훅을 사용하여 컴포넌트 내에서 검색 파라미터 값을 읽어올 수 있다.
- `useNavigate` 훅을 사용하여 검색 파라미터를 업데이트하고, URL 상태와 UI를 동기화할 수 있다.
- 검색 파라미터를 기반으로 필터링 및 페이지네이션 로직을 구현할 수 있다.

## 주요 개념

- **검색 파라미터 (Search Parameters)**: URL 경로 뒤에 `?`로 시작하여 `key=value` 형태로 추가되는 정보입니다. (예: `/products?search=laptop&page=2`)
- **`validateSearch`**: `createFileRoute`의 옵션으로, Zod와 같은 라이브러리를 사용하여 해당 라우트가 사용할 검색 파라미터의 스키마를 정의하고 검증합니다. 타입 안전성을 보장하는 핵심 기능입니다.
- **`useSearch`**: 현재 라우트에서 유효성이 검증된 검색 파라미터 객체를 가져오는 훅입니다.
- **`useNavigate`**: 페이지를 이동시키는 함수를 반환하는 훅입니다. `search` 옵션을 사용하여 현재 URL의 검색 파라미터만 안전하게 업데이트할 수 있습니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `starter` 코드 확인 및 `validateSearch` 추가

`starter/src/routes/products.jsx` 파일은 현재 간단한 상품 목록만 보여줍니다. 여기에 검색 파라미터 기능을 추가해 보겠습니다.

가장 먼저, Zod를 사용하여 이 라우트에서 사용할 검색 파라미터의 스키마를 정의하고, `validateSearch` 옵션에 등록합니다.

```jsx
// src/routes/products.jsx (수정)
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

// ... (products 데이터)

// Zod 스키마 정의
const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().min(1).default(1),
});

export const Route = createFileRoute('/products')({
  // 검색 파라미터 검증 스키마 등록
  validateSearch: searchSchema,
  component: ProductList,
});

function ProductList() {
  // ...
}
```

### 2단계: `useSearch`로 파라미터 사용 및 데이터 필터링

`useSearch` 훅을 사용하여 검증된 검색 파라미터(`search`, `category`, `page`)를 가져옵니다. 이 값들을 기반으로 전체 상품 목록을 필터링하고, 페이지네이션 로직을 구현합니다.

```jsx
// src/routes/products.jsx (수정)
// ...
function ProductList() {
  const { search, category, page } = useSearch();

  // 필터링 로직
  const filteredProducts = products.filter(p => {
    const matchesSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory = category && category !== 'all' ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // 페이지네이션 로직
  const limit = 10;
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  // ... (UI 렌더링)
}
```

### 3단계: UI 구현 및 `useNavigate`로 파라미터 업데이트

검색 입력창, 카테고리 선택 드롭다운, 페이지네이션 버튼을 만듭니다. 각 UI 요소의 `onChange` 또는 `onClick` 이벤트 핸들러에서 `useNavigate` 훅을 사용하여 URL의 검색 파라미터를 업데이트합니다.

`navigate` 함수의 `search` 옵션에 함수를 전달하면, 이전 파라미터 값을 안전하게 유지하면서 원하는 값만 변경할 수 있습니다. (예: `(prev) => ({ ...prev, page: 1 })`)

```jsx
// src/routes/products.jsx (수정)
// ...
function ProductList() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search, category, page } = useSearch();

  // ... (필터링 및 페이지네이션 로직)

  const handleNavigate = (key, value) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value, page: 1 }) });
  };

  return (
    <div className="page-content">
      <h1 className="page-title">제품 목록</h1>
      <p>총 {filteredProducts.length}개의 제품이 있습니다.</p>

      {/* 검색 및 필터 UI */}
      <div className="filter-controls">
        <input
          type="text"
          placeholder="제품 검색..."
          defaultValue={search}
          onChange={(e) => handleNavigate('search', e.target.value)}
          className="search-input"
        />
        <select
          value={category || 'all'}
          onChange={(e) => handleNavigate('category', e.target.value)}
          className="select-input"
        >
          {/* ... options ... */}
        </select>
      </div>

      {/* 제품 목록 */}
      <div className="product-grid">
        {paginatedProducts.map(product => (
          {/* ... product item ... */}
        ))}
      </div>

      {/* 페이지네이션 UI */}
      <div className="pagination">
        <button
          onClick={() => navigate({ search: (prev) => ({ ...prev, page: Math.max(1, page - 1) }) })}
          disabled={page === 1}
          className="btn"
        >
          이전
        </button>
        <span>{page} / {totalPages}</span>
        <button
          onClick={() => navigate({ search: (prev) => ({ ...prev, page: Math.min(totalPages, page + 1) }) })}
          disabled={page === totalPages}
          className="btn"
        >
          다음
        </button>
      </div>
    </div>
  );
}
```
