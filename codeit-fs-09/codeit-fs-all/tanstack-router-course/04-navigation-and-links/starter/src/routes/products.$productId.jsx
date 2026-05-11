import { createFileRoute, Link, useParams } from '@tanstack/react-router'

const products = [
  { id: 1, name: '노트북', category: 'electronics', price: 1200, description: '고성능 노트북으로 업무와 게임 모두에 적합합니다.' },
  { id: 2, name: '스마트폰', category: 'electronics', price: 800, description: '최신 기술이 집약된 프리미엄 스마트폰입니다.' },
  { id: 3, name: '헤드폰', category: 'electronics', price: 200, description: '뛰어난 음질과 편안한 착용감을 제공합니다.' },
  { id: 4, name: '책상', category: 'furniture', price: 300, description: '견고하고 넓은 작업 공간을 제공하는 책상입니다.' },
  { id: 5, name: '의자', category: 'furniture', price: 150, description: '인체공학적 디자인으로 장시간 사용에도 편안합니다.' },
]

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail
})

function ProductDetail() {
  const { productId } = useParams({ from: '/products/$productId' })
  const product = products.find(p => p.id === parseInt(productId))

  if (!product) {
    return (
      <div>
        <h1 className="page-title">제품을 찾을 수 없습니다</h1>
        <div className="page-content">
          <p>요청하신 제품(ID: {productId})을 찾을 수 없습니다.</p>
          <Link to="/products" className="btn">
            제품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-1">
        <Link to="/products" className="btn btn-secondary">
          ← 제품 목록으로
        </Link>
      </div>
      
      <h1 className="page-title">{product.name}</h1>
      <div className="page-content">
        <div className="d-flex gap-2 mt-2">
          <div>
            <div className="product-image-placeholder">
              <span className="text-muted">
                제품 이미지 영역
              </span>
            </div>
          </div>
          
          <div>
            <h2 className="page-title">제품 정보</h2>
            <div className="page-content">
              <p><strong>카테고리:</strong> {product.category}</p>
              <p><strong>가격:</strong> <span className="price">${product.price}</span></p>
              <p><strong>설명:</strong> {product.description}</p>
            </div>
            
            <div className="mt-2">
              <button className="btn mr-1">
                장바구니에 추가
              </button>
              <button className="btn btn-secondary">
                위시리스트에 추가
              </button>
            </div>
          </div>
        </div>

        <div className="alert alert-warning mt-2">
          <h3>동적 라우트 예제</h3>
          <p>
            현재 페이지는 <code>/products/$productId</code> 경로로 접근되었습니다.
            <code>useParams</code> 훅을 사용하여 URL의 <code>productId</code> 파라미터를 
            추출했습니다.
          </p>
          <p><strong>현재 Product ID:</strong> {productId}</p>
        </div>

        <div className="mt-2">
          <h3>다른 제품들</h3>
          <div className="d-flex gap-1 flex-wrap">
            {products
              .filter(p => p.id !== product.id)
              .map(otherProduct => (
                <Link
                  key={otherProduct.id}
                  to="/products/$productId"
                  params={{ productId: otherProduct.id.toString() }}
                  className="btn btn-secondary"
                >
                  {otherProduct.name}
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
