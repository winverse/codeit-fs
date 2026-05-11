import { createFileRoute, Link } from '@tanstack/react-router'

const products = [
  { id: 1, name: '노트북', category: 'electronics', price: 1200 },
  { id: 2, name: '스마트폰', category: 'electronics', price: 800 },
  { id: 3, name: '헤드폰', category: 'electronics', price: 200 },
  { id: 4, name: '책상', category: 'furniture', price: 300 },
  { id: 5, name: '의자', category: 'furniture', price: 150 },
]

export const Route = createFileRoute('/products')({
  component: () => (
    <div>
      <h1 className="page-title">Products</h1>
      <div className="page-content">
        <p>다양한 제품들을 둘러보세요. 각 제품을 클릭하면 상세 페이지로 이동합니다.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {products.map(product => (
            <div 
              key={product.id}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: '#fff'
              }}
            >
              <h3 style={{ margin: '0 0 1rem 0', color: '#212529' }}>
                {product.name}
              </h3>
              <p style={{ margin: '0.5rem 0', color: '#6c757d' }}>
                카테고리: {product.category}
              </p>
              <p style={{ margin: '0.5rem 0', fontWeight: 'bold', color: '#007bff' }}>
                ${product.price}
              </p>
              
              <Link 
                to="/products/$productId" 
                params={{ productId: product.id.toString() }}
                className="btn"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                상세 보기
              </Link>
            </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: '#e7f3ff', 
          padding: '1.5rem', 
          borderRadius: '8px',
          marginTop: '2rem'
        }}>
          <h3>Link 파라미터 예제</h3>
          <p>
            위의 "상세 보기" 버튼들은 <code>Link</code> 컴포넌트의 <code>params</code> prop을 
            사용하여 동적 라우트로 이동합니다.
          </p>
          <code>
            &lt;Link to="/products/$productId" params=&#123;&#123; productId: "1" &#125;&#125;&gt;
          </code>
        </div>
      </div>
    </div>
  )
})