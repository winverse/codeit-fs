import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPost } from '../../lib/api';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ params }) => fetchPost(params.postId),
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
