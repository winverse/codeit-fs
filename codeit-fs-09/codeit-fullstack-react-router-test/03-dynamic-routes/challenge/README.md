# 챌린지: Dynamic Routes 연습

## 학습 목표

- 동적 세그먼트(`:paramName`)를 사용할 수 있다
- `useParams` 훅을 사용할 수 있다
- URL 파라미터로 데이터를 찾아 화면에 표시할 수 있다

## 해야 할 일

- [ ] `/products/:productId` 동적 라우트 설정하기
- [ ] `ProductDetailPage`에서 `useParams`로 `productId` 가져오기
- [ ] `productId`에 해당하는 상품 정보 화면에 표시하기

## 확인하기

- [ ] `/products/1` 접속 시 상품 1의 정보가 표시되는지 확인
- [ ] `/products/2` 접속 시 상품 2의 정보가 표시되는지 확인
- [ ] 존재하지 않는 ID 접속 시 "상품을 찾을 수 없습니다" 메시지 확인
