import { useSelector } from 'react-redux';
import styles from './StoreInfo.module.css';

export function StoreInfo() {
  // 전체 상태를 가져와서 스토어 구조 확인
  const state = useSelector((state) => state);
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>스토어 정보</h3>
      
      <div className={styles.info}>
        <div className={styles.item}>
          <span className={styles.label}>상태 관리:</span>
          <span className={styles.value}>Redux Toolkit</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>DevTools:</span>
          <span className={styles.status}>✅ 자동 연결됨</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>시간 여행:</span>
          <span className={styles.status}>✅ 지원됨</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>미들웨어:</span>
          <span className={styles.status}>✅ redux-thunk</span>
        </div>
      </div>

      <div className={styles.stateView}>
        <h4>현재 스토어 상태:</h4>
        <pre className={styles.stateJson}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>

      <div className={styles.note}>
        <h4>✅ configureStore의 자동 설정:</h4>
        <ul>
          <li>Redux DevTools Extension 자동 연결</li>
          <li>redux-thunk 미들웨어 자동 포함</li>
          <li>직렬화 가능성 검사 (개발 모드)</li>
          <li>불변성 검사 (개발 모드)</li>
          <li>액션 생성자 검사 (개발 모드)</li>
        </ul>
      </div>
    </div>
  );
}