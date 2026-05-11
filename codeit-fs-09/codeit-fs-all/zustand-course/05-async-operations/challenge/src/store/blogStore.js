import { create } from 'zustand';

// TODO: JSONPlaceholder API의 posts 엔드포인트를 활용한 블로그 관리 시스템을 구현하세요.
// API 엔드포인트: https://jsonplaceholder.typicode.com/posts
// API 문서: https://jsonplaceholder.typicode.com/guide/

const useBlogStore = create((set, get) => ({
  // ===== 상태 정의 =====
  posts: [],
  selectedPost: null,
  selectedPostId: null,
  currentView: 'list', // 'list' | 'detail' | 'create' | 'edit'
  
  // TODO: 로딩 상태 추가
  // - 전역 로딩 상태
  // - 개별 포스트 로딩 상태
  // - 포스트 생성/수정/삭제 로딩 상태
  
  // TODO: 에러 상태 추가
  // - 전역 에러 상태
  // - 개별 포스트 에러 상태
  
  // TODO: 검색 및 필터링 상태 추가
  // - 검색어
  // - 사용자 ID 필터
  // - 정렬 기준

  // ===== 뷰 네비게이션 액션 =====
  setView: (view, postId = null) => {
    set({
      currentView: view,
      selectedPostId: postId
    });
  },

  // ===== 포스트 CRUD 액션 (구현 필요) =====
  
  // TODO: fetchPosts 구현
  // - GET /posts API 호출
  // - 로딩 상태 관리
  // - 에러 처리
  // - 캐싱 전략 고려
  fetchPosts: async () => {
    // 구현해주세요
    console.log('TODO: fetchPosts 구현 필요');
  },

  // TODO: fetchPost 구현  
  // - GET /posts/:id API 호출
  // - 개별 포스트 로딩 상태
  // - 에러 처리
  // - 캐시된 데이터 우선 확인
  fetchPost: async (id) => {
    // 구현해주세요
    console.log('TODO: fetchPost 구현 필요', id);
  },

  // TODO: createPost 구현
  // - POST /posts API 호출
  // - Optimistic Update 적용
  // - 에러 시 롤백
  // - 성공 시 토스트 표시
  createPost: async (postData) => {
    // 구현해주세요
    console.log('TODO: createPost 구현 필요', postData);
  },

  // TODO: updatePost 구현
  // - PUT /posts/:id API 호출  
  // - Optimistic Update 적용
  // - 에러 시 롤백
  // - 성공 시 토스트 표시
  updatePost: async (id, postData) => {
    // 구현해주세요
    console.log('TODO: updatePost 구현 필요', id, postData);
  },

  // TODO: deletePost 구현
  // - DELETE /posts/:id API 호출
  // - Optimistic Update 적용
  // - 에러 시 롤백  
  // - 성공 시 목록으로 이동
  deletePost: async (id) => {
    // 구현해주세요
    console.log('TODO: deletePost 구현 필요', id);
  },

  // ===== 고급 기능 (선택사항) =====

  // TODO: 검색 기능 구현
  // - 제목과 본문에서 검색
  // - 디바운싱 적용
  // - 검색 결과 하이라이팅
  searchPosts: async (query) => {
    // 구현해주세요
    console.log('TODO: searchPosts 구현 필요', query);
  },

  // TODO: 사용자별 포스트 필터링
  // - 특정 사용자의 포스트만 표시
  // - 사용자 정보도 함께 로드
  filterByUser: async (userId) => {
    // 구현해주세요  
    console.log('TODO: filterByUser 구현 필요', userId);
  },

  // TODO: 무한 스크롤 또는 페이지네이션
  // - 페이지 단위로 포스트 로드
  // - 스크롤 감지 또는 페이지 버튼
  loadMore: async () => {
    // 구현해주세요
    console.log('TODO: loadMore 구현 필요');
  },

  // TODO: 오프라인 지원
  // - 로컬 스토리지 활용
  // - 네트워크 상태 감지
  // - 오프라인 시 캐시된 데이터 표시
  syncOfflineData: async () => {
    // 구현해주세요
    console.log('TODO: syncOfflineData 구현 필요');
  },

  // ===== 유틸리티 함수들 =====

  // TODO: 캐시 관리 함수들
  // - clearCache: 캐시 초기화
  // - refreshCache: 캐시 새로고침
  // - getCachedPost: 캐시된 포스트 조회

  // TODO: 에러 처리 함수들  
  // - clearErrors: 에러 상태 초기화
  // - retryFailedRequest: 실패한 요청 재시도

  // TODO: 상태 초기화
  reset: () => {
    set({
      posts: [],
      selectedPost: null,
      selectedPostId: null,
      currentView: 'list'
    });
  }
}));

export { useBlogStore };