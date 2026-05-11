// TODO: Broadcast Sync Middleware 구현
// 목표: 여러 브라우저 탭 간의 상태 동기화를 위한 미들웨어

/**
 * Broadcast Sync Middleware Template
 * 
 * 요구사항:
 * 1. BroadcastChannel API를 사용한 탭 간 통신
 * 2. 상태 변경을 다른 탭에 브로드캐스트
 * 3. 다른 탭의 상태 변경을 수신하여 로컬 상태 업데이트
 * 4. 무한 루프 방지 메커니즘
 */

// TODO: broadcastSyncMiddleware 함수 구현
export const broadcastSyncMiddleware = (channelName) => {
  return (config) => {
    return (set, get, api) => {
      // TODO: 1. BroadcastChannel 인스턴스 생성
      
      // TODO: 2. 무한 루프 방지를 위한 플래그
      
      // TODO: 3. 원본 set 함수를 감싸서 브로드캐스트 기능 추가
      const wrappedSet = (...args) => {
        // TODO: 3-1. 외부에서 온 업데이트인지 확인 (무한 루프 방지)
        
        // TODO: 3-2. 원본 set 함수 실행
        
        // TODO: 3-3. 상태 변경을 다른 탭에 브로드캐스트
        // 현재 상태를 가져와서 전송
        
      };
      
      // TODO: 4. 다른 탭으로부터의 메시지 수신 처리
      const handleMessage = (event) => {
        // TODO: 4-1. 받은 데이터 유효성 검증
        
        // TODO: 4-2. 무한 루프 방지 플래그 설정 후 상태 업데이트
        
        // TODO: 4-3. 플래그 해제
        
      };
      
      // TODO: 5. 메시지 리스너 등록
      
      // TODO: 6. 정리 함수를 api에 추가
      api.cleanup = () => {
        // TODO: 6-1. 메시지 리스너 제거
        
        // TODO: 6-2. BroadcastChannel 닫기
        
      };
      
      // TODO: 7. config 함수를 감싸진 set, get, api로 실행
      return config(wrappedSet, get, api);
    };
  };
};

// TODO: 유틸리티 함수들 구현

// TODO: 메시지 유효성 검증 함수
const validateMessage = (data) => {
  // TODO: 필요한 필드들이 있는지 확인
  
};

// TODO: 상태 차이 계산 함수 (선택사항)
const calculateStateDiff = (prevState, nextState) => {
  // TODO: 상태 간의 차이점만 추출하여 전송 최적화
  
};

// TODO: 사용 예시 (주석으로 제공)
/*
// 사용 예시:
const useSharedStore = create(
  broadcastSyncMiddleware('shared-store')(
    (set) => ({
      count: 0,
      message: '',
      increment: () => set((state) => ({ count: state.count + 1 })),
      setMessage: (msg) => set({ message: msg }),
    })
  )
);

// 컴포넌트 언마운트 시 정리
useEffect(() => {
  return () => {
    useSharedStore.getState().cleanup?.();
  };
}, []);
*/