# 4. 스토어 구조 설계하기

이 챕터에서는 복잡한 상태를 체계적으로 관리하는 방법을 학습합니다. 실제 상용 서비스에서 사용되는 장바구니 기능을 구현하면서 확장 가능한 스토어 구조 설계 원칙을 배워보겠습니다.

## 🎯 학습 목표

이 챕터를 완료하면 다음과 같은 능력을 갖게 됩니다:

1. **계층적 상태 구조 설계**: 복잡한 비즈니스 로직을 체계적으로 관리하는 방법
2. **불변성 관리 패턴**: 배열과 객체 상태를 안전하게 업데이트하는 기법
3. **액션 함수 분리**: 상태 로직을 재사용 가능하고 테스트하기 쉽게 구조화
4. **계산된 상태(Computed State)**: 파생 상태를 효율적으로 관리하는 방법
5. **실무 패턴 적용**: 실제 쇼핑몰에서 사용되는 장바구니 로직 구현

## 🧩 주요 개념

### 1. 상태 구조 설계 원칙

복잡한 애플리케이션에서는 상태를 계층적으로 구조화하여 관리해야 합니다.

```javascript
// ❌ 평면적인 구조 (권장하지 않음)
const useStore = create((set) => ({
  productId: '',
  productName: '',
  productPrice: 0,
  cartItemId: '',
  cartQuantity: 0,
  userEmail: '',
  // ... 수십 개의 필드
}));

// ✅ 계층적 구조 (권장)
const useShopStore = create((set) => ({
  products: [],
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  user: {
    id: '',
    email: '',
    preferences: {},
  },
  ui: {
    loading: false,
    error: null,
  },
}));
```

### 2. 불변성 관리 패턴

JavaScript의 스프레드 연산자와 배열 메서드를 활용하여 안전한 상태 업데이트를 구현합니다.

#### 배열 상태 업데이트
```javascript
// 아이템 추가
set((state) => ({
  cart: {
    ...state.cart,
    items: [...state.cart.items, newItem]
  }
}));

// 아이템 제거
set((state) => ({
  cart: {
    ...state.cart,
    items: state.cart.items.filter(item => item.id !== itemId)
  }
}));

// 아이템 수정
set((state) => ({
  cart: {
    ...state.cart,
    items: state.cart.items.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity }
        : item
    )
  }
}));
```

#### 중첩 객체 상태 업데이트
```javascript
// 사용자 프로필 업데이트
set((state) => ({
  user: {
    ...state.user,
    preferences: {
      ...state.user.preferences,
      theme: 'dark'
    }
  }
}));
```

### 3. 액션 함수 분리 패턴

복잡한 비즈니스 로직은 별도의 액션 함수로 분리하여 관리합니다.

```javascript
const useShopStore = create((set, get) => ({
  // 상태
  cart: { items: [], total: 0 },
  
  // 액션 함수들
  addToCart: (product, quantity = 1) => {
    const state = get();
    const existingItem = state.cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      // 기존 아이템 수량 증가
      get().updateCartItemQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // 새 아이템 추가
      set((state) => ({
        cart: {
          ...state.cart,
          items: [...state.cart.items, { ...product, quantity }]
        }
      }));
    }
    
    // 총 가격 재계산
    get().calculateCartTotal();
  },
  
  updateCartItemQuantity: (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
    }));
    
    get().calculateCartTotal();
  },
  
  calculateCartTotal: () => {
    const state = get();
    const total = state.cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
    
    set((state) => ({
      cart: { ...state.cart, total }
    }));
  }
}));
```

### 4. 계산된 상태 (Computed State)

파생되는 상태는 별도의 셀렉터 함수로 관리하여 성능을 최적화합니다.

```javascript
// 셀렉터 함수 (컴포넌트 외부에서 정의)
export const getCartSummary = (state) => ({
  itemCount: state.cart.items.reduce((count, item) => count + item.quantity, 0),
  total: state.cart.total,
  isEmpty: state.cart.items.length === 0,
  hasDiscount: state.cart.total > 50000, // 5만원 이상 할인 적용
});

// 컴포넌트에서 사용
function CartSummary() {
  const summary = useShopStore(getCartSummary);
  
  return (
    <div>
      <p>총 {summary.itemCount}개 상품</p>
      <p>합계: {summary.total.toLocaleString()}원</p>
      {summary.hasDiscount && <p>🎉 무료배송 적용!</p>}
    </div>
  );
}
```

### 💡 심화 학습: Immer와 함께 사용하기

복잡한 중첩 상태의 경우, Immer 라이브러리와 함께 사용하면 더욱 직관적인 코드를 작성할 수 있습니다.

```javascript
import { immer } from 'zustand/middleware/immer';

const useShopStore = create(
  immer((set) => ({
    cart: { items: [] },
    
    addToCart: (product) => set((state) => {
      // Immer를 사용하면 직접 수정하는 것처럼 작성 가능
      const existingItem = state.cart.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({ ...product, quantity: 1 });
      }
    }),
  }))
);
```

## 🎬 강의 시연 스크립트

### 1단계: 기본 쇼핑몰 스토어 생성

**설명**: "먼저 상품과 장바구니를 관리하는 기본 스토어를 만들어보겠습니다."

`src/stores/shopStore.js` 파일을 생성합니다:

```javascript
import { create } from 'zustand';

export const useShopStore = create((set, get) => ({
  // 상품 목록 상태
  products: [
    { id: 1, name: '노트북', price: 1200000, category: 'electronics', image: '/images/laptop.jpg' },
    { id: 2, name: '마우스', price: 50000, category: 'electronics', image: '/images/mouse.jpg' },
    { id: 3, name: '키보드', price: 150000, category: 'electronics', image: '/images/keyboard.jpg' },
    { id: 4, name: '모니터', price: 300000, category: 'electronics', image: '/images/monitor.jpg' },
    { id: 5, name: '책', price: 25000, category: 'books', image: '/images/book.jpg' },
    { id: 6, name: '커피', price: 15000, category: 'food', image: '/images/coffee.jpg' },
  ],
  
  // 장바구니 상태 - 계층적으로 구조화
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  
  // UI 상태
  ui: {
    selectedCategory: 'all',
    loading: false,
    error: null,
  },
}));
```

**설명**: "상태를 products, cart, ui로 계층적으로 나누어 관리하면 코드의 가독성과 유지보수성이 향상됩니다."

### 2단계: 장바구니 액션 함수 구현

**설명**: "이제 장바구니에 상품을 추가하고 관리하는 액션 함수들을 구현해보겠습니다."

스토어에 액션 함수들을 추가합니다:

```javascript
export const useShopStore = create((set, get) => ({
  // ... 기존 상태

  // 장바구니에 상품 추가
  addToCart: (product, quantity = 1) => {
    const state = get();
    const existingItem = state.cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      // 기존 상품의 수량 증가
      get().updateCartItemQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // 새로운 상품 추가
      set((state) => ({
        cart: {
          ...state.cart,
          items: [...state.cart.items, { ...product, quantity }]
        }
      }));
      
      // 총계 재계산
      get().calculateCartSummary();
    }
  },

  // 장바구니 아이템 수량 변경
  updateCartItemQuantity: (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(itemId);
      return;
    }
    
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
    }));
    
    get().calculateCartSummary();
  },

  // 장바구니에서 상품 제거
  removeFromCart: (itemId) => {
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter(item => item.id !== itemId)
      }
    }));
    
    get().calculateCartSummary();
  },

  // 장바구니 비우기
  clearCart: () => {
    set((state) => ({
      cart: {
        ...state.cart,
        items: [],
        total: 0,
        itemCount: 0,
      }
    }));
  },
}));
```

**설명**: "get() 함수를 사용하여 현재 상태에 접근하고, 다른 액션 함수를 호출할 수 있습니다. 이렇게 하면 코드 중복을 피하고 재사용성을 높일 수 있습니다."

### 3단계: 계산된 상태 관리

**설명**: "장바구니 총계와 아이템 수를 계산하는 로직을 구현해보겠습니다."

계산 함수를 스토어에 추가합니다:

```javascript
// 장바구니 총계 계산
calculateCartSummary: () => {
  const state = get();
  const total = state.cart.items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );
  const itemCount = state.cart.items.reduce(
    (count, item) => count + item.quantity, 0
  );
  
  set((state) => ({
    cart: {
      ...state.cart,
      total,
      itemCount,
    }
  }));
},
```

### 4단계: 카테고리 필터링 기능

**설명**: "상품을 카테고리별로 필터링하는 기능을 추가해보겠습니다."

필터링 액션을 추가합니다:

```javascript
// 카테고리 선택
setSelectedCategory: (category) => {
  set((state) => ({
    ui: {
      ...state.ui,
      selectedCategory: category,
    }
  }));
},
```

### 5단계: 셀렉터 함수 생성

**설명**: "계산이 필요한 상태들을 효율적으로 관리하기 위해 셀렉터 함수를 만들어보겠습니다."

`src/selectors/shopSelectors.js` 파일을 생성합니다:

```javascript
// 필터링된 상품 목록
export const getFilteredProducts = (state) => {
  if (state.ui.selectedCategory === 'all') {
    return state.products;
  }
  return state.products.filter(product => 
    product.category === state.ui.selectedCategory
  );
};

// 장바구니 요약 정보
export const getCartSummary = (state) => ({
  itemCount: state.cart.itemCount,
  total: state.cart.total,
  isEmpty: state.cart.items.length === 0,
  hasItems: state.cart.items.length > 0,
  freeShipping: state.cart.total >= 50000, // 5만원 이상 무료배송
});

// 카테고리별 상품 수
export const getCategoryCounts = (state) => {
  const counts = state.products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  
  return {
    all: state.products.length,
    ...counts,
  };
};
```

### 6단계: 컴포넌트에서 스토어 사용

**설명**: "이제 컴포넌트에서 구조화된 스토어를 사용하는 방법을 살펴보겠습니다."

`src/components/ProductList/ProductList.jsx` 수정:

```javascript
import React from 'react';
import { useShopStore } from '@/stores/shopStore';
import { getFilteredProducts } from '@/selectors/shopSelectors';
import { ProductCard } from '@/components/ProductCard';
import styles from './ProductList.module.css';

export function ProductList() {
  const products = useShopStore(getFilteredProducts);
  const addToCart = useShopStore((state) => state.addToCart);

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={(quantity) => addToCart(product, quantity)}
        />
      ))}
    </div>
  );
}
```

`src/components/Cart/Cart.jsx` 수정:

```javascript
import React from 'react';
import { useShopStore } from '@/stores/shopStore';
import { getCartSummary } from '@/selectors/shopSelectors';
import { CartItem } from '@/components/CartItem';
import styles from './Cart.module.css';

export function Cart() {
  const cartItems = useShopStore((state) => state.cart.items);
  const summary = useShopStore(getCartSummary);
  const { updateCartItemQuantity, removeFromCart, clearCart } = useShopStore(
    (state) => ({
      updateCartItemQuantity: state.updateCartItemQuantity,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
    })
  );

  if (summary.isEmpty) {
    return (
      <div className={styles.emptyCart}>
        <p>장바구니가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2>장바구니 ({summary.itemCount}개 상품)</h2>
      
      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(quantity) => updateCartItemQuantity(item.id, quantity)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>
      
      <div className={styles.cartSummary}>
        <div className={styles.total}>
          총 {summary.total.toLocaleString()}원
        </div>
        {summary.freeShipping && (
          <div className={styles.freeShipping}>🚚 무료배송</div>
        )}
        <div className={styles.actions}>
          <button onClick={clearCart} className={styles.clearButton}>
            장바구니 비우기
          </button>
          <button className={styles.checkoutButton}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
```

**설명**: "구조화된 스토어를 사용하면 각 컴포넌트에서 필요한 상태와 액션만 선택적으로 사용할 수 있어, 성능과 코드 가독성이 모두 향상됩니다."

## 🏆 챌린지 과제

### 🎯 미션: 도서관 관리 시스템 만들기

이번 챌린지에서는 배운 스토어 구조 설계 원칙을 적용하여 도서관 관리 시스템을 구현해보겠습니다.

#### 구현해야 할 기능

1. **도서 목록 관리**
   - 도서 검색 및 필터링 (장르별, 저자별)
   - 도서 정보 표시 (제목, 저자, 장르, 대출 상태)

2. **대출 관리 시스템**
   - 도서 대출하기
   - 대출 목록 확인
   - 도서 반납하기
   - 연체 도서 관리

3. **사용자 정보 관리**
   - 대출 히스토리
   - 찜 목록 (위시리스트)
   - 대출 가능 권수 관리

#### 스토어 구조 설계 요구사항

```javascript
// 목표 스토어 구조
{
  books: [], // 전체 도서 목록
  
  rentals: {
    activeRentals: [], // 현재 대출 중인 도서들
    history: [], // 대출 히스토리
    overdueBooks: [], // 연체 도서들
  },
  
  user: {
    profile: { name: '', id: '', maxRentals: 5 },
    wishlist: [], // 찜 목록
    statistics: { totalRentals: 0, currentRentals: 0 }
  },
  
  ui: {
    selectedGenre: 'all',
    searchQuery: '',
    activeTab: 'browse', // 'browse', 'rentals', 'wishlist'
  }
}
```

### 📋 확인하기

완성된 구현을 다음 기준으로 점검해보세요:

#### 필수 기능 (70점)
- [ ] 계층적 상태 구조로 설계되어 있는가?
- [ ] 배열/객체 상태를 불변성을 지키며 업데이트하는가?
- [ ] 복잡한 비즈니스 로직이 액션 함수로 분리되어 있는가?
- [ ] 셀렉터 함수를 활용한 계산된 상태 관리가 구현되어 있는가?

#### 고급 기능 (30점)
- [ ] 대출 가능 권수 제한 로직이 구현되어 있는가?
- [ ] 연체 도서 자동 계산 기능이 있는가?
- [ ] 통계 정보가 자동으로 업데이트되는가?
- [ ] 에러 상태 관리가 적절히 구현되어 있는가?

---

**💡 핵심 포인트**: 복잡한 상태도 계층적으로 구조화하면 관리가 쉬워집니다. 각 영역의 책임을 명확히 분리하고, 재사용 가능한 액션 함수를 작성하는 것이 중요합니다!