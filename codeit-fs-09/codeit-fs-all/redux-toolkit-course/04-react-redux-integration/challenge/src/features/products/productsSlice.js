// TODO: createSlice import하기
// import { createSlice } from '@reduxjs/toolkit'

// TODO: 상품 데이터 초기 상태 정의
const initialState = {
  items: [
    { id: 1, name: '노트북', price: 1200000, category: 'electronics', inStock: true },
    { id: 2, name: '마우스', price: 30000, category: 'electronics', inStock: true },
    { id: 3, name: '키보드', price: 80000, category: 'electronics', inStock: false },
    { id: 4, name: '모니터', price: 300000, category: 'electronics', inStock: true },
    { id: 5, name: '책상', price: 150000, category: 'furniture', inStock: true },
  ],
  filter: 'all', // 'all', 'inStock', 'electronics', 'furniture'
}

// TODO: productsSlice 생성
// export const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     // setFilter: 필터 설정 reducer 구현
//     // updateStock: 재고 상태 업데이트 reducer 구현
//   },
// })

// TODO: action creators export
// export const { setFilter, updateStock } = productsSlice.actions

// TODO: selectors 구현
// export const selectAllProducts = (state) => state.products.items
// export const selectProductsFilter = (state) => state.products.filter
// export const selectFilteredProducts = (state) => {
//   // 필터에 따라 상품들을 필터링하는 로직 구현
// }

// 임시 빈 export (TODO 완료 후 제거)
export default function temp() {}