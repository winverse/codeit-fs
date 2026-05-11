import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '@/features/products/productsSlice';
import { cartReducer } from '@/features/cart/cartSlice';
import { inventoryReducer } from '@/features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    inventory: inventoryReducer,
  },
});