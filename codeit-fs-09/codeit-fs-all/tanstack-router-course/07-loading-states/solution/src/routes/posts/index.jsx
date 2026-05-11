import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPosts } from '../../lib/api';

export const Route = createFileRoute('/posts/')({
  loader: () => fetchPosts(),
  component: PostList,
});

function PostList() {
  const posts = Route.useLoaderData();

  return (
    <div className="page-content">
      <h1 className="page-title">블로그 게시물</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
