import { createFileRoute, Link } from '@tanstack/react-router';
import styles from './index.module.css';

export const Route = createFileRoute('/products/')({
  component: Products,
});

function Products() {
  return (
    <div>
      <h1 className="page-title">Products</h1>
      <div className="page-content">
        <p>
          다양한 제품들을 둘러보세요. 각 제품을 클릭하면 상세 페이지로
          이동합니다.
        </p>

        <div className={styles.productGrid}>
          
        </div>

        <div className={styles.infoBox}>
          <h3>Link 파라미터 예제</h3>
          <p>
            위의 "상세 보기" 버튼들은 <code>Link</code> 컴포넌트의{' '}
            <code>params</code> prop을 사용하여 동적 라우트로 이동합니다.
          </p>
          <code>
            &lt;Link to="/products/$productId" params=&#123;&#123; productId:
            "1" &#125;&#125;&gt;
          </code>
        </div>
      </div>
    </div>
  );
}
