import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPost } from '../../lib/api';

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    if (params.postId === '99') {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      throw new Error('게시물을 불러오는 데 실패했습니다. (서버 오류 시뮬레이션)');
    }
    return fetchPost(params.postId);
  },
  errorComponent: ({ error, reset }) => (
    <div className="error-container">
      <h2>앗, 문제가 발생했어요!</h2>
      <p className="error-message">{error.message}</p>
      <button onClick={reset} className="btn">
        다시 시도
      </button>
    </div>
  ),
  component: PostDetail,
  pendingComponent: PostSkeleton,
});

function PostDetail() {
  const post = Route.useLoaderData();
  return (
    <div className="page-content">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
      <Link to="/posts" className="btn mt-2">
        &larr; 모든 게시물 보기
      </Link>
    </div>
  );
}

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
