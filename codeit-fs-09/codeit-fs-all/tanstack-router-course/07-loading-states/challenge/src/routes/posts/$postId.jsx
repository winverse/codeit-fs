import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPost } from '../../lib/api';

export const Route = createFileRoute('/posts/$postId')({
  // TODO: 1. loader 함수를 추가하여 fetchPost(params.postId)를 호출하세요.
  
  component: PostDetail,
  // TODO: 2. pendingComponent 옵션을 추가하고, PostSkeleton 컴포넌트를 지정하세요.
});

function PostDetail() {
  // TODO: 3. Route.useLoaderData() 훅을 사용하여 post 데이터를 가져오세요.
  const post = { title: 'Loading...', body: 'Please wait.' }; // Placeholder

  return (
    <div className="page-content">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <Link to="/posts" className="btn" style={{ marginTop: '2rem' }}>
        &larr; 모든 게시물 보기
      </Link>
    </div>
  );
}

// PostSkeleton 컴포넌트: 로딩 중에 보여줄 UI
function PostSkeleton() {
  return (
    <div className="page-content">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line half"></div>
    </div>
  );
}
