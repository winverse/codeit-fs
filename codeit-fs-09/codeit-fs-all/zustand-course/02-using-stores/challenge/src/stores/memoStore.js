// TODO: Zustand에서 create 함수를 import하세요
// import { create } from '???';

// TODO: 메모 스토어를 생성하세요
// export const useMemoStore = create((set, get) => ({
//   // === 상태 ===
//   // memos: [], // 메모 배열
//   // selectedCategory: 'all', // 'all', 'work', 'personal', 'study'
//   // searchKeyword: '', // 검색 키워드

//   // === 액션 ===
//   // TODO: 메모 추가 함수 구현
//   // addMemo: (title, content, category) => {
//     // 1. 빈 제목/내용 검사
//     // 2. 새 메모 객체 생성 (id, title, content, category, createdAt, updatedAt)
//     // 3. 상태 업데이트
//   // },

//   // TODO: 메모 삭제 함수 구현
//   // deleteMemo: (id) => {
//     // filter를 사용해서 해당 id가 아닌 메모들만 남기기
//   // },

//   // TODO: 메모 수정 함수 구현
//   // editMemo: (id, title, content) => {
//     // map을 사용해서 해당 id의 메모만 수정하고 updatedAt 갱신
//   // },

//   // TODO: 카테고리 필터 설정 함수 구현
//   // setCategory: (category) => {
//     // selectedCategory 상태 업데이트
//   // },

//   // TODO: 검색 키워드 설정 함수 구현
//   // setSearchKeyword: (keyword) => {
//     // searchKeyword 상태 업데이트
//   // },

//   // === 계산된 값들 ===
//   // TODO: 필터링된 메모 목록 반환 함수 구현
//   // getFilteredMemos: () => {
//     // 1. 현재 상태 가져오기 (get() 사용)
//     // 2. 카테고리 필터링
//     // 3. 검색 키워드 필터링 (제목이나 내용에 포함된 경우)
//     // 4. 최신순 정렬
//   // },

//   // TODO: 메모 통계 반환 함수 구현
//   // getMemoStats: () => {
//     // 전체, 카테고리별 개수 반환
//     // { total: 0, work: 0, personal: 0, study: 0 }
//   // }
// }));

// 💡 힌트:
// 1. 메모 객체 구조: { id: Date.now(), title, content, category, createdAt, updatedAt }
// 2. filter, map 메서드로 배열 상태 업데이트
// 3. includes() 메서드로 검색 기능 구현
// 4. sort() 메서드로 최신순 정렬

/* 
완성 예시 일부:
export const useMemoStore = create((set, get) => ({
  memos: [],
  selectedCategory: 'all',
  searchKeyword: '',
  
  addMemo: (title, content, category) => {
    if (!title.trim() || !content.trim()) return;
    
    const newMemo = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    set((state) => ({
      memos: [...state.memos, newMemo]
    }));
  },
  
  // ... 나머지 구현
}));
*/
