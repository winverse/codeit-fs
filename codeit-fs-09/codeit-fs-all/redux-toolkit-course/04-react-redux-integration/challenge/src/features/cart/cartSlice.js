// TODO: createSlice import하기
// import { createSlice, nanoid } from '@reduxjs/toolkit'

// TODO: 장바구니 초기 상태 정의
const initialState = {
  items: [], // { id, productId, name, price, quantity }
  totalQuantity: 0,
  totalPrice: 0,
}

// TODO: cartSlice 생성
// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     // addToCart: prepare 함수 사용하여 상품을 장바구니에 추가
//     // removeFromCart: 상품을 장바구니에서 제거
//     // updateQuantity: 수량 변경
//     // clearCart: 장바구니 비우기
//     // calculateTotals: 총 수량과 가격 계산 (다른 reducer에서 호출)
//   },
// })

// TODO: action creators export
// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// TODO: selectors 구현
// export const selectCartItems = (state) => state.cart.items
// export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
// export const selectCartTotalPrice = (state) => state.cart.totalPrice
// export const selectCartItemById = (state, productId) => 
//   state.cart.items.find(item => item.productId === productId)

// 임시 빈 export (TODO 완료 후 제거)
export default function temp() {}