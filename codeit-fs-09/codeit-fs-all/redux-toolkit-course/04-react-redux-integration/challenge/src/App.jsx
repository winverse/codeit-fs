import { ProductList } from './components/ProductList.jsx'
import { ShoppingCart } from './components/ShoppingCart.jsx'
import { NotificationCenter } from './components/NotificationCenter.jsx'
import styles from './App.module.css'

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>🛒 React-Redux 쇼핑몰 Challenge</h1>
        <p>Redux Toolkit과 React-Redux를 활용한 상태 관리 연습</p>
      </header>

      <main className={styles.main}>
        <div className={styles.todoSection}>
          <h2>📋 구현할 기능들</h2>
          <div className={styles.todoGrid}>
            <div className={styles.todoCard}>
              <h3>1️⃣ Redux 스토어 설정</h3>
              <ul>
                <li>❌ store.js에서 configureStore 설정</li>
                <li>❌ main.jsx에서 Provider 연결</li>
                <li>❌ 커스텀 훅 (useAppSelector, useAppDispatch) 생성</li>
              </ul>
            </div>
            
            <div className={styles.todoCard}>
              <h3>2️⃣ Products Slice</h3>
              <ul>
                <li>❌ createSlice로 상품 관리</li>
                <li>❌ 필터링 기능 구현</li>
                <li>❌ selector 함수들 구현</li>
              </ul>
            </div>
            
            <div className={styles.todoCard}>
              <h3>3️⃣ Cart Slice</h3>
              <ul>
                <li>❌ 장바구니 아이템 관리</li>
                <li>❌ prepare 함수로 액션 생성</li>
                <li>❌ 총합 계산 로직</li>
              </ul>
            </div>
            
            <div className={styles.todoCard}>
              <h3>4️⃣ Notifications Slice</h3>
              <ul>
                <li>❌ 알림 추가/제거/읽음 처리</li>
                <li>❌ extraReducers로 다른 slice 액션 감지</li>
                <li>❌ 자동 알림 생성</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.appSection}>
          <ProductList />
        </div>
        
        <div className={styles.sidebarSection}>
          <ShoppingCart />
          <NotificationCenter />
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>💡 <strong>학습 포인트:</strong> useSelector, useDispatch, 성능 최적화, extraReducers</p>
      </footer>
    </div>
  )
}