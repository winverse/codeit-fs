import { categories } from '@/data/category';
import { products } from '@/data/product';
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from '@tanstack/react-router';
import { z } from 'zod';

// TODO: 1. searchSchema에 sort와 order 파라미터를 추가하세요.
const searchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().min(1).default(1),
});

export const Route = createFileRoute('/products/')({
  // validateSearch: searchSchema,
  component: ProductList,
});

function ProductList() {
  const navigate = useNavigate({ from: '/products/' });
  // TODO: 2. useSearch 훅으로 sort와 order 값을 가져오세요.
  const { search, category, page } = useSearch({
    from: '/products/',
  });
  const sort = 'name';
  const order = 'asc';

  const bySearchTerm = (p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase());
  const byCategory = (p) =>
    !category || category === 'all' || p.category === category;
  const filteredProducts = products.filter(bySearchTerm).filter(byCategory);

  // 정렬 함수
  const compareByPrice = (a, b) => b.price - a.price;
  const compareByName = (a, b) => a.name.localeCompare(b.name);
  const getSortedProducts = (products, sortKey, order) => {
    const comparator = sortKey === 'price' ? compareByPrice : compareByName;
    const sorted = [...products].sort(comparator);
    return order === 'desc' ? sorted.reverse() : sorted;
  };

  const sortedProducts = getSortedProducts(filteredProducts, sort, order);

  const limit = 10;
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleSortChange = (sortValue) => {
    const [sort, order] = sortValue.split('-');
    navigate({ search: (prev) => ({ ...prev, sort, order, page: 1 }) });
  };

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
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="select-input"
          value={`${sort}-${order}`}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="name-asc">이름 (오름차순)</option>
          <option value="name-desc">이름 (내림차순)</option>
          <option value="price-asc">가격 (높은순)</option>
          <option value="price-desc">가격 (낮은순)</option>
        </select>
      </div>

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

      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="btn"
        >
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="btn"
        >
          다음
        </button>
      </div>
    </div>
  );
}
