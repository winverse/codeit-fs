import { createFileRoute } from '@tanstack/react-router'
import styles from './contact.module.css'

export const Route = createFileRoute('/contact')({
  component: () => (
    <div>
      <h1 className="page-title">Contact Us</h1>
      <div className="page-content">
        <p>연락처 정보와 문의 방법을 안내합니다.</p>
        
        <div className={styles.grid}>
          <div>
            <h3>연락처 정보</h3>
            <ul className={styles.list}>
              <li>📧 Email: hello@tanstack.com</li>
              <li>📞 Phone: +1 (555) 123-4567</li>
              <li>🏢 Address: 123 Router Street, React City</li>
            </ul>
          </div>

          <div>
            <h3>소셜 미디어</h3>
            <ul className={styles.list}>
              <li>🐦 Twitter: @tanstack</li>
              <li>💼 LinkedIn: /company/tanstack</li>
              <li>🐙 GitHub: github.com/tanstack</li>
            </ul>
          </div>
        </div>

        <div className={styles.infoBox}>
          <h3>내비게이션 팁</h3>
          <p>
            이 페이지는 <code>Link</code> 컴포넌트를 통해 접근할 수 있습니다.
            브라우저의 뒤로가기/앞으로가기 버튼도 정상적으로 작동합니다.
          </p>
        </div>
      </div>
    </div>
  )
})
