# 5. 동적 라우트와 파라미터 (Route Parameters)

이번 챕터에서는 URL의 일부를 동적으로 변수처럼 사용하는 '라우트 파라미터'에 대해 배웁니다. 예를 들어, `/products/1`, `/products/2`와 같이 각기 다른 상품 ID에 따라 다른 상세 페이지를 보여주는 기능을 구현합니다.

## 학습 목표

- `$` 문법을 사용하여 동적 라우트 파일을 생성할 수 있다.
- `useParams` 훅을 사용하여 URL의 파라미터 값을 컴포넌트 내에서 가져올 수 있다.
- Zod를 사용하여 라우트 파라미터를 검증하고, 타입 안전성을 확보할 수 있다.
- 파라미터 값을 사용하여 특정 데이터를 조회하고 화면에 렌더링할 수 있다.

## 주요 개념

- **동적 라우트 (Dynamic Route)**: URL 경로의 특정 부분을 변수(파라미터)로 처리하는 라우트입니다. 파일명에 `$` 접두사(예: `$productId.jsx`)를 붙여 생성합니다.
- **`useParams`**: 현재 활성화된 라우트의 파라미터 값을 객체 형태로 가져오는 훅입니다. 타입 안전성을 위해 `from` 옵션을 사용하는 것이 좋습니다.
- **파라미터 검증 (Validation)**: `createFileRoute`의 `validateSearch` 옵션과 유사하게, `params` 옵션을 사용하여 라우트 파라미터의 타입을 검증하고 기본값을 설정할 수 있습니다. 이는 예상치 못한 URL 접근으로 인한 오류를 방지합니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `starter` 코드 확인

`starter/src/routes/products.$productId.jsx` 파일은 현재 `TODO` 주석으로 채워진, 뼈대만 있는 상태입니다. 우리는 이 파일을 완성하여 동적인 상품 상세 페이지를 구현할 것입니다.

### 2단계: `useParams`로 파라미터 추출하기

가장 먼저, URL의 `$productId` 값을 가져와야 합니다. `useParams` 훅을 사용하여 `productId`를 추출합니다.

```jsx
// src/routes/products.$productId.jsx (수정)
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

// ... (products 데이터는 동일)

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
});

function ProductDetail() {
  // `from` 옵션으로 어떤 라우트의 파라미터인지 명시하여 타입 안정성을 확보합니다.
  const { productId } = useParams({ from: '/products/$productId' });

  // ... (다음 단계에서 구현)
}
```

### 3단계: 파라미터로 상품 데이터 찾기 및 렌더링

추출한 `productId`를 사용하여 `products` 배열에서 일치하는 상품을 찾습니다. `productId`는 URL에서 온 문자열이므로, `parseInt`를 사용하여 숫자와 비교해야 합니다.

상품을 찾지 못한 경우를 대비한 예외 처리도 중요합니다.

```jsx
// src/routes/products.$productId.jsx (수정)
// ...
function ProductDetail() {
  const { productId } = useParams({ from: '/products/$productId' });
  const product = products.find((p) => p.id === parseInt(productId));

  // 상품이 없을 경우
  if (!product) {
    return (
      <div className="page-content">
        <h1>제품을 찾을 수 없습니다</h1>
        <p>ID가 '{productId}'인 제품이 존재하지 않습니다.</p>
        <Link to="/products" className="btn">
          &larr; 제품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // 상품이 있을 경우
  return (
    <div className="page-content">
      {/* 제품 정보 렌더링... */}
      <h1 className="product-name">{product.name}</h1>
      <p className="product-category">카테고리: {product.category}</p>
      <p className="product-price">가격: ${product.price}</p>
      <p className="product-description">{product.description}</p>
      <Link to="/products" className="btn" style={{ marginTop: '2rem' }}>
        &larr; 제품 목록으로 돌아가기
      </Link>
    </div>
  );
}
```

### 4단계: (선택) Zod로 파라미터 검증하기

더욱 강력한 타입 안전성을 위해, `createFileRoute`의 `params` 옵션과 Zod를 사용하여 파라미터를 검증할 수 있습니다. 이렇게 하면 `productId`가 항상 숫자로 변환되도록 보장할 수 있습니다.

```jsx
// src/routes/products.$productId.jsx (업그레이드)
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { z } from 'zod';

// ...

export const Route = createFileRoute('/products/$productId')({
  // URL 파라미터를 파싱하고 검증합니다.
  parseParams: (params) => ({
    productId: z.number().int().parse(Number(params.productId)),
  }),
  stringifyParams: (params) => ({ productId: `${params.productId}` }),
  component: ProductDetail,
});

function ProductDetail() {
  // 이제 productId는 항상 number 타입임이 보장됩니다.
  const { productId } = useParams({ from: '/products/$productId' });
  const product = products.find((p) => p.id === productId);

  // ... (이하 동일)
}
```

이 과정을 통해 URL의 동적 파라미터를 안전하게 사용하여 특정 데이터를 표시하는 페이지를 완성할 수 있습니다.
