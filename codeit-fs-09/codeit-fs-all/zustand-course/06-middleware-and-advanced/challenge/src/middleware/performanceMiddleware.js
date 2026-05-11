// TODO: Performance Monitoring Middleware 구현
// 목표: 상태 변경 성능을 모니터링하고 slow actions를 감지하는 미들웨어

/**
 * Performance Middleware Template
 * 
 * 요구사항:
 * 1. 모든 상태 변경의 실행 시간을 측정
 * 2. 느린 작업(100ms 이상)에 대해 경고 로그
 * 3. 성능 메트릭을 수집하여 평균 실행 시간 계산
 * 4. 개발자 도구에서 성능 데이터 확인 가능
 */

// TODO: performanceMiddleware 함수 구현
export const performanceMiddleware = (config) => {
  // TODO: 1. 성능 메트릭을 저장할 Map 생성
  const performanceMetrics = new Map();
  
  return (set, get, api) => {
    // TODO: 2. 원본 set 함수를 감싸서 성능 측정
    const wrappedSet = (...args) => {
      // TODO: 2-1. 시작 시간 기록
      
      // TODO: 2-2. 원본 set 함수 실행
      
      // TODO: 2-3. 종료 시간 기록 및 실행 시간 계산
      
      // TODO: 2-4. 느린 작업 감지 및 경고 (100ms 이상)
      
      // TODO: 2-5. 성능 메트릭 업데이트
      
    };
    
    // TODO: 3. 성능 데이터 조회 메서드 추가
    api.getPerformanceMetrics = () => {
      // TODO: 3-1. 현재까지의 성능 메트릭 반환
      
    };
    
    // TODO: 4. 성능 메트릭 초기화 메서드 추가
    api.clearPerformanceMetrics = () => {
      // TODO: 4-1. 성능 메트릭 Map 초기화
      
    };
    
    // TODO: 5. config 함수를 감싸진 set, get, api로 실행
    return config(wrappedSet, get, api);
  };
};

// TODO: 추가 기능 구현 (선택사항)
// - 성능 임계값을 설정 가능하도록 개선
// - 액션별 성능 분석을 위한 라벨링 시스템
// - 성능 데이터를 외부로 전송하는 기능