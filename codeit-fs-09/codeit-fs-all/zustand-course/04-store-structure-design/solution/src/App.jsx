import { useUIStore } from '@/stores/uiStore';
import { useCartTotalItems } from '@/selectors/cartSelectors';
import { ProductList } from '@/components/ProductList';
import { ShoppingCart } from '@/components/ShoppingCart';
import styles from './App.module.css';

function App() {
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const toggleCart = useUIStore((state) => state.toggleCart);
  
  // ✅ 셀렉터로 계산된 값 사용
  const cartItemCount = useCartTotalItems();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          스토어 구조 설계 - 개선된 버전
        </h1>
        <button 
          onClick={toggleCart}
          className={styles.cartButton}
        >
          🛒 장바구니 ({cartItemCount})
        </button>
      </header>

      <main className={styles.main}>
        <ProductList />
      </main>

      {isCartOpen && <ShoppingCart />}
    </div>
  );
}


);
}

export default App;
