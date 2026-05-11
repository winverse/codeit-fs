import { createFileRoute, Link, useParams } from '@tanstack/react-router';

const products = [
  { id: 1, name: '노트북', category: 'electronics', price: 1200, description: '고성능 노트북으로 업무와 게임 모두에 적합합니다.' },
  { id: 2, name: '스마트폰', category: 'electronics', price: 800, description: '최신 기술이 집약된 프리미엄 스마트폰입니다.' },
  { id: 3, name: '헤드폰', category: 'electronics', price: 200, description: '뛰어난 음질과 편안한 착용감을 제공합니다.' },
  { id: 4, name: '책상', category: 'furniture', price: 300, description: '견고하고 넓은 작업 공간을 제공하는 책상입니다.' },
  { id: 5, name: '의자', category: 'furniture', price: 150, description: '인체공학적 디자인으로 장시간 사용에도 편안합니다.' },
];

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
});

function ProductDetail() {
  // TODO: useParams 훅을 사용하여 URL에서 'productId' 파라미터를 추출하세요.
  // HINT: const { productId } = useParams({ from: '/products/$productId' });
  const { productId } = { productId: '1' }; // Placeholder

  // TODO: 추출한 productId를 사용하여 `products` 배열에서 일치하는 상품을 찾으세요.
  // HINT: productId는 문자열이므로, 숫자로 변환(parseInt)하여 비교해야 합니다.
  const product = products.find((p) => p.id === parseInt(productId));

  // TODO: 만약 `product`가 없다면, 제품을 찾을 수 없다는 메시지를 보여주는 JSX를 반환하세요.
  // HINT: 아래의 `if (!product)` 블록을 완성하세요.
  if (!product) {
    return (
      <div className="page-content">
        <h1>제품을 찾을 수 없습니다</h1>
        {/* TODO: 여기 P 태그에 올바른 productId를 사용하여 에러 메시지를 표시하세요. */}
        <p>ID가 '...'인 제품이 존재하지 않습니다.</p>
        <Link to="/products" className="btn">
          &larr; 제품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1 className="product-name">{product.name}</h1>
      <p className="product-category">카테고리: {product.category}</p>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
      <Link to="/products" className="btn mt-2">
        &larr; 제품 목록으로 돌아가기
      </Link>
    </div>
  );
}
