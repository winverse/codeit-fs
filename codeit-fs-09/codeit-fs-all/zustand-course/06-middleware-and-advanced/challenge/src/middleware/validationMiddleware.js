// TODO: Validation Middleware 구현  
// 목표: 상태 변경 시 데이터 유효성을 검증하는 미들웨어

/**
 * Validation Middleware Template
 * 
 * 요구사항:
 * 1. 상태 변경 전 스키마 유효성 검증
 * 2. 유효하지 않은 데이터 변경 방지  
 * 3. 검증 실패 시 에러 로깅
 * 4. 개발 환경에서만 동작하도록 설정
 */

// TODO: validationMiddleware 함수 구현
export const validationMiddleware = (schema) => {
  return (config) => {
    return (set, get, api) => {
      // TODO: 1. 원본 set 함수를 감싸서 검증 로직 추가
      const wrappedSet = (...args) => {
        // TODO: 1-1. 개발 환경 확인 (process.env.NODE_ENV !== 'production')
        
        // TODO: 1-2. 새로운 상태 계산
        // args가 함수인 경우와 객체인 경우 처리
        
        // TODO: 1-3. 스키마 검증 실행
        
        // TODO: 1-4. 검증 실패 시 에러 로깅 및 상태 변경 방지
        
        // TODO: 1-5. 검증 성공 시 원본 set 함수 실행
        
      };
      
      // TODO: 2. config 함수를 감싸진 set, get, api로 실행
      return config(wrappedSet, get, api);
    };
  };
};

// TODO: 기본 검증 함수들 구현
export const validators = {
  // TODO: required 검증 함수
  required: (value) => {
    // TODO: 값이 존재하는지 확인
    
  },
  
  // TODO: 문자열 최소/최대 길이 검증 함수  
  stringLength: (min, max) => (value) => {
    // TODO: 문자열 길이 검증
    
  },
  
  // TODO: 숫자 범위 검증 함수
  numberRange: (min, max) => (value) => {
    // TODO: 숫자 범위 검증
    
  },
  
  // TODO: 이메일 형식 검증 함수
  email: (value) => {
    // TODO: 이메일 정규식 검증
    
  }
};

// TODO: 스키마 검증 함수 구현
export const validateSchema = (data, schema) => {
  // TODO: 1. 스키마의 각 필드에 대해 검증 실행
  
  // TODO: 2. 검증 실패한 필드들을 수집
  
  // TODO: 3. 검증 결과 반환 (성공 여부와 에러 메시지)
  
};

// TODO: 사용 예시 (주석으로 제공)
/*
// 사용 예시:
const userSchema = {
  name: [validators.required, validators.stringLength(2, 50)],
  email: [validators.required, validators.email],
  age: [validators.required, validators.numberRange(0, 150)]
};

const useUserStore = create(
  validationMiddleware(userSchema)(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
    })
  )
);
*/