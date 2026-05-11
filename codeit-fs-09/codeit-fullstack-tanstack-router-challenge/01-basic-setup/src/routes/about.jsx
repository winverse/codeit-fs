import { createFileRoute } from '@tanstack/react-router';
import styles from './about.module.css';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  const teamMembers = [
    {
      name: '김개발',
      role: 'Frontend Developer',
      avatar: '👨‍💻',
      skills: ['React', 'TypeScript', 'TanStack Router'],
      description: '사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.',
    },
    {
      name: '이디자인',
      role: 'UI/UX Designer',
      avatar: '👩‍🎨',
      skills: ['Figma', 'Design System', 'User Research'],
      description: '직관적이고 아름다운 인터페이스를 만드는 것을 좋아합니다.',
    },
    {
      name: '박백엔드',
      role: 'Backend Developer',
      avatar: '👨‍🔧',
      skills: ['Node.js', 'GraphQL', 'Database'],
      description: '안정적이고 확장 가능한 서버 시스템을 구축합니다.',
    },
  ];

  const milestones = [
    {
      year: '2023',
      event: '프로젝트 시작',
      description: 'TanStack Router Challenge 프로젝트 기획',
    },
    {
      year: '2023',
      event: '베타 출시',
      description: '초기 버전 개발 및 테스트',
    },
    {
      year: '2024',
      event: '정식 출시',
      description: '안정화된 버전 1.0 릴리스',
    },
    {
      year: '2024',
      event: '커뮤니티 성장',
      description: '1000+ 개발자 커뮤니티 형성',
    },
  ];

  return (
    <div className={styles.pageContent}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>ℹ️ About Our Project</h1>
        <p>
          혁신적인 웹 기술로 더 나은 사용자 경험을 만들어가는 TanStack Router
          Challenge 프로젝트입니다.
        </p>
      </div>

      {/* Mission Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>🎯 우리의 미션</h2>

        <div className={styles.missionGrid}>
          <div className={`${styles.missionCard} ${styles.innovation}`}>
            <div className={styles.icon}>🚀</div>
            <h3>혁신</h3>
            <p>최신 기술을 활용하여 웹 개발의 새로운 패러다임을 제시합니다.</p>
          </div>

          <div className={`${styles.missionCard} ${styles.collaboration}`}>
            <div className={styles.icon}>🤝</div>
            <h3>협력</h3>
            <p>개발자 커뮤니티와 함께 성장하며 지식을 공유합니다.</p>
          </div>

          <div className={`${styles.missionCard} ${styles.education}`}>
            <div className={styles.icon}>💡</div>
            <h3>교육</h3>
            <p>실무 중심의 교육 콘텐츠로 개발자의 성장을 돕습니다.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>👥 팀 소개</h2>

        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.avatar}>{member.avatar}</div>
              <h3>{member.name}</h3>
              <div className={styles.role}>{member.role}</div>
              <p className={styles.description}>{member.description}</p>
              <div className={styles.skills}>
                {member.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className={styles.timeline}>
        <h2 className={styles.sectionTitle}>📅 프로젝트 타임라인</h2>

        <div className={styles.timelineGrid}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles.timelineCard}>
              <div className={styles.year}>{milestone.year}</div>
              <h3>{milestone.event}</h3>
              <p>{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className={styles.features}>
        <h2 className={styles.sectionTitle}>⭐ 핵심 기능</h2>

        <div className={styles.featuresGrid}>
          {[
            {
              icon: '📁',
              title: 'File-based Routing',
              desc: '직관적인 파일 기반 라우팅 시스템',
            },
            {
              icon: '🔒',
              title: 'Type-safe Navigation',
              desc: 'TypeScript로 안전한 네비게이션',
            },
            {
              icon: '⚡',
              title: 'Built-in Code Splitting',
              desc: '자동 코드 분할로 최적화',
            },
            {
              icon: '🔍',
              title: 'Search Parameter Management',
              desc: '강력한 검색 파라미터 관리',
            },
            {
              icon: '🎨',
              title: 'Flexible Styling',
              desc: '다양한 스타일링 옵션 지원',
            },
            {
              icon: '📱',
              title: 'Responsive Design',
              desc: '모든 디바이스에서 완벽한 경험',
            },
          ].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
