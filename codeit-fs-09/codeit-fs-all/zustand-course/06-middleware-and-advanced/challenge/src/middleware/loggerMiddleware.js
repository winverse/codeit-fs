// TODO: Logger Middleware 구현
// 목표: 모든 상태 변경을 로깅하는 미들웨어 (Redux DevTools 스타일)

/**
 * Logger Middleware Template
 * 
 * 요구사항:
 * 1. 모든 상태 변경을 콘솔에 로깅
 * 2. 이전 상태, 액션, 다음 상태 정보 표시
 * 3. 타임스탬프와 실행 시간 포함
 * 4. 프로덕션 환경에서는 비활성화
 */

// TODO: loggerMiddleware 함수 구현
export const loggerMiddleware = (options = {}) => {
  const {
    // TODO: 기본 옵션 설정
    prefix = 'Zustand',
    enabled = process.env.NODE_ENV !== 'production',
    colors = {
      prevState: '#9E9E9E',
      action: '#03A9F4', 
      nextState: '#4CAF50'
    }
  } = options;
  
  return (config) => {
    return (set, get, api) => {
      // TODO: 1. 로깅이 비활성화된 경우 원본 config 반환
      if (!enabled) {
        return config(set, get, api);
      }
      
      // TODO: 2. 원본 set 함수를 감싸서 로깅 기능 추가
      const wrappedSet = (...args) => {
        // TODO: 2-1. 이전 상태 저장
        
        // TODO: 2-2. 시작 시간 기록
        
        // TODO: 2-3. 원본 set 함수 실행
        
        // TODO: 2-4. 다음 상태 가져오기
        
        // TODO: 2-5. 실행 시간 계산
        
        // TODO: 2-6. 콘솔 그룹으로 로그 출력
        // 그룹 제목, 이전 상태, 액션, 다음 상태, 실행 시간 포함
        
      };
      
      // TODO: 3. config 함수를 감싸진 set, get, api로 실행
      return config(wrappedSet, get, api);
    };
  };
};

// TODO: 유틸리티 함수들 구현

// TODO: 액션 정보 추출 함수
const getActionInfo = (args) => {
  // TODO: set 함수의 인자로부터 액션 정보 추출
  // 함수인 경우 함수명, 객체인 경우 변경된 키들 반환
  
};

// TODO: 시간 포맷팅 함수  
const formatTime = (timestamp) => {
  // TODO: 타임스탬프를 읽기 쉬운 형태로 포맷
  
};

// TODO: 객체 깊이 제한 함수 (큰 객체 처리용)
const limitDepth = (obj, maxDepth = 3) => {
  // TODO: 객체의 깊이를 제한하여 로그 가독성 향상
  
};

// TODO: 사용 예시 (주석으로 제공)
/*
// 사용 예시:
const useCounterStore = create(
  loggerMiddleware({
    prefix: 'Counter Store',
    enabled: true,
    colors: {
      prevState: '#FF5722',
      action: '#2196F3',
      nextState: '#8BC34A'
    }
  })(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    })
  )
);
*/