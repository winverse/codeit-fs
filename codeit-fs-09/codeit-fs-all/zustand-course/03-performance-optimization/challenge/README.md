# 🚀 성능 최적화 챌린지

## 📋 과제 개요

이 챌린지에서는 **제품 관리 대시보드**를 만들면서 Zustand v5의 성능 최적화 기법들을 직접 적용해보게 됩니다.

## 🎯 학습 목표

1. **useShallow를 활용한 선택적 구독** 구현
2. **메모이제이션된 셀렉터 함수** 작성
3. **React.memo를 통한 컴포넌트 최적화** 적용
4. **성능 프로파일링** 경험

## 🏗️ 구현할 기능

### 1. 제품 관리 스토어
- 제품 목록 관리
- 필터링 (카테고리, 재고 상태, 검색)
- 정렬 (이름, 가격, 재고량)
- 제품 수정 기능

### 2. 컴포넌트 구조
- `ProductDashboard`: 메인 대시보드
- `ProductFilter`: 필터링 및 정렬 컨트롤
- `ProductCard`: 개별 제품 카드
- `ProductStats`: 통계 정보 표시

### 3. 성능 최적화 요구사항

#### useShallow 적용
```javascript
// ❌ 최적화 전
const { products, filters, sortBy, actions } = useProductStore();

// ✅ 최적화 후
const { products, filters, sortBy } = useProductStore(useShallow(
  (state) => ({
    products: state.products,
    filters: state.filters,
    sortBy: state.sortBy,
  })
));
```

#### 메모이제이션된 셀렉터
```javascript
// selectors/productSelectors.js
export const getFilteredProducts = (state) => {
  // 필터링 로직
};

export function useFilteredProducts() {
  return useProductStore(getFilteredProducts);
}
```

#### React.memo 적용
```javascript
export const ProductCard = React.memo(function ProductCard({ product, onUpdate }) {
  // 컴포넌트 로직
});
```

## 📊 평가 기준

### 필수 구현 사항 (70점)
- [ ] 제품 스토어 구현 (20점)
- [ ] 필터링 및 정렬 기능 (20점)
- [ ] 기본 컴포넌트 구조 (20점)
- [ ] 제품 수정 기능 (10점)

### 성능 최적화 (30점)
- [ ] useShallow 적용 (10점)
- [ ] 메모이제이션된 셀렉터 (10점)  
- [ ] React.memo 적용 (10점)

### 보너스 점수 (추가 20점)
- [ ] 성능 측정 도구 구현 (5점)
- [ ] 렌더링 최적화 증명 (5점)
- [ ] 커스텀 훅 패턴 활용 (5점)
- [ ] 코드 문서화 및 주석 (5점)

## 🚀 시작하기

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 시작**
   ```bash
   npm run dev
   ```

3. **기본 데이터 확인**
   `src/stores/productStore.js`에서 초기 제품 데이터를 확인하세요.

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ProductDashboard/
│   ├── ProductFilter/
│   ├── ProductCard/
│   └── ProductStats/
├── stores/
│   └── productStore.js
├── selectors/
│   └── productSelectors.js
├── data/
│   └── mockProducts.js
└── styles/
    └── *.module.css
```

## 💡 힌트

1. **렌더링 추적**: 각 컴포넌트에 `console.log`를 추가하여 렌더링 횟수를 확인하세요.

2. **성능 비교**: 최적화 전후 렌더링 횟수를 비교해보세요.

3. **셀렉터 분리**: 계산이 복잡한 로직은 별도 셀렉터로 분리하세요.

4. **메모이제이션 활용**: React DevTools Profiler로 성능을 측정해보세요.

## 📚 참고 자료

- [Zustand useShallow 문서](https://docs.pmnd.rs/zustand/guides/prevent-rerenders-with-use-shallow)
- [React.memo 공식 문서](https://react.dev/reference/react/memo)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)

## 🏆 완료 후

완성된 코드를 `solution/` 폴더와 비교해보며 더 나은 최적화 방법을 탐구해보세요!

---

**⏰ 예상 소요 시간**: 2-3시간  
**💻 난이도**: 중급  
**🎯 핵심 개념**: useShallow, 셀렉터 패턴, React.memo
