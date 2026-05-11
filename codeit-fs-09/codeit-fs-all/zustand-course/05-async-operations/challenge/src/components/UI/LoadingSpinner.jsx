import React from 'react';
import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ 
  message = "Loading...", 
  size = "medium", 
  fullScreen = false 
}) {
  // TODO: 로딩 스피너 개선사항
  // - 다양한 크기 옵션 (small, medium, large)
  // - 풀스크린 모드
  // - 커스텀 메시지
  // - 애니메이션 종류 선택

  const containerClass = `${styles.container} ${
    fullScreen ? styles.fullScreen : ''
  } ${styles[size]}`;

  return (
    <div className={containerClass}>
      <div className={styles.spinner}>
        <div className={styles.spinnerInner}>
          {/* TODO: 다양한 스피너 애니메이션 */}
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
          <div className={styles.dot4}></div>
        </div>
      </div>
      
      {message && (
        <p className={styles.message}>{message}</p>
      )}
    </div>
  );
}

export default LoadingSpinner;