import styles from './StoreInfo.module.css';

export function StoreInfo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>스토어 정보</h3>
      
      <div className={styles.info}>
        <div className={styles.item}>
          <span className={styles.label}>상태 관리:</span>
          <span className={styles.value}>React useState</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>DevTools:</span>
          <span className={styles.status}>❌ 사용 불가</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>시간 여행:</span>
          <span className={styles.status}>❌ 지원 안됨</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>미들웨어:</span>
          <span className={styles.status}>❌ 없음</span>
        </div>
      </div>

      <div className={styles.note}>
        <h4>Redux Toolkit 설정 후 변화:</h4>
        <ul>
          <li>✅ Redux DevTools Extension 자동 연결</li>
          <li>✅ 시간 여행 디버깅 가능</li>
          <li>✅ redux-thunk 미들웨어 자동 포함</li>
          <li>✅ 직렬화 가능성 자동 검증</li>
          <li>✅ 불변성 체크 (개발 모드)</li>
        </ul>
      </div>
    </div>
  );
}