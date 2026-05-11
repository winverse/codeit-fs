// TODO: createSlice import하기
// import { createSlice, nanoid } from '@reduxjs/toolkit'

// TODO: 알림 초기 상태 정의
const initialState = {
  notifications: [], // { id, type, title, message, timestamp, read }
  unreadCount: 0,
}

// TODO: notificationsSlice 생성
// export const notificationsSlice = createSlice({
//   name: 'notifications',
//   initialState,
//   reducers: {
//     // addNotification: prepare 함수로 새 알림 추가
//     // markAsRead: 알림을 읽음으로 표시
//     // removeNotification: 알림 제거
//     // clearAllNotifications: 모든 알림 제거
//   },
//   // TODO: extraReducers로 다른 slice의 액션들을 감지
//   // 장바구니에 아이템이 추가될 때 알림 생성
//   // 상품 재고가 부족할 때 알림 생성
// })

// TODO: action creators export
// export const { addNotification, markAsRead, removeNotification, clearAllNotifications } = notificationsSlice.actions

// TODO: selectors 구현
// export const selectAllNotifications = (state) => state.notifications.notifications
// export const selectUnreadNotifications = (state) => 
//   state.notifications.notifications.filter(n => !n.read)
// export const selectUnreadCount = (state) => state.notifications.unreadCount

// 임시 빈 export (TODO 완료 후 제거)
export default function temp() {}