import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router';
import { z } from 'zod';

const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `제품 ${i + 1}`,
  category: i % 5 === 0 ? 'electronics' : i % 3 === 0 ? 'furniture' : 'clothing',
  price: (i + 1) * 10,
}));

const categories = ['all', 'electronics', 'furniture', 'clothing'];

// TODO: 1. searchSchema에 sort와 order 파라미터를 추가하세요.
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
  // TODO: 2. useSearch 훅으로 sort와 order 값을 가져오세요.
  const { search, category, page } = useSearch();

  const filteredProducts = products.filter(p => {
    const matchesSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory = category && category !== 'all' ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // TODO: 4. 여기에 정렬 로직을 구현하세요. (filteredProducts.sort() 사용)
  const sortedProducts = filteredProducts;

  const limit = 10;
  const totalPages = Math.ceil(sortedProducts.length / limit);
  const paginatedProducts = sortedProducts.slice((page - 1) * limit, page * limit);

  const handleNavigate = (key, value) => {
    navigate({ search: (prev) => ({ ...prev, [key]: value, page: 1 }) });
  };

  const handleSortChange = (sortValue) => {
    const [sort, order] = sortValue.split('-');
    navigate({ search: (prev) => ({ ...prev, sort, order, page: 1 }) });
  };

  return (
    <div className="page-content">
      <h1 className="page-title">제품 목록</h1>
      <p>총 {filteredProducts.length}개의 제품이 있습니다.</p>

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
        {/* TODO: 3. 정렬 UI를 여기에 추가하세요. */}
      </div>

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
