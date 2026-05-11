import { useProductStore } from '@/stores/productStore';
import { useUIStore } from '@/stores/uiStore';
import { categories } from '@/data/products';

// ✅ 상품 관련 계산된 값들
export const useFilteredProducts = () => {
  const products = useProductStore((state) => state.products);
  const selectedCategory = useUIStore((state) => state.selectedCategory);
  const searchQuery = useUIStore((state) => state.searchQuery);
  const sortBy = useUIStore((state) => state.sortBy);

  // 필터링
  let filtered = products;

  // 카테고리 필터
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory);
  }

  // 검색어 필터
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  // 정렬
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name, 'ko');
    }
  });

  return sorted;
};

// 카테고리별 상품 수 계산
export const useCategoryStats = () => {
  const products = useProductStore((state) => state.products);

  return categories.map(category => {
    const count = category.value === 'all' 
      ? products.length
      : products.filter(p => p.category === category.value).length;
      
    return {
      ...category,
      count
    };
  });
};

// 특정 카테고리의 상품들
export const useProductsByCategory = (category) => {
  const products = useProductStore((state) => state.products);
  
  if (category === 'all') {
    return products;
  }
  
  return products.filter(product => product.category === category);
};

// 가격 범위 정보
export const usePriceRange = () => {
  const products = useProductStore((state) => state.products);
  
  if (products.length === 0) {
    return { min: 0, max: 0, average: 0 };
  }

  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  return { min, max, average };
};

// 추천 상품 (가격 기반 간단한 로직)
export const useRecommendedProducts = (currentProductId, limit = 4) => {
  const products = useProductStore((state) => state.products);
  const currentProduct = products.find(p => p.id === currentProductId);
  
  if (!currentProduct) return [];

  return products
    .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, limit);
};