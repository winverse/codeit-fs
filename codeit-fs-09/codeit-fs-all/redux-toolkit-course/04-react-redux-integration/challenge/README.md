# 챌린지: React-Redux 통합 연습

## 🎯 학습 목표

이 챌린지를 통해 다음을 연습합니다:

- **Provider 설정**: Redux 스토어를 React 앱에 연결하기
- **useSelector 활용**: Redux 상태를 컴포넌트에서 구독하기  
- **useDispatch 활용**: 액션을 디스패치하여 상태 업데이트하기
- **커스텀 훅 생성**: 타입 안전한 useAppSelector, useAppDispatch 구현
- **성능 최적화**: 불필요한 리렌더링 방지 패턴 적용
- **extraReducers 활용**: 다른 slice의 액션에 반응하는 로직 구현

## � 미션: 쇼핑몰 앱 구현

3개의 주요 기능을 Redux로 관리하는 쇼핑몰을 완성해보세요:

### 1️⃣ Redux 스토어 설정 (필수)
- [ ] `src/store/store.js`에서 `configureStore` 설정
- [ ] `src/main.jsx`에서 `Provider` 컴포넌트로 앱 감싸기
- [ ] `src/hooks/hooks.js`에서 `useAppSelector`, `useAppDispatch` 커스텀 훅 구현

### 2️⃣ Products Slice 구현
- [ ] `src/features/products/productsSlice.js` 완성
- [ ] `setFilter` reducer: 상품 필터링 ('all', 'inStock', 'electronics', 'furniture')
- [ ] `updateStock` reducer: 상품 재고 상태 업데이트
- [ ] `selectFilteredProducts` selector: 필터에 맞는 상품들만 반환

### 3️⃣ Cart Slice 구현
- [ ] `src/features/cart/cartSlice.js` 완성
- [ ] `addToCart` reducer: prepare 함수로 상품을 장바구니에 추가
- [ ] `removeFromCart` reducer: 상품을 장바구니에서 제거
- [ ] `updateQuantity` reducer: 상품 수량 변경
- [ ] `calculateTotals` 로직: 총 수량과 가격 자동 계산

### 4️⃣ Notifications Slice 구현  
- [ ] `src/features/notifications/notificationsSlice.js` 완성
- [ ] `addNotification` reducer: prepare 함수로 새 알림 생성
- [ ] `markAsRead`, `removeNotification` reducer 구현
- [ ] `extraReducers`: 장바구니 액션들을 감지하여 자동으로 알림 생성

### 5️⃣ 컴포넌트 연결
- [ ] `ProductList` 컴포넌트: 상품 목록 표시 및 필터링
- [ ] `ShoppingCart` 컴포넌트: 장바구니 아이템 관리
- [ ] `NotificationCenter` 컴포넌트: 알림 표시 및 관리

## 💡 구현 힌트

### Store 설정 예시
```javascript
// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import notificationsReducer from '../features/notifications/notificationsSlice.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,  
    notifications: notificationsReducer,
  },
})
```

### 커스텀 훅 예시
```javascript
// hooks/hooks.js
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
```

### extraReducers 활용 예시
```javascript
// notificationsSlice.js에서
extraReducers: (builder) => {
  builder
    .addCase('cart/addToCart', (state, action) => {
      // 장바구니에 아이템이 추가될 때 알림 생성
    })
    .addCase('cart/removeFromCart', (state, action) => {
      // 장바구니에서 아이템이 제거될 때 알림 생성
    })
}
```

## ✅ 확인하기

완성 후 다음 기능들이 정상 작동하는지 확인해보세요:

- [ ] 앱이 에러 없이 실행되는가?
- [ ] 상품 필터링 버튼들이 작동하는가?
- [ ] 상품을 장바구니에 추가할 수 있는가?
- [ ] 장바구니에서 수량 조절이 가능한가?
- [ ] 장바구니 총합이 올바르게 계산되는가?
- [ ] 장바구니 액션 시 자동으로 알림이 생성되는가?
- [ ] 알림을 읽음 처리하고 삭제할 수 있는가?
- [ ] Redux DevTools에서 모든 액션을 확인할 수 있는가?

## 🚀 보너스 도전

기본 기능을 완성했다면 다음 기능들을 추가해보세요:

- [ ] **성능 최적화**: React.memo, useCallback, useMemo 적용
- [ ] **로컬 스토리지**: 장바구니 상태를 브라우저에 저장
- [ ] **상품 검색**: 상품명으로 검색하는 기능
- [ ] **사용자 인증**: 로그인 상태에 따른 기능 제한
- [ ] **주문 히스토리**: 주문 완료된 상품들의 기록

---

**💡 학습 포인트**: 이 챌린지는 Redux Toolkit의 핵심 개념들을 실제 앱에서 어떻게 활용하는지 체험하게 해줍니다. 각 slice가 어떻게 상호작용하고, React 컴포넌트가 어떻게 Redux 상태를 구독하는지 집중해서 관찰해보세요!