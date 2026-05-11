import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restockProduct, clearAlert, clearAllAlerts } from '@/features/inventory/inventorySlice';
import styles from './InventoryPanel.module.css';

export function InventoryPanel() {
  const dispatch = useDispatch();
  const { stock, alerts, lowStockThreshold } = useSelector(state => state.inventory);
  const products = useSelector(state => state.products.items);

  function handleRestock(productId) {
    dispatch(restockProduct({ productId, quantity: 10 }));
  }

  function handleClearAlert(alertId) {
    dispatch(clearAlert(alertId));
  }

  function handleClearAllAlerts() {
    dispatch(clearAllAlerts());
  }

  return (
    <div className={styles.panel}>
      <h3>재고 관리</h3>
      
      <div className={styles.stockList}>
        <h4>현재 재고</h4>
        {products.map(product => {
          const currentStock = stock[product.id] || 0;
          const isLowStock = currentStock <= lowStockThreshold;
          
          return (
            <div key={product.id} className={styles.stockItem}>
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.name}</span>
                <span className={isLowStock ? styles.lowStock : styles.normalStock}>
                  {currentStock}개
                </span>
              </div>
              {isLowStock && (
                <button 
                  onClick={() => handleRestock(product.id)}
                  className={styles.restockButton}
                >
                  입고
                </button>
              )}
            </div>
          );
        })}
      </div>

      {alerts.length > 0 && (
        <div className={styles.alerts}>
          <div className={styles.alertsHeader}>
            <h4>재고 알림</h4>
            <button onClick={handleClearAllAlerts} className={styles.clearButton}>
              전체 삭제
            </button>
          </div>
          
          <div className={styles.alertList}>
            {alerts.map(alert => (
              <div key={alert.id} className={styles.alert}>
                <p className={styles.alertMessage}>
                  {alert.message}
                </p>
                <button 
                  onClick={() => handleClearAlert(alert.id)}
                  className={styles.alertCloseButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}