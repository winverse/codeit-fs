// TODO: 필요한 훅들 import하기
// import { useAppSelector, useAppDispatch } from '@/hooks/hooks.js'
// import { selectAllProducts, selectFilteredProducts, selectProductsFilter, setFilter } from '../features/products/productsSlice.js'
// import { addToCart, selectCartItemById } from '../features/cart/cartSlice.js'

import styles from './ProductList.module.css'

export function ProductList() {
  // TODO: Redux 상태와 디스패치 함수 가져오기
  // const products = useAppSelector(selectFilteredProducts)
  // const currentFilter = useAppSelector(selectProductsFilter)
  // const dispatch = useAppDispatch()
  
  // 임시 데이터 (TODO 완료 후 제거)
  const products = []
  const currentFilter = 'all'
  
  const handleFilterChange = (filter) => {
    // TODO: setFilter 액션 디스패치
    console.log('TODO: 필터 변경', filter)
  }
  
  const handleAddToCart = (product) => {
    // TODO: addToCart 액션 디스패치
    console.log('TODO: 장바구니에 추가', product)
  }

  return (
    <div className={styles.container}>
      <h2>상품 목록</h2>
      
      <div className={styles.filters}>
        <button 
          onClick={() => handleFilterChange('all')}
          className={currentFilter === 'all' ? styles.active : ''}
        >
          전체
        </button>
        <button 
          onClick={() => handleFilterChange('inStock')}
          className={currentFilter === 'inStock' ? styles.active : ''}
        >
          재고 있음
        </button>
        <button 
          onClick={() => handleFilterChange('electronics')}
          className={currentFilter === 'electronics' ? styles.active : ''}
        >
          전자기기
        </button>
        <button 
          onClick={() => handleFilterChange('furniture')}
          className={currentFilter === 'furniture' ? styles.active : ''}
        >
          가구
        </button>
      </div>

      <div className={styles.productGrid}>
        {products.length === 0 ? (
          <p className={styles.emptyMessage}>
            ⚠️ Redux 연결 후 상품들이 표시됩니다
          </p>
        ) : (
          products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <h3>{product.name}</h3>
              <p className={styles.price}>₩{product.price.toLocaleString()}</p>
              <p className={styles.category}>{product.category}</p>
              <p className={`${styles.stock} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                {product.inStock ? '재고 있음' : '재고 없음'}
              </p>
              <button 
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className={styles.addButton}
              >
                장바구니에 추가
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}