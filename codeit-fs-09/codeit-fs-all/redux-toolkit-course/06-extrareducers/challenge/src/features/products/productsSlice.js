import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  { id: 1, name: '노트북', price: 1500000, category: 'electronics' },
  { id: 2, name: '마우스', price: 50000, category: 'electronics' },
  { id: 3, name: '키보드', price: 100000, category: 'electronics' },
  { id: 4, name: '모니터', price: 300000, category: 'electronics' },
];

const initialState = {
  items: initialProducts,
  selectedCategory: 'all',
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategory, setLoading } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;