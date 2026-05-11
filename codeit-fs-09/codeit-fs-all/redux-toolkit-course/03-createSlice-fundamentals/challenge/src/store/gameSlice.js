// TODO: createSlice와 nanoid를 import 하세요
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
  level: 1,
  lives: 3,
  gameHistory: [], // 점수 변화 히스토리
  achievements: [], // 달성한 업적들
};

// TODO: createSlice로 gameSlice를 생성하세요
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // 1. increaseScore: 점수 증가
    increaseScore: {
      reducer(state, action) {
        const { amount, reason, timestamp, id } = action.payload;
        
        // 점수 증가
        state.score += amount;
        
        // 히스토리에 추가
        state.gameHistory.push({
          id,
          timestamp,
          type: 'score_increase',
          amount,
          reason,
          totalScore: state.score
        });
        
        // 레벨업 확인 (100점마다 레벨업)
        const newLevel = Math.floor(state.score / 100) + 1;
        if (newLevel > state.level) {
          state.level = newLevel;
          state.gameHistory.push({
            id: nanoid(),
            timestamp: new Date().toISOString(),
            type: 'level_up',
            level: newLevel,
            reason: `레벨 ${newLevel} 달성!`
          });
        }
      },
      prepare(amount, reason = '점수 획득') {
        return {
          payload: {
            amount,
            reason,
            timestamp: new Date().toISOString(),
            id: nanoid()
          }
        };
      }
    },
    
    // 2. loseLife: 생명 감소
    loseLife: {
      reducer(state, action) {
        const { reason, timestamp, id } = action.payload;
        
        // 생명 감소
        state.lives -= 1;
        
        // 히스토리에 추가
        state.gameHistory.push({
          id,
          timestamp,
          type: 'life_lost',
          reason,
          remainingLives: state.lives
        });
        
        // 게임 오버 확인
        if (state.lives <= 0) {
          state.gameHistory.push({
            id: nanoid(),
            timestamp: new Date().toISOString(),
            type: 'game_over',
            reason: '생명이 모두 소진됨',
            finalScore: state.score,
            finalLevel: state.level
          });
        }
      },
      prepare(reason = '실수로 생명 잃음') {
        return {
          payload: {
            reason,
            timestamp: new Date().toISOString(),
            id: nanoid()
          }
        };
      }
    },
    
    // 3. gainLife: 생명 증가 (보너스)
    gainLife: {
      reducer(state, action) {
        const { reason, timestamp, id } = action.payload;
        
        // 생명 증가 (최대 5개)
        if (state.lives < 5) {
          state.lives += 1;
          
          // 히스토리에 추가
          state.gameHistory.push({
            id,
            timestamp,
            type: 'life_gained',
            reason,
            totalLives: state.lives
          });
        }
      },
      prepare(reason = '보너스 생명 획득') {
        return {
          payload: {
            reason,
            timestamp: new Date().toISOString(),
            id: nanoid()
          }
        };
      }
    },
    
    // 4. resetGame: 게임 초기화
    resetGame(state) {
      // 게임 상태 리셋 (히스토리와 업적은 유지)
      state.score = initialState.score;
      state.level = initialState.level;
      state.lives = initialState.lives;
      
      // 리셋 히스토리 추가
      state.gameHistory.push({
        id: nanoid(),
        timestamp: new Date().toISOString(),
        type: 'game_reset',
        reason: '게임 재시작'
      });
    },
    
    // 5. unlockAchievement: 업적 달성
    unlockAchievement: {
      reducer(state, action) {
        const { title, description, points, timestamp, id } = action.payload;
        
        // 중복 업적 방지
        const existingAchievement = state.achievements.find(
          achievement => achievement.title === title
        );
        
        if (!existingAchievement) {
          // 새 업적 추가
          state.achievements.push({
            id,
            title,
            description,
            points,
            timestamp,
            unlockedAt: timestamp
          });
          
          // 업적 점수 추가
          state.score += points;
          
          // 히스토리에 추가
          state.gameHistory.push({
            id: nanoid(),
            timestamp,
            type: 'achievement_unlocked',
            achievement: title,
            points,
            reason: `업적 달성: ${title}`
          });
        }
      },
      prepare(title, description, points = 50) {
        return {
          payload: {
            title,
            description,
            points,
            timestamp: new Date().toISOString(),
            id: nanoid()
          }
        };
      }
    }
  }
});

/* 
구현해야 할 액션들:

1. increaseScore: 점수 증가
   - prepare 함수 사용: amount, reason(점수 획득 이유) 받기
   - 자동으로 timestamp와 id 생성
   - 점수 업데이트 시 레벨업 확인 (100점마다 레벨업)
   
2. loseLife: 생명 감소  
   - prepare 함수 사용: reason(생명 잃은 이유) 받기
   - 생명이 0이 되면 게임오버 상태 설정

3. gainLife: 생명 증가 (보너스)
   - prepare 함수로 이유 추가

4. resetGame: 게임 초기화
   - 모든 상태를 초기값으로 리셋
   - 히스토리와 업적은 유지

5. unlockAchievement: 업적 달성
   - prepare 함수로 업적 정보 처리 (title, description, points)
   - 중복 업적 방지 로직

힌트: 
- prepare 함수에서 nanoid()로 고유 ID 생성
- new Date().toISOString()로 타임스탬프 생성  
- 복잡한 로직은 reducer에서 여러 상태를 동시에 업데이트
*/

// TODO: 액션들을 export 하세요
export const { 
  increaseScore,
  loseLife,
  gainLife,
  resetGame,
  unlockAchievement
} = gameSlice.actions;

// TODO: 셀렉터들을 구현하세요
export const selectScore = (state) => state.game?.score || 0;
export const selectLevel = (state) => state.game?.level || 1;
export const selectLives = (state) => state.game?.lives || 3;
export const selectGameHistory = (state) => state.game?.gameHistory || [];
export const selectAchievements = (state) => state.game?.achievements || [];
export const selectIsGameOver = (state) => (state.game?.lives || 3) <= 0;

// 최근 게임 히스토리만 가져오는 셀렉터
export const selectRecentHistory = (state, limit = 5) => {
  const history = selectGameHistory(state);
  return history.slice(-limit);
};

export default gameSlice.reducer;