import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "./index.module.css";

function HomePage() {
  const features = [
    {
      icon: "⚡",
      title: "빠른 속도",
      description: "최적화된 라우팅으로 빠른 페이지 전환을 경험하세요.",
    },
    {
      icon: "🔒",
      title: "타입 안전성",
      description:
        "TypeScript와 완벽하게 통합되어 타입 안전한 라우팅을 제공합니다.",
    },
    {
      icon: "🎯",
      title: "직관적인 API",
      description: "간단하고 직관적인 API로 쉽게 라우팅을 구성할 수 있습니다.",
    },
  ];

  const stats = [
    { number: "50K+", label: "활성 사용자" },
    { number: "99.9%", label: "가동률" },
    { number: "24/7", label: "기술 지원" },
    { number: "100+", label: "성공 프로젝트" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1>
          🚀 TanStack Router Challenge
        </h1>
        <p>
          현대적이고 강력한 React 라우팅 솔루션으로 놀라운 사용자 경험을
          만들어보세요.
        </p>
        <div className={styles.buttonGroup}>
          <Link
            to="/services"
            className={`${styles.button} ${styles.buttonPrimary}`}>
            서비스 둘러보기 →
          </Link>
          <Link
            to="/contact"
            className={`${styles.button} ${styles.buttonSecondary}`}>
            문의하기
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          ✨ 주요 특징
        </h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureCard}
            >
              <div className={styles.icon}>
                {feature.icon}
              </div>
              <h3>
                {feature.title}
              </h3>
              <p>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>
          📊 우리의 성과
        </h2>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>
                {stat.number}
              </div>
              <div className={styles.statLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div className={styles.gettingStartedSection}>
        <h2>
          🎯 시작하기
        </h2>
        <p>
          TanStack Router Challenge 프로젝트에 오신 것을 환영합니다! 이
          프로젝트는 Starter 버전보다 더 발전된 기능들을 포함하고 있습니다.
        </p>

        <div className={styles.featuresListContainer}>
          <h3>
            📝 추가된 기능들:
          </h3>
          <ul className={styles.featuresList}>
            <li>
              ✅ 고급 네비게이션 UI (activeProps 활용)
            </li>
            <li>
              ✅ Contact 페이지 (폼 처리, 상태 관리)
            </li>
            <li>
              ✅ Services 페이지 (복잡한 레이아웃)
            </li>
            <li>
              ✅ 반응형 디자인
            </li>
            <li>
              ✅ 인터랙티브 UI 컴포넌트
            </li>
          </ul>
        </div>

        <div className={styles.buttonGroup}>
          <Link
            to="/about"
            className={`${styles.button} ${styles.buttonPrimary}`}>
            About 페이지 보기
          </Link>
          <Link
            to="/services"
            className={`${styles.button} ${styles.buttonSecondary}`}>
            모든 서비스 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});