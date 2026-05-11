import React from 'react';
import styles from './ProductList.module.css';

export function ProductList({ products, inventory, onAddToCart }) {
  return (
    <div className={styles.container}>
      <h2>상품 목록</h2>
      
      <div className={styles.grid}>
        {products.map(product => {
          const stock = inventory.stock[product.id] || 0;
          
          return (
            <div key={product.id} className={styles.product}>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>₩{product.price.toLocaleString()}</p>
              <p className={styles.stock}>
                재고: <span className={stock <= 5 ? styles.lowStock : styles.normalStock}>
                  {stock}개
                </span>
              </p>
              <button 
                onClick={() => onAddToCart(product)}
                disabled={stock === 0}
                className={stock > 0 ? styles.addButton : styles.disabledButton}
              >
                {stock > 0 ? '장바구니에 추가' : '품절'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}