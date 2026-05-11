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
  // TODO: useParams 훅을 사용하여 productId 파라미터를 추출하세요
  const { productId } = null // useParams({ from: '/products/$productId' })
  
  // TODO: products 배열에서 productId와 일치하는 제품을 찾으세요
  const product = null // products.find(p => p.id === parseInt(productId))

  // TODO: 제품을 찾지 못했을 때의 에러 처리를 구현하세요
  if (!product) {
    return (
      <div>
        <h1 className="page-title">제품을 찾을 수 없습니다</h1>
        <div className="page-content">
          <p>TODO: productId를 사용하여 에러 메시지 표시</p>
          <Link to="/products" className="btn">
            제품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/products" className="btn btn-secondary">
          ← 제품 목록으로
        </Link>
      </div>
      
      <h1 className="page-title">{product.name}</h1>
      <div className="page-content">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div>
            <div style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#6c757d', fontSize: '1.2rem' }}>
                제품 이미지 영역
              </span>
            </div>
          </div>
          
          <div>
            <h2 style={{ color: '#212529', marginBottom: '1rem' }}>제품 정보</h2>
            <div style={{ lineHeight: '1.8' }}>
              <p><strong>카테고리:</strong> {product.category}</p>
              <p><strong>가격:</strong> <span style={{ color: '#007bff', fontSize: '1.5rem' }}>${product.price}</span></p>
              <p><strong>설명:</strong> {product.description}</p>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <button className="btn" style={{ marginRight: '1rem' }}>
                장바구니에 추가
              </button>
              <button className="btn btn-secondary">
                위시리스트에 추가
              </button>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '2rem',
          border: '1px solid #ffeaa7'
        }}>
          <h3>🎯 학습 목표: 동적 라우트 파라미터</h3>
          <p>
            이 페이지에서 <code>useParams</code> 훅을 사용하여 URL의 동적 파라미터를 
            추출하는 방법을 연습해보세요.
          </p>
          <p><strong>TODO:</strong> productId 파라미터 추출하기</p>
          <p><strong>TODO:</strong> 파라미터를 사용하여 제품 데이터 찾기</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>다른 제품들</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* TODO: 다른 제품들로 이동하는 링크를 구현하세요 */}
            {/* HINT: Link 컴포넌트의 params prop을 사용하세요 */}
            <p>TODO: 다른 제품 링크들 구현하기</p>
          </div>
        </div>
      </div>
    </div>
  )
}