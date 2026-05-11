import { useDispatch, useSelector, useStore } from 'react-redux'

// 타입이 미리 설정된 useDispatch와 useSelector 훅
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export const useAppStore = () => useStore()