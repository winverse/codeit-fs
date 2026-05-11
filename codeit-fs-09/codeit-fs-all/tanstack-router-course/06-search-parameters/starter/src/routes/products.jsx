import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

// Dummy data
const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `제품 ${i + 1}`,
  category: i % 5 === 0 ? 'electronics' : i % 3 === 0 ? 'furniture' : 'clothing',
  price: (i + 1) * 10,
}));

const categories = ['all', 'electronics', 'furniture', 'clothing'];

// TODO: 1. Zod를 사용하여 검색 파라미터 스키마를 정의하세요.
// search(string), category(string)는 optional, page(number)는 1 이상의 정수이며 기본값은 1입니다.
const searchSchema = z.object({});

export const Route = createFileRoute('/products')({
  // TODO: 2. validateSearch 옵션에 위에서 정의한 searchSchema를 등록하세요.
  component: ProductList,
});

function ProductList() {
  // TODO: 3. useSearch 훅을 사용하여 search, category, page 값을 가져오세요.
  const { search, category, page } = {}; // Placeholder

  // TODO: 4. useSearch에서 가져온 값들을 사용하여 products 배열을 필터링하는 로직을 구현하세요.
  const filteredProducts = products;

  // TODO: 5. 필터링된 상품 목록을 기반으로 페이지네이션 로직을 구현하세요.
  const limit = 10;
  const totalPages = 1; // Placeholder
  const paginatedProducts = filteredProducts.slice(0, limit);

  // TODO: 6. useNavigate 훅을 사용하여 검색 파라미터를 업데이트하는 함수를 만드세요.
  const navigate = () => {}; // Placeholder
  const handleNavigate = (key, value) => {
    console.log('TODO: navigate to update search params', { key, value });
  };

  return (
    <div className="page-content">
      <h1 className="page-title">제품 목록</h1>
      <p>총 {filteredProducts.length}개의 제품이 있습니다.</p>

      {/* Search and Filter UI */}
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
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Product List */}
      <div className="product-grid">
        {paginatedProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>카테고리: {product.category}</p>
            <p>가격: ${product.price}</p>
            <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="btn">상세 보기</Link>
          </div>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="pagination">
        <button
          // TODO: 7. 이전 페이지로 이동하는 네비게이션 로직을 구현하세요.
          disabled={page === 1}
          className="btn"
        >
          이전
        </button>
        <span>{page} / {totalPages}</span>
        <button
          // TODO: 8. 다음 페이지로 이동하는 네비게이션 로직을 구현하세요.
          disabled={page === totalPages}
          className="btn"
        >
          다음
        </button>
      </div>
    </div>
  );
}
