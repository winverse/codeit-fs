# 챌린지: 미들웨어와 고급 기능 실습

## 학습 목표

이 챌린지를 통해 다음을 실습합니다:

- **커스텀 미들웨어 개발**: 로그 추적 및 성능 모니터링 미들웨어 작성
- **고급 persist 패턴**: 선택적 상태 저장 및 마이그레이션 로직 구현  
- **스토어 간 통신**: 여러 스토어 간의 효율적인 데이터 교환
- **실시간 동기화**: 브라우저 탭 간 상태 동기화 구현
- **에러 복구 시스템**: 상태 오류 시 자동 복구 메커니즘

## 해야 할 일

### 🎯 1단계: 커스텀 미들웨어 개발

#### Logger 미들웨어 구현
`src/middleware/logger.js` 파일을 생성하고 다음 기능을 구현하세요:

- [ ] 모든 상태 변경을 콘솔에 로그 출력
- [ ] 이전 상태와 새 상태 비교 표시
- [ ] 액션 실행 시간 측정
- [ ] 개발 환경에서만 동작하도록 설정

#### Performance 미들웨어 구현  
`src/middleware/performance.js` 파일을 생성하고 다음 기능을 구현하세요:

- [ ] 상태 업데이트 성능 모니터링
- [ ] 느린 업데이트 (16ms 초과) 경고
- [ ] 메모리 사용량 추적
- [ ] 성능 통계 수집 및 리포팅

### 🎯 2단계: 고급 Persist 패턴

#### 선택적 상태 저장
- [ ] 사용자 설정은 저장하되, 임시 데이터는 제외
- [ ] 민감한 정보(토큰 등)는 sessionStorage에 별도 저장
- [ ] 저장 용량 초과 시 오래된 데이터 자동 정리

#### 데이터 마이그레이션
- [ ] 스토어 버전 관리 시스템 구현
- [ ] 이전 버전 데이터 자동 변환
- [ ] 마이그레이션 실패 시 기본값으로 복구

### 🎯 3단계: 고급 DevTools 연동

#### 액션 추적 강화
- [ ] 각 액션에 고유한 타임스탬프 추가
- [ ] 사용자 컨텍스트 정보 포함
- [ ] 에러 액션 별도 카테고리 분류

#### 상태 스냅샷
- [ ] 중요한 상태 변경 시 스냅샷 자동 저장
- [ ] 이전 상태로 되돌리기 기능
- [ ] 상태 비교 및 디프 표시

### 🎯 4단계: 실시간 동기화 시스템

#### 탭 간 동기화
- [ ] BroadcastChannel API를 활용한 탭 간 통신
- [ ] 한 탭에서 변경된 설정이 모든 탭에 즉시 반영
- [ ] 충돌 해결 전략 구현 (last-writer-wins)

#### 온라인/오프라인 처리
- [ ] 네트워크 상태 감지
- [ ] 오프라인 시 로컬 큐에 변경사항 저장
- [ ] 온라인 복구 시 자동 동기화

### 🎯 5단계: 에러 복구 시스템

#### 상태 검증
- [ ] 스키마 기반 상태 유효성 검사
- [ ] 잘못된 상태 감지 시 자동 복구
- [ ] 백업 상태로 롤백 메커니즘

#### 에러 추적
- [ ] 상태 변경 실패 시 자세한 로그 수집
- [ ] 에러 빈도 모니터링
- [ ] 자동 에러 리포팅 시스템

## 구현 가이드

### 커스텀 미들웨어 기본 구조

```javascript
// src/middleware/logger.js
export const logger = (config, options = {}) => (set, get, api) => {
  // TODO: 설정 검증 및 기본값 설정
  const { enabled = process.env.NODE_ENV === 'development' } = options
  
  if (!enabled) {
    return config(set, get, api)
  }

  // TODO: 로깅 로직 구현
  const loggedSet = (...args) => {
    // TODO: 이전 상태 저장
    // TODO: 액션 실행
    // TODO: 새 상태와 비교하여 로그 출력
  }

  return config(loggedSet, get, api)
}
```

### BroadcastChannel 동기화 예시

```javascript
// src/middleware/sync.js
export const crossTabSync = (config, options = {}) => (set, get, api) => {
  // TODO: BroadcastChannel 생성
  const channel = new BroadcastChannel('zustand-sync')
  
  // TODO: 다른 탭에서 오는 메시지 수신
  channel.addEventListener('message', (event) => {
    // TODO: 상태 업데이트 처리
  })

  // TODO: 상태 변경 시 다른 탭에 브로드캐스트
  const syncedSet = (...args) => {
    const result = set(...args)
    // TODO: 변경사항을 다른 탭에 전송
    return result
  }

  return config(syncedSet, get, api)
}
```

### 성능 모니터링 구조

```javascript
// src/middleware/performance.js
export const performance = (config, options = {}) => (set, get, api) => {
  const stats = {
    totalUpdates: 0,
    slowUpdates: 0,
    averageTime: 0
  }

  const performanceSet = (...args) => {
    // TODO: 시작 시간 기록
    const startTime = Date.now()
    
    // TODO: 액션 실행
    const result = set(...args)
    
    // TODO: 실행 시간 계산 및 통계 업데이트
    const duration = Date.now() - startTime
    
    return result
  }

  // TODO: 성능 통계 조회 함수를 API에 추가
  api.getPerformanceStats = () => stats

  return config(performanceSet, get, api)
}
```

## 확인하기

### 기본 기능 검증
- [ ] 모든 미들웨어가 정상적으로 조합되어 작동하는가?
- [ ] 개발자 도구에서 액션 추적이 명확한가?
- [ ] localStorage에 상태가 올바르게 저장되는가?
- [ ] 새로고침 후에도 상태가 복원되는가?

### 고급 기능 검증
- [ ] 여러 브라우저 탭에서 동시에 열었을 때 동기화되는가?
- [ ] 느린 액션이 경고와 함께 표시되는가?
- [ ] 잘못된 상태가 자동으로 복구되는가?
- [ ] 에러 발생 시 적절한 로그가 출력되는가?

### 사용성 검증
- [ ] 사용자 경험이 끊김없이 매끄러운가?
- [ ] 로그 출력이 개발에 도움이 되는가?
- [ ] 성능 저하 없이 모든 기능이 작동하는가?

## 보너스 미션 🚀

### 1. 실시간 협업 기능
- 여러 사용자가 동시에 같은 설정을 변경할 때의 충돌 해결
- 변경 이력 추적 및 되돌리기 기능

### 2. 고급 분석 도구  
- 사용자 행동 패턴 분석
- 가장 많이 변경되는 설정 통계
- 성능 병목지점 자동 감지

### 3. 플러그인 시스템
- 써드파티 미들웨어 등록 시스템
- 미들웨어 간 의존성 관리
- 동적 미들웨어 로딩

## 참고 자료

- [Zustand Middleware 공식 문서](https://github.com/pmndrs/zustand#middleware)
- [BroadcastChannel API 문서](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- [Performance API 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)