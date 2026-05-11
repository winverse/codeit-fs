# Chapter 06 - extraReducers Challenge: 쇼핑몰 재고 관리

## 🎯 목표

이 challenge는 **extraReducers**를 사용해 여러 slice 간 상호작용을 처리하는 방법을 배우는 실습입니다. 쇼핑몰의 재고 관리 시스템을 구현하면서 장바구니, 상품, 재고 slice가 서로 영향을 미치는 복잡한 상황을 다뤄보겠습니다.

## 📚 학습 포인트

### 1. extraReducers 기본 개념
```javascript
// Builder 콜백 패턴 사용
extraReducers: (builder) => {
  builder
    .addCase(someAction, (state, action) => {
      // 다른 slice의 액션에 반응
    });
}
```

### 2. 크로스 슬라이스 상호작용
- 장바구니에 상품 추가 → 재고 감소
- 재고 부족 시 알림 생성
- 입고 시 재고 업데이트 및 알림 처리

## 🚀 설치 및 실행

```bash
npm install
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── features/
│   ├── products/     # 상품 관리
│   ├── cart/         # 장바구니 관리
│   └── inventory/    # 재고 관리
├── components/       # UI 컴포넌트
└── store/           # Redux 스토어 설정
```

## ✅ TODO 과제 목록

### 🔴 필수 구현사항

#### 1. Cart Slice의 extraReducers 구현
**파일**: `src/features/cart/cartSlice.js`

```javascript
// TODO: products/restockProduct 액션 처리
// 힌트: 입고된 상품이 장바구니에 있다면 사용 가능 상태로 표시
```

#### 2. Inventory Slice의 extraReducers 구현
**파일**: `src/features/inventory/inventorySlice.js`

```javascript
// TODO: cart/addToCart 액션 처리
// 힌트: 장바구니에 추가할 때 재고 감소 및 부족 시 알림 생성

// TODO: cart/updateQuantity 액션 처리
// 힌트: 수량 변경 시 재고 조정

// TODO: cart/removeFromCart 액션 처리
// 힌트: 장바구니에서 제거 시 재고 복원
```

#### 3. Products Slice의 extraReducers 구현
**파일**: `src/features/products/productsSlice.js`

```javascript
// TODO: inventory/restockProduct 액션 처리
// 힌트: 입고 시 상품의 사용 가능 상태 업데이트
```

### 🟡 심화 과제 (선택사항)

1. **재고 부족 예방**: 장바구니에 추가할 때 재고 확인
2. **대량 주문 처리**: 한번에 여러 상품 주문 시 재고 관리
3. **예약 주문**: 재고 부족 시 예약 주문 기능

## 💡 구현 힌트

### extraReducers 패턴
```javascript
extraReducers: (builder) => {
  builder
    .addCase(외부액션, (state, action) => {
      // 상태 업데이트 로직
    })
    .addCase(다른외부액션, (state, action) => {
      // 또 다른 처리 로직
    });
}
```

### 상태 업데이트 예시
```javascript
// 재고 감소
state.stock[productId] = Math.max(0, state.stock[productId] - quantity);

// 알림 추가
state.alerts.push({
  id: Date.now(),
  message: `${productName} 재고가 부족합니다.`,
  timestamp: new Date().toISOString()
});
```

## 🔍 테스트 시나리오

### 1. 기본 플로우
1. 상품을 장바구니에 추가
2. 재고가 자동으로 감소하는지 확인
3. 재고 부족 시 알림이 표시되는지 확인

### 2. 재고 관리
1. 재고 패널에서 입고 버튼 클릭
2. 재고가 증가하고 알림이 사라지는지 확인
3. 장바구니 상품 상태가 업데이트되는지 확인

### 3. 수량 조절
1. 장바구니에서 수량 증가/감소
2. 재고가 적절히 조정되는지 확인
3. 수량을 0으로 만들면 장바구니에서 제거되는지 확인

## 📖 학습 자료

### Redux Toolkit 공식 문서
- [extraReducers](https://redux-toolkit.js.org/api/createslice#extrareducers)
- [Builder Callback Notation](https://redux-toolkit.js.org/api/createslice#extrareducers)

### 참고 패턴
- Cross-slice communication
- Shared actions
- Complex state relationships

## 🏆 완성 기준

- [ ] 모든 TODO 주석이 구현됨
- [ ] 장바구니 추가/제거 시 재고가 정확히 관리됨
- [ ] 재고 부족 시 적절한 알림이 표시됨
- [ ] 입고 시 모든 관련 상태가 올바르게 업데이트됨
- [ ] 빌드 에러 없이 실행됨

---

**💪 화이팅! extraReducers로 복잡한 상태 관리를 마스터해보세요!**