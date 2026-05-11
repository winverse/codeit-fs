import { useSelector, useDispatch } from 'react-redux';
import { 
  increaseScore,
  loseLife,  
  gainLife,
  resetGame,
  unlockAchievement,
  selectScore,
  selectLevel,
  selectLives,
  selectIsGameOver,
  selectRecentHistory,
  selectAchievements
} from '@/store/gameSlice.js';
import styles from '@/components/GameScore/GameScore.module.css';

export function GameScore() {
  const dispatch = useDispatch();
  const score = useSelector(selectScore);
  const level = useSelector(selectLevel);
  const lives = useSelector(selectLives);
  const isGameOver = useSelector(selectIsGameOver);
  const recentHistory = useSelector(state => selectRecentHistory(state, 5));
  const achievements = useSelector(selectAchievements);

  // 게임 액션 핸들러들
  function handleScoreIncrease(amount, reason) {
    if (!isGameOver) {
      dispatch(increaseScore({ amount, reason }));
      
      // 특정 점수 달성 시 업적 해제
      const newScore = score + amount;
      if (newScore >= 100 && !achievements.find(a => a.title === 'First Century')) {
        dispatch(unlockAchievement({
          title: 'First Century',
          description: '100점 달성!',
          points: 10
        }));
      }
      if (newScore >= 500 && !achievements.find(a => a.title === 'High Scorer')) {
        dispatch(unlockAchievement({
          title: 'High Scorer', 
          description: '500점 달성!',
          points: 25
        }));
      }
    }
  }

  function handleLoseLife(reason) {
    if (!isGameOver) {
      dispatch(loseLife({ reason }));
    }
  }

  function handleGainLife(reason) {
    if (!isGameOver && lives < 5) {
      dispatch(gainLife({ reason }));
    }
  }

  function handleReset() {
    dispatch(resetGame());
  }

  return (
    <div className={styles.container}>
      <div className={styles.gameSection}>
        <h2>🎮 게임 상태</h2>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>점수:</span>
            <span className={styles.statValue}>{score}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>레벨:</span>
            <span className={styles.statValue}>{level}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>생명:</span>
            <span className={styles.statValue}>{'❤️'.repeat(lives)}</span>
          </div>
        </div>

        {isGameOver && (
          <div className={styles.gameOver}>
            <h3>🎯 게임 오버!</h3>
            <p>최종 점수: {score}점</p>
          </div>
        )}

        <div className={styles.actions}>
          <h3>점수 획득</h3>
          <div className={styles.scoreButtons}>
            <button 
              onClick={() => handleScoreIncrease(10, '적 처치')}
              disabled={isGameOver}
              className={styles.actionButton}
            >
              적 처치 (+10)
            </button>
            <button 
              onClick={() => handleScoreIncrease(25, '보너스 아이템')}
              disabled={isGameOver}
              className={styles.actionButton}
            >
              보너스 (+25)
            </button>
            <button 
              onClick={() => handleScoreIncrease(50, '스테이지 클리어')}
              disabled={isGameOver}
              className={styles.actionButton}
            >
              클리어 (+50)
            </button>
          </div>

          <h3>생명 관리</h3>
          <div className={styles.lifeButtons}>
            <button 
              onClick={() => handleLoseLife('적과 충돌')}
              disabled={isGameOver}
              className={styles.dangerButton}
            >
              생명 잃기 (-1)
            </button>
            <button 
              onClick={() => handleGainLife('1UP 아이템')}
              disabled={isGameOver || lives >= 5}
              className={styles.bonusButton}
            >
              생명 얻기 (+1)
            </button>
          </div>

          <div className={styles.resetSection}>
            <button onClick={handleReset} className={styles.resetButton}>
              게임 리셋
            </button>
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.historySection}>
          <h3>📊 최근 기록</h3>
          {recentHistory.length === 0 ? (
            <p className={styles.noHistory}>아직 기록이 없습니다.</p>
          ) : (
            <div className={styles.historyList}>
              {recentHistory.map((entry) => (
                <div key={entry.id} className={styles.historyItem}>
                  <div className={styles.historyAction}>
                    {entry.action}
                    {entry.reason && <span className={styles.reason}>({entry.reason})</span>}
                  </div>
                  <div className={styles.historyDetail}>
                    {entry.scoreChange && (
                      <span className={styles.scoreChange}>
                        {entry.scoreChange > 0 ? '+' : ''}{entry.scoreChange}점
                      </span>
                    )}
                    <span className={styles.timestamp}>
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.achievementsSection}>
          <h3>🏆 업적</h3>
          {achievements.length === 0 ? (
            <p className={styles.noAchievements}>아직 달성한 업적이 없습니다.</p>
          ) : (
            <div className={styles.achievementsList}>
              {achievements.map((achievement) => (
                <div key={achievement.id} className={styles.achievement}>
                  <div className={styles.achievementTitle}>
                    {achievement.title}
                  </div>
                  <div className={styles.achievementDesc}>
                    {achievement.description}
                  </div>
                  <div className={styles.achievementPoints}>
                    +{achievement.points}pt
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}