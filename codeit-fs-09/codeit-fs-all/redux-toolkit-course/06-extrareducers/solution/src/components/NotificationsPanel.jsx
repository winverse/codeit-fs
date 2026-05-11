import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead, clearNotifications } from '@/features/notifications/notificationsSlice';
import styles from './NotificationsPanel.module.css';

export function NotificationsPanel() {
  const dispatch = useDispatch();
  const { items, unreadCount, isEnabled } = useSelector((state) => state.notifications);

  function handleMarkAsRead(id) {
    dispatch(markAsRead(id));
  }

  function handleMarkAllAsRead() {
    dispatch(markAllAsRead());
  }

  function handleClearAll() {
    dispatch(clearNotifications());
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>
          알림 {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
        </h3>
        {items.length > 0 && (
          <div className={styles.actions}>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className={styles.actionButton}>
                모두 읽음
              </button>
            )}
            <button onClick={handleClearAll} className={styles.clearButton}>
              전체 삭제
            </button>
          </div>
        )}
      </div>

      <div className={styles.list}>
        {items.length === 0 ? (
          <p className={styles.empty}>알림이 없습니다</p>
        ) : (
          items.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className={styles.type}>
                {notification.type === 'success' && '✅'}
                {notification.type === 'info' && 'ℹ️'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'error' && '❌'}
              </div>
              <div className={styles.content}>
                <p className={styles.message}>
                  {notification.message}
                </p>
                <p className={styles.time}>
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}