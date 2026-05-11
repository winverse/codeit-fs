# 챌린지: createSlice 고급 기능 연습

## 학습 목표

- **prepare 함수**: 액션 페이로드를 사전 처리하고 메타데이터 자동 생성
- **고급 리듀서**: 여러 상태를 동시에 업데이트하는 복잡한 로직 구현
- **Immer 활용**: 중첩된 객체와 배열의 불변성을 자연스럽게 관리

## 해야 할 일

### 1. 기본 createSlice 구조 완성
- [ ] `src/store/gameSlice.js`에서 `createSlice`와 `nanoid` import
- [ ] `gameSlice` 변수에 `createSlice()` 호출 결과 할당
- [ ] 기본 `name`과 `initialState` 설정

### 2. prepare 함수가 있는 액션들 구현

#### 2.1 increaseScore 액션
- [ ] prepare 함수에서 `amount`, `reason` 매개변수 처리
- [ ] 자동으로 `timestamp`와 `id` 생성해서 payload에 포함
- [ ] reducer에서 점수 업데이트 + 게임 히스토리 추가
- [ ] 100점마다 레벨업 로직 (level = Math.floor(score / 100) + 1)

#### 2.2 loseLife 액션  
- [ ] prepare 함수에서 `reason` 매개변수 처리
- [ ] reducer에서 생명 감소 + 히스토리 추가
- [ ] 생명이 0이 되면 게임오버 상태 처리

#### 2.3 gainLife 액션
- [ ] prepare 함수로 생명 증가 이유 처리  
- [ ] 최대 생명 5개 제한

#### 2.4 resetGame 액션
- [ ] prepare 함수에서 리셋 타임스탬프 생성
- [ ] 점수, 레벨, 생명을 초기값으로 리셋
- [ ] 히스토리는 마지막 리셋 기록만 남기기

#### 2.5 unlockAchievement 액션
- [ ] prepare 함수에서 업적 정보(`title`, `description`, `points`) 처리
- [ ] 중복 업적 방지 로직 (같은 title의 업적이 이미 있으면 추가하지 않음)

### 3. 액션 생성자 export
- [ ] 구현한 모든 액션들을 구조분해할당으로 export
- [ ] `gameSlice.actions`에서 가져오기

### 4. 동작 테스트
- [ ] 점수 증가 버튼들이 정상 작동하는지 확인
- [ ] 생명 감소/증가가 올바르게 동작하는지 확인  
- [ ] 레벨업이 100점마다 발생하는지 확인
- [ ] 업적이 올바른 조건에서 해제되는지 확인
- [ ] 게임 오버 시 버튼들이 비활성화되는지 확인

## 구현 힌트

### prepare 함수 기본 구조
```javascript
actionName: {
  prepare(매개변수들) {
    return {
      payload: {
        // 원본 매개변수들
        // + 자동 생성된 메타데이터
        id: nanoid(),
        timestamp: new Date().toISOString(),
      },
    };
  },
  reducer(state, action) {
    // payload 사용해서 상태 업데이트
  },
}
```

### 복잡한 리듀서 로직 예시
```javascript
// 여러 상태를 동시에 업데이트
reducer(state, action) {
  const { amount, reason, timestamp, id } = action.payload;
  
  // 1. 점수 업데이트
  state.score += amount;
  
  // 2. 레벨 계산
  state.level = Math.floor(state.score / 100) + 1;
  
  // 3. 히스토리 추가 (배열에 push - Immer가 불변성 처리)
  state.gameHistory.push({
    id,
    action: 'increaseScore',
    scoreChange: amount,
    reason,
    timestamp,
  });
}
```

### 조건부 로직
```javascript
// 중복 업적 방지
const existingAchievement = state.achievements.find(
  achievement => achievement.title === title
);
if (!existingAchievement) {
  state.achievements.push(newAchievement);
}
```

## 확인하기

### 기본 동작 확인
- [ ] 점수가 올바르게 증가하고 히스토리에 기록되는가?
- [ ] 레벨이 100점마다 자동으로 올라가는가?  
- [ ] 생명이 0이 되면 게임오버 상태가 되는가?

### prepare 함수 확인
- [ ] 각 액션마다 고유한 ID가 생성되는가?
- [ ] 타임스탬프가 올바르게 기록되는가?
- [ ] 게임 히스토리에 액션 정보가 정확히 저장되는가?

### 고급 기능 확인  
- [ ] 업적이 중복으로 해제되지 않는가?
- [ ] 리셋 시 상태가 올바르게 초기화되는가?
- [ ] 복잡한 상태 업데이트가 한 번에 정확히 수행되는가?

---

💡 **참고**: 이 챌린지는 createSlice의 고급 기능에만 집중합니다. 복잡한 게임 로직보다는 **prepare 함수와 고급 리듀서 패턴**을 연습하는 것이 목표입니다!