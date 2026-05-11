import { categories } from '@/data/categories';
import { products } from '@/data/product';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/products/')({
  component: ProductList,
});

function ProductList() {
  const navigate = null;
  const page = 1;
  const search = '';
  const category = '';

  const bySearchTerm = (p) => {};
  const byCategory = (p) => {};
  const filteredProducts = products.filter(bySearchTerm).filter(byCategory);

  const limit = 10;
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleNavigate = (key, value) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value, page: 1 }) });
  };

  const handlePageChange = (newPage) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
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
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="product-grid">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>카테고리: {product.category}</p>
            <p>가격: ${product.price}</p>
            <Link
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              className="btn"
            >
              상세 보기
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="pagination">
        <button
          disabled={page === 1}
          className="btn"
          onClick={() => handlePageChange(Math.max(1, page - 1))}
        >
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          className="btn"
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
        >
          다음
        </button>
      </div>
    </div>
  );
}
