import styles from '@/components/EnvironmentInfo/EnvironmentInfo.module.css';

export function EnvironmentInfo() {
  const isDevelopment = import.meta.env.DEV;
  const mode = import.meta.env.MODE;
  
  // TODO: 스토어에서 현재 설정된 미들웨어 정보를 가져오는 로직을 구현하세요
  // 힌트: store.getState(), store 객체의 속성들을 활용해보세요
  
  return (
    <div className={styles.environmentInfo}>
      <h2>환경 정보</h2>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.label}>현재 모드:</span>
          <span className={styles.value}>{mode}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>개발 환경:</span>
          <span className={styles.value}>{isDevelopment ? 'Yes' : 'No'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Redux DevTools:</span>
          <span className={styles.value}>
            {/* TODO: DevTools 활성화 여부를 표시하세요 */}
            확인 필요
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>미들웨어 수:</span>
          <span className={styles.value}>
            {/* TODO: 현재 적용된 미들웨어 개수를 표시하세요 */}
            확인 필요
          </span>
        </div>
      </div>
      
      <div className={styles.instructions}>
        <h3>확인해보세요</h3>
        <ul>
          <li>개발 환경에서는 Redux DevTools가 활성화되어야 합니다</li>
          <li>프로덕션 빌드에서는 DevTools가 비활성화되어야 합니다</li>
          <li>환경별로 미들웨어 구성이 다른지 확인해보세요</li>
        </ul>
      </div>
    </div>
  );
}