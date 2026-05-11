import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
// TODO: ProductsHomePage를 import 하세요
// TODO: CategoryPage를 import 하세요

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<HomePage />} />
        {/* TODO: /products 경로에 중첩 라우팅을 설정하세요 */}
        <Route path="products" element={<ProductsPage />}>
          {/* TODO: index route를 추가하세요 (ProductsHomePage) */}
          {/* TODO: category 경로를 추가하세요 (CategoryPage) */}
        </Route>
      </Route>
    </Routes>
  );
}
