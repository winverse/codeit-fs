const posts = [
  { id: '1', title: '첫 번째 게시물', body: 'TanStack Router에 오신 것을 환영합니다.' },
  { id: '2', title: '데이터 로딩', body: '라우트에서 데이터를 로드하는 것은 매우 쉽습니다.' },
  { id: '3', title: '로딩 상태 관리', body: 'pendingComponent로 멋진 로딩 UI를 보여주세요.' },
];

// 1초의 지연을 시뮬레이션하는 함수
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchPosts() {
  await sleep(500);
  return posts;
}

export async function fetchPost(postId) {
  await sleep(1000);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
}
