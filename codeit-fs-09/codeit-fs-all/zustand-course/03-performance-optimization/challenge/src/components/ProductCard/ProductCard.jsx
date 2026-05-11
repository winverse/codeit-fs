import React from 'react';

export function ProductCard({ product }) {
  return (
    <div>
      <h4>{product.name}</h4>
      <p>가격: {product.price}</p>
      {/* TODO: 상품 정보 표시 및 장바구니 추가 버튼 구현 */}
    </div>
  );
}