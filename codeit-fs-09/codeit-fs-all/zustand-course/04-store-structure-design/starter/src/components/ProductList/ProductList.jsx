import { useShopStore } from '@/stores/shopStore';
import { ProductCard } from '@/components/ProductCard';
import styles from './ProductList.module.css';

export function ProductList() {
  // 🚨 문제: 필터링 로직이 컴포넌트에 있음
  const products = useShopStore((state) => state.products);
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const addToCart = useShopStore((state) => state.addToCart);

  console.log('🔄 ProductList 렌더링됨 (비효율적)');

  // TODO: 이 로직을 셀렉터 함수로 분리해야 함
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className={styles.container}>
      <h2>상품 목록</h2>
      
      {/* TODO: 카테고리 필터 컴포넌트 분리 */}
      <div className={styles.categoryFilter}>
        <button 
          onClick={() => useShopStore.getState().setSelectedCategory('all')}
          className={selectedCategory === 'all' ? styles.active : ''}
        >
          전체
        </button>
        <button 
          onClick={() => useShopStore.getState().setSelectedCategory('electronics')}
          className={selectedCategory === 'electronics' ? styles.active : ''}
        >
          전자제품
        </button>
        <button 
          onClick={() => useShopStore.getState().setSelectedCategory('books')}
          className={selectedCategory === 'books' ? styles.active : ''}
        >
          도서
        </button>
        <button 
          onClick={() => useShopStore.getState().setSelectedCategory('food')}
          className={selectedCategory === 'food' ? styles.active : ''}
        >
          식품
        </button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => {
              console.log('장바구니에 추가:', product.name);
              addToCart(product.id); // 문제점: 상품 객체가 아닌 ID로 변경
            }}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          선택한 카테고리에 상품이 없습니다.
        </div>
      )}
    </div>
  );
}