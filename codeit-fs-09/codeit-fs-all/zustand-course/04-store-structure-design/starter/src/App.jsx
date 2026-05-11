import { useShopStore } from '@/stores/shopStore';
import { ProductList } from '@/components/ProductList';
import { ShoppingCart } from '@/components/ShoppingCart';
import styles from './App.module.css';

export function App() {
  const { isCartOpen, toggleCart, cart } = useShopStore();

  // 장바구니 아이템 수 계산 (문제점: 컴포넌트에서 계산)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>스토어 구조 설계 - 문제가 있는 버전</h1>
        <button 
          onClick={toggleCart}
          className={styles.cartButton}
        >
          장바구니 ({cartItemCount})
        </button>
      </header>

      <main className={styles.main}>
        <ProductList />
      </main>

      {isCartOpen && <ShoppingCart />}
    </div>
  );
}

export default App;
