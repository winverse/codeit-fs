# 챌린지: Redux Toolkit 기본 설정

## 🎯 학습 목표
- Redux Toolkit의 `createSlice`와 `configureStore` 기본 사용법 익히기
- React와 Redux 연동하기 (Provider, useSelector, useDispatch)
- 전통적인 Redux 대비 Redux Toolkit의 장점 체감하기

## 📋 해야 할 일

### 1단계: Redux Toolkit 스토어 설정
- [ ] `src/store/counterSlice.js`에서 TODO 주석을 따라 createSlice 완성하기
- [ ] `src/store/index.js`에서 TODO 주석을 따라 configureStore 설정하기

### 2단계: React와 Redux 연결
- [ ] `src/main.jsx`에서 TODO 주석을 따라 Provider 설정하기
- [ ] `src/components/Counter/Counter.jsx`에서 TODO 주석을 따라 Redux 훅 사용하기

## ✅ 확인하기
- [ ] 카운터의 +1, -1, Reset 버튼이 모두 정상 동작하는가?
- [ ] Redux DevTools에서 액션이 디스패치되는 것이 보이는가?
- [ ] 페이지를 새로고침해도 상태가 유지되지 않는가? (정상 동작)

## 💡 힌트
- `createSlice`의 `reducers` 내부에서는 Immer 덕분에 `state.value += 1` 같은 직접 변경이 가능합니다
- `useSelector`의 콜백 함수에서 `state.counter.value`로 접근해야 합니다
- `dispatch(actionCreator())`로 액션을 디스패치합니다

## 🔗 참고 자료
- [Redux Toolkit 공식 문서 - createSlice](https://redux-toolkit.js.org/api/createSlice)
- [Redux Toolkit 공식 문서 - configureStore](https://redux-toolkit.js.org/api/configureStore)
- [React Redux 공식 문서 - useSelector](https://react-redux.js.org/api/use-selector)