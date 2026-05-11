import { createFileRoute } from "@tanstack/react-router";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <div className={styles.hero}>
        <h1 className={styles.title}>🏪 ShopHub에 오신 것을 환영합니다!</h1>
        <p className={styles.subtitle}>
          최신 상품들과 다양한 카테고리를 탐색해보세요.
          <br />
          라우트 파라미터를 활용한 상품 상세 페이지와 카테고리별 필터링을 경험할
          수 있습니다.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📦</div>
            <h3>상품 탐색</h3>
            <p>
              다양한 상품들을 둘러보고 상세 정보를 확인해보세요. 각 상품마다
              고유한 ID로 접근할 수 있습니다.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏷️</div>
            <h3>카테고리별 정리</h3>
            <p>
              카테고리별로 정리된 상품들을 확인하고, 각 카테고리의 상품 목록을
              살펴보세요.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.learningGoals}>
        <h2>🎯 학습 목표</h2>
        <ul>
          <li>
            <strong>동적 라우팅:</strong> 상품 ID를 통한 상품 상세 페이지 구현
          </li>
          <li>
            <strong>중첩 라우팅:</strong> 카테고리 → 상품 구조의 계층적 라우팅
          </li>
          <li>
            <strong>파라미터 활용:</strong> URL 파라미터를 활용한 데이터 로딩
          </li>
          <li>
            <strong>네비게이션:</strong> Link 컴포넌트를 통한 SPA 네비게이션
          </li>
        </ul>
      </div>
    </div>
  ),
});