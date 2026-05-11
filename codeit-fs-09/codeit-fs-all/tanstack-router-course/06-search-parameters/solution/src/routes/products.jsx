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

// Zod schema for search parameter validation
const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().min(1).default(1),
});

export const Route = createFileRoute('/products')({
  validateSearch: searchSchema,
  component: ProductList,
});

function ProductList() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search, category, page } = useSearch();

  // Filtering logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory = category && category !== 'all' ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const limit = 10;
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  const handleNavigate = (key, value) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value, page: 1 }) });
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