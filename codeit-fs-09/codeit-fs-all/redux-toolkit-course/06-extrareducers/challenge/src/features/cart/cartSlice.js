import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { productId, quantity, name, price }
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      
      // TODO: total과 itemCount를 업데이트하세요
      // 힌트: state.total과 state.itemCount를 계산해보세요
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      
      // TODO: total과 itemCount를 업데이트하세요
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
        // TODO: total과 itemCount를 업데이트하세요
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
  // TODO: extraReducers를 추가하세요
  // 힌트: inventory slice의 액션에 반응해야 합니다
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;