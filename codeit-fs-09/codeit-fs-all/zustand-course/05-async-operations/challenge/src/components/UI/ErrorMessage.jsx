import React from 'react';
import styles from './ErrorMessage.module.css';

function ErrorMessage({ 
  message = "Something went wrong", 
  onRetry,
  type = "error" // "error" | "warning" | "info"
}) {
  // TODO: 에러 메시지 개선사항
  // - 다양한 에러 타입 (error, warning, info)
  // - 재시도 버튼
  // - 에러 세부사항 토글
  // - 에러 리포팅 기능

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'error':
      default:
        return '❌';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      case 'error':
      default:
        return 'Error';
    }
  };

  return (
    <div className={`${styles.container} ${styles[type]}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon}>
            {getIcon()}
          </span>
          <h3 className={styles.title}>
            {getTitle()}
          </h3>
        </div>
        
        <p className={styles.message}>
          {message}
        </p>

        {/* TODO: 액션 버튼들 */}
        <div className={styles.actions}>
          {onRetry && (
            <button 
              className={styles.retryButton}
              onClick={onRetry}
            >
              🔄 Try Again
            </button>
          )}
          
          {/* TODO: 에러 리포팅 버튼 */}
          <button 
            className={styles.reportButton}
            onClick={() => {
              console.log('TODO: 에러 리포팅 구현', { message, type });
            }}
          >
            📝 Report Issue
          </button>
        </div>

        {/* TODO: 에러 세부사항 (개발 모드에서만 표시) */}
        {process.env.NODE_ENV === 'development' && (
          <details className={styles.details}>
            <summary className={styles.detailsSummary}>
              Technical Details
            </summary>
            <pre className={styles.errorDetails}>
              {JSON.stringify({
                message,
                type,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
              }, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;