import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import { setCategory } from '@/features/products/productsSlice';
import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { InventoryPanel } from '@/components/InventoryPanel';
import styles from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const { items: products, selectedCategory } = useSelector(state => state.products);
  const { items: cartItems, total, itemCount } = useSelector(state => state.cart);
  const inventory = useSelector(state => state.inventory);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  function handleAddToCart(product) {
    const stock = inventory.stock[product.id] || 0;
    if (stock > 0) {
      dispatch(addToCart({ product }));
    } else {
      alert('재고가 부족합니다!');
    }
  }

  function handleCategoryChange(category) {
    dispatch(setCategory(category));
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>쇼핑몰 extraReducers 실습</h1>
        <div className={styles.cartInfo}>
          🛒 {itemCount}개 상품 (₩{total.toLocaleString()})
        </div>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filters}>
            <h3>카테고리</h3>
            <button 
              onClick={() => handleCategoryChange('all')}
              className={selectedCategory === 'all' ? styles.activeFilter : styles.filter}
            >
              전체
            </button>
            <button 
              onClick={() => handleCategoryChange('electronics')}
              className={selectedCategory === 'electronics' ? styles.activeFilter : styles.filter}
            >
              전자제품
            </button>
          </div>
          
          <InventoryPanel />
        </aside>

        <main className={styles.main}>
          <ProductList 
            products={filteredProducts}
            inventory={inventory}
            onAddToCart={handleAddToCart}
          />
        </main>

        <aside className={styles.cartSection}>
          <Cart />
        </aside>
      </div>
    </div>
  );
}