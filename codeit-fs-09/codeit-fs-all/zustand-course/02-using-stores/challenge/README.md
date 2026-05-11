# 02. Using Stores - 챌린지 프로젝트

## 📚 학습 목표

이 챌린지는 **Chapter 02: Using Stores**에서 학습한 내용을 실제 메모 관리 앱에 적용해보는 프로젝트입니다. Zustand의 **셀렉터 패턴**, **상태 업데이트**, **계산된 값** 등을 직접 구현하며 실습할 수 있습니다.

### 구현해야 할 기능

1. **메모 CRUD 기능**

   - ✅ 메모 생성 (제목, 내용, 카테고리)
   - ✅ 메모 수정 (인라인 편집)
   - ✅ 메모 삭제 (확인 대화상자)

2. **필터링 및 검색**

   - ✅ 카테고리별 필터링 (전체, 업무, 개인, 학습, 아이디어)
   - ✅ 검색어 기반 필터링 (제목/내용 검색)
   - ✅ 실시간 검색 (디바운스 적용)

3. **상태 관리**
   - ✅ Zustand 스토어 구현
   - ✅ 셀렉터 패턴 활용
   - ✅ 계산된 값 (filteredMemos, statistics 등)

## 🎯 TODO 구현 가이드

### 1. Zustand 스토어 완성하기

`src/stores/memoStore.js` 파일의 TODO 항목들을 구현하세요:

```javascript
// TODO 1: 기본 상태 정의
// TODO 2: 메모 추가 액션 구현
// TODO 3: 메모 삭제 액션 구현
// TODO 4: 메모 수정 액션 구현
// TODO 5: 필터 설정 액션 구현
// TODO 6: 검색어 설정 액션 구현
// TODO 7: 필터링된 메모 목록 계산
// TODO 8: 통계 정보 계산
```

### 2. 컴포넌트에서 스토어 연결하기

각 컴포넌트에서 주석 처리된 Zustand 훅을 활성화하고 TODO 항목들을 구현하세요:

#### MemoForm 컴포넌트

- [ ] `useMemoStore` 훅 연결
- [ ] `addMemo` 액션 호출
- [ ] 폼 제출 후 초기화

#### MemoFilter 컴포넌트

- [ ] `useMemoStore` 훅 연결
- [ ] `setFilter` 액션 호출
- [ ] 각 카테고리별 메모 개수 표시

#### MemoSearch 컴포넌트

- [ ] `useMemoStore` 훅 연결
- [ ] `setSearchTerm` 액션 호출 (디바운스)
- [ ] 검색 결과 개수 표시

#### MemoList 컴포넌트

- [ ] `filteredMemos` 셀렉터 연결
- [ ] `deleteMemo`, `updateMemo` 액션 연결
- [ ] 빈 상태 처리

#### MemoCard 컴포넌트

- [ ] 편집 모드 구현
- [ ] 삭제 확인 처리

### 3. 셀렉터 패턴 활용하기

다양한 셀렉터를 구현하여 성능 최적화를 경험해보세요:

```javascript
// 기본 셀렉터
const memos = useMemoStore(state => state.memos);

// 계산된 값 셀렉터
const filteredMemos = useMemoStore(state => state.filteredMemos);

// 복합 셀렉터
const { filter, setFilter } = useMemoStore(state => ({
  filter: state.filter,
  setFilter: state.setFilter,
}));
```

## 🏗️ 프로젝트 구조

```
src/
├── components/
│   ├── MemoForm/          # 메모 작성 폼
│   ├── MemoFilter/        # 카테고리 필터
│   ├── MemoSearch/        # 검색 기능
│   ├── MemoList/          # 메모 목록
│   └── MemoCard/          # 개별 메모 카드
├── stores/
│   └── memoStore.js       # Zustand 스토어
└── styles/
    └── App.css           # 전역 스타일
```

## 🎨 UI/UX 특징

- **반응형 그리드 레이아웃**: 사이드바와 메인 콘텐츠 영역
- **카드 기반 디자인**: 메모를 시각적으로 구분
- **인라인 편집**: 메모 카드에서 직접 편집 가능
- **실시간 필터링**: 카테고리와 검색어 조합 필터
- **애니메이션 효과**: 호버, 클릭 등 인터랙티브 요소

## 📝 구현 힌트

### 1. 메모 데이터 구조

```javascript
{
  id: number,           // 고유 ID
  title: string,        // 메모 제목
  content: string,      // 메모 내용
  category: string,     // 카테고리 (work, personal, study, ideas)
  createdAt: string,    // 생성 일시 (ISO string)
  updatedAt: string,    // 수정 일시 (ISO string)
}
```

### 2. 필터링 로직

```javascript
// 카테고리와 검색어를 조합한 필터링
filteredMemos: state => {
  return state.memos.filter(memo => {
    const matchesCategory =
      state.filter === 'all' || memo.category === state.filter;
    const matchesSearch =
      memo.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      memo.content.toLowerCase().includes(state.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};
```

### 3. 디바운스 구현

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setSearchTerm(inputValue);
  }, 300);
  return () => clearTimeout(timer);
}, [inputValue, setSearchTerm]);
```

## 🚀 시작하기

1. **개발 서버 실행**

   ```bash
   npm run dev
   ```

2. **TODO 항목 확인**

   - 각 파일의 `TODO:` 주석을 찾아 구현하세요
   - 콘솔에서 TODO 로그 메시지를 확인할 수 있습니다

3. **단계별 구현**
   - 먼저 `memoStore.js`의 기본 상태와 액션들을 구현
   - 각 컴포넌트에서 스토어를 연결하고 기능 테스트
   - 셀렉터 최적화 및 성능 개선

## ✅ 완성도 체크리스트

- [ ] 메모 생성 (제목, 내용, 카테고리 선택)
- [ ] 메모 목록 표시 (카드 레이아웃)
- [ ] 카테고리별 필터링 (all, work, personal, study, ideas)
- [ ] 검색 기능 (제목/내용 기반, 디바운스)
- [ ] 메모 편집 (인라인 수정)
- [ ] 메모 삭제 (확인 대화상자)
- [ ] 각 카테고리별 메모 개수 표시
- [ ] 검색 결과 개수 표시
- [ ] 빈 상태 UI 처리
- [ ] 반응형 디자인

## 🎓 학습 포인트

1. **Zustand 기본 사용법**

   - `create` 함수를 사용한 스토어 생성
   - `set`, `get` 함수 활용

2. **셀렉터 패턴**

   - 필요한 상태만 구독하여 리렌더링 최적화
   - 계산된 값을 셀렉터로 관리

3. **상태 업데이트 패턴**

   - 불변성을 유지하는 상태 업데이트
   - 복합 액션과 상태 의존성 관리

4. **실전 상태 관리**
   - 실시간 검색과 필터링
   - CRUD 작업과 UI 상태 동기화

행운을 빌어요! 🎉
