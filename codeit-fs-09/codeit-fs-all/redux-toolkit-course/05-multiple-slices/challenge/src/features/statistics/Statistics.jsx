import { useSelector, useDispatch } from 'react-redux';
import {
  selectOverallStatistics,
  selectProductivityStats,
  selectMemberWorkload,
  selectProjectProgress,
  selectTaskDistribution,
  setPeriod,
  refreshStatistics,
} from './statisticsSlice';
import styles from './Statistics.module.css';

function Statistics() {
  const overallStats = useSelector(selectOverallStatistics);
  const productivityStats = useSelector(selectProductivityStats);
  const memberWorkload = useSelector(selectMemberWorkload);
  const projectProgress = useSelector(selectProjectProgress);
  const taskDistribution = useSelector(selectTaskDistribution);
  
  const { period, isCalculating } = useSelector(state => state.statistics);
  
  const dispatch = useDispatch();

  function handlePeriodChange(newPeriod) {
    dispatch(setPeriod(newPeriod));
  }

  function handleRefresh() {
    dispatch(refreshStatistics());
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>📊 통계 대시보드</h2>
        <div className={styles.controls}>
          <select
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="select"
          >
            <option value="day">일간</option>
            <option value="week">주간</option>
            <option value="month">월간</option>
          </select>
          <button 
            onClick={handleRefresh}
            className="button"
            disabled={isCalculating}
          >
            {isCalculating ? '계산중...' : '새로고침'}
          </button>
        </div>
      </div>

      {/* 전체 통계 */}
      <div className={styles.section}>
        <h3>전체 현황</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{overallStats.totalTasks}</div>
            <div className="stat-label">전체 할 일</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{overallStats.completedTasks}</div>
            <div className="stat-label">완료된 할 일</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{overallStats.activeProjects}</div>
            <div className="stat-label">활성 프로젝트</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{overallStats.activeMembers}</div>
            <div className="stat-label">활성 팀원</div>
          </div>
        </div>
      </div>

      {/* 생산성 통계 */}
      <div className={styles.section}>
        <h3>{productivityStats.period === 'day' ? '일간' : productivityStats.period === 'week' ? '주간' : '월간'} 생산성</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{productivityStats.tasksCreated}</div>
            <div className="stat-label">생성된 할 일</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{productivityStats.tasksCompleted}</div>
            <div className="stat-label">완료된 할 일</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{productivityStats.completionRate}%</div>
            <div className="stat-label">완료율</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{productivityStats.averageTasksPerMember}</div>
            <div className="stat-label">팀원당 평균 할 일</div>
          </div>
        </div>
      </div>

      {/* 할 일 분포 */}
      <div className={styles.section}>
        <h3>할 일 분포</h3>
        <div className="grid">
          <div className="card">
            <h4>상태별 분포</h4>
            <div className={styles.distributionGrid}>
              <div className={styles.distributionItem}>
                <span className="badge warning">대기중</span>
                <strong>{taskDistribution.byStatus.pending}개</strong>
              </div>
              <div className={styles.distributionItem}>
                <span className="badge info">진행중</span>
                <strong>{taskDistribution.byStatus['in-progress']}개</strong>
              </div>
              <div className={styles.distributionItem}>
                <span className="badge success">완료</span>
                <strong>{taskDistribution.byStatus.completed}개</strong>
              </div>
            </div>
          </div>

          <div className="card">
            <h4>우선순위별 분포</h4>
            <div className={styles.distributionGrid}>
              <div className={styles.distributionItem}>
                <span className="badge info">낮음</span>
                <strong>{taskDistribution.byPriority.low}개</strong>
              </div>
              <div className={styles.distributionItem}>
                <span className="badge warning">보통</span>
                <strong>{taskDistribution.byPriority.medium}개</strong>
              </div>
              <div className={styles.distributionItem}>
                <span className="badge danger">높음</span>
                <strong>{taskDistribution.byPriority.high}개</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 팀원별 워크로드 */}
      <div className={styles.section}>
        <h3>팀원별 워크로드</h3>
        <div className={styles.workloadList}>
          {memberWorkload.map((memberData, index) => (
            <div key={memberData.member.id} className="card">
              <div className={styles.workloadHeader}>
                <div className={styles.memberInfo}>
                  <span className={styles.memberAvatar}>{memberData.member.avatar}</span>
                  <div>
                    <h4>{memberData.member.name}</h4>
                    <p>{memberData.member.role} | {memberData.member.status}</p>
                  </div>
                </div>
                <div className={styles.workloadStats}>
                  <span className="badge info">완료율: {memberData.completionRate}%</span>
                  <span className="badge warning">워크로드: {memberData.workload}</span>
                </div>
              </div>
              
              <div className={styles.taskBreakdown}>
                <div className={styles.taskStat}>
                  <span>전체:</span> <strong>{memberData.totalTasks}</strong>
                </div>
                <div className={styles.taskStat}>
                  <span>완료:</span> <strong>{memberData.completedTasks}</strong>
                </div>
                <div className={styles.taskStat}>
                  <span>진행중:</span> <strong>{memberData.inProgressTasks}</strong>
                </div>
                <div className={styles.taskStat}>
                  <span>대기중:</span> <strong>{memberData.pendingTasks}</strong>
                </div>
              </div>
            </div>
          ))}
          
          {memberWorkload.length === 0 && (
            <div className={styles.emptyState}>
              팀원이 없습니다. 팀원을 추가해주세요.
            </div>
          )}
        </div>
      </div>

      {/* 프로젝트 진행률 */}
      <div className={styles.section}>
        <h3>프로젝트 진행률</h3>
        <div className={styles.projectList}>
          {projectProgress.map((projectData) => (
            <div key={projectData.project.id} className="card">
              <div className={styles.projectHeader}>
                <h4>{projectData.project.name}</h4>
                <span className={`badge ${
                  projectData.progress >= 80 ? 'success' : 
                  projectData.progress >= 50 ? 'warning' : 'info'
                }`}>
                  {projectData.progress}% 완료
                </span>
              </div>
              
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${projectData.progress}%` }}
                />
              </div>
              
              <div className={styles.projectStats}>
                <span>전체 할 일: {projectData.totalTasks}</span>
                <span>완료: {projectData.completedTasks}</span>
                <span>진행중: {projectData.inProgressTasks}</span>
              </div>
            </div>
          ))}
          
          {projectProgress.length === 0 && (
            <div className={styles.emptyState}>
              프로젝트가 없습니다. 프로젝트를 생성해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;