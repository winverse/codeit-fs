import { useState } from 'react';
import ProjectManager from '@/features/projects/ProjectManager';
import TaskManager from '@/features/tasks/TaskManager';
import MemberManager from '@/features/members/MemberManager';
import Statistics from '@/features/statistics/Statistics';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  function renderContent() {
    switch (activeTab) {
      case 'projects':
        return <ProjectManager />;
      case 'tasks':
        return <TaskManager />;
      case 'members':
        return <MemberManager />;
      case 'statistics':
        return <Statistics />;
      default:
        return (
          <div className={styles.overview}>
            <div className={styles.welcomeCard}>
              <h2>🚀 고급 프로젝트 관리 시스템</h2>
              <p>
                Redux Toolkit을 활용한 복합 상태 관리 시스템입니다.<br />
                여러 slice가 서로 연동되어 복잡한 데이터 관계를 처리합니다.
              </p>
              
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📋</span>
                  <h3>프로젝트 관리</h3>
                  <p>프로젝트 생성, 상태 관리, 비동기 작업 처리</p>
                </div>
                
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✅</span>
                  <h3>할 일 관리</h3>
                  <p>복잡한 필터링, 크로스 슬라이스 선택자 활용</p>
                </div>
                
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>👥</span>
                  <h3>팀원 관리</h3>
                  <p>팀원 추가/제거, 상태 관리, 역할 할당</p>
                </div>
                
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📊</span>
                  <h3>통계 대시보드</h3>
                  <p>실시간 통계, 성능 지표, 진행률 추적</p>
                </div>
              </div>

              <div className={styles.techStack}>
                <h3>🛠 기술 스택</h3>
                <div className={styles.techList}>
                  <span className="badge success">Redux Toolkit 2.9.0</span>
                  <span className="badge info">React 18</span>
                  <span className="badge warning">Vite 5</span>
                  <span className="badge danger">CSS Modules</span>
                </div>
              </div>

              <div className={styles.highlights}>
                <h3>✨ 주요 특징</h3>
                <ul>
                  <li><strong>정규화된 상태 구조:</strong> entities 패턴으로 효율적인 데이터 관리</li>
                  <li><strong>크로스 슬라이스 선택자:</strong> createSelector로 복잡한 데이터 조합</li>
                  <li><strong>비동기 thunk 액션:</strong> createAsyncThunk로 API 호출 시뮬레이션</li>
                  <li><strong>복합 필터링 시스템:</strong> 다차원 필터로 정교한 데이터 검색</li>
                  <li><strong>실시간 통계:</strong> 메모이제이션된 선택자로 성능 최적화</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>Redux Toolkit Challenge</h1>
        <p>Advanced Multiple Slices Management</p>
      </header>

      <nav className={styles.nav}>
        <button
          className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          🏠 개요
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'projects' ? styles.active : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📋 프로젝트
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'tasks' ? styles.active : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          ✅ 할 일
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'members' ? styles.active : ''}`}
          onClick={() => setActiveTab('members')}
        >
          👥 팀원
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'statistics' ? styles.active : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          📊 통계
        </button>
      </nav>

      <main className={styles.main}>
        {renderContent()}
      </main>

      <footer className={styles.footer}>
        <p>
          이 프로젝트는 Redux Toolkit의 고급 기능들을 종합적으로 활용한 예제입니다.<br />
          여러 slice 간의 복잡한 상호작용과 정규화된 상태 관리를 학습할 수 있습니다.
        </p>
      </footer>
    </div>
  );
}

export default App;