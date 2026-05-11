import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '@/features/cart/cartSlice';

const initialInventory = {
  1: 10, // 노트북 10개
  2: 25, // 마우스 25개
  3: 15, // 키보드 15개
  4: 8,  // 모니터 8개
};

const initialState = {
  stock: initialInventory,
  lowStockThreshold: 5,
  alerts: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      state.stock[productId] = quantity;
      
      // 재고 부족 알림 생성
      if (quantity <= state.lowStockThreshold && quantity > 0) {
        const alert = {
          id: Date.now(),
          productId,
          message: `상품 ID ${productId}의 재고가 ${quantity}개 남았습니다.`,
          timestamp: new Date().toISOString(),
        };
        state.alerts.push(alert);
      }
    },
    restockProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      state.stock[productId] = (state.stock[productId] || 0) + quantity;
    },
    clearAlert: (state, action) => {
      const alertId = action.payload;
      state.alerts = state.alerts.filter(alert => alert.id !== alertId);
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
    },
  },
  extraReducers: (builder) => {
    // TODO: cart slice의 addToCart 액션에 반응하도록 extraReducer를 추가하세요
    // 힌트: 상품이 장바구니에 추가될 때 재고를 감소시켜야 합니다
    builder.addCase(addToCart, (state, action) => {
      // TODO: 여기에 로직을 구현하세요
      // 힌트: action.payload에서 product 정보를 가져올 수 있습니다
      // state.stock[productId] -= 1; 같은 방식으로 재고를 감소시키세요
    });
  },
});

export const { updateStock, restockProduct, clearAlert, clearAllAlerts } = inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;