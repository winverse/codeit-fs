import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/posts")({
  component: PostsComponent,
  errorComponent: ({ error, retry }) => (
    <div className="error-container">
      <h2>Failed to Load Posts 📄</h2>
      <p>We encountered an issue while fetching blog posts:</p>
      <div className="error-details">
        <code>{error.message}</code>
      </div>
      <div className="error-actions">
        <button onClick={retry} className="btn btn-primary">
          🔄 Try Again
        </button>
        <a href="/" className="btn btn-secondary">
          🏠 Go Home
        </a>
      </div>
    </div>
  ),
  loader: async () => {
    return await fetchPosts();
  },
});

// Mock API with intentional failures for demonstration
async function fetchPosts() {
  // Simulate random failures (30% chance)
  if (Math.random() < 0.3) {
    throw new Error("Network timeout: Unable to fetch posts");
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      title: "Understanding TanStack Router Error Handling",
      excerpt:
        "Learn how to implement robust error handling patterns in your React applications.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      status: "published",
    },
    {
      id: 2,
      title: "Building Resilient UIs with Fallback Components",
      excerpt:
        "Discover best practices for creating fallback UIs that enhance user experience.",
      author: "Mike Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      status: "published",
    },
    {
      id: 3,
      title: "Advanced Error Recovery Patterns",
      excerpt:
        "Explore advanced techniques for recovering from errors gracefully.",
      author: "Emily Davis",
      date: "2024-01-05",
      readTime: "6 min read",
      status: "draft",
    },
  ];
}

function PostsComponent() {
  const posts = Route.useLoaderData();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleForceError = () => {
    setIsRetrying(true);
    // Force a re-fetch which might fail
    window.location.reload();
  };

  return (
    <div className="posts">
      <div className="posts-header">
        <h1>Blog Posts 📄</h1>
        <p>
          Explore our collection of articles on error handling and robust UI
          patterns.
        </p>
        <button
          onClick={handleForceError}
          className="btn btn-danger"
          disabled={isRetrying}
        >
          {isRetrying ? "🔄 Retrying..." : "⚠️ Simulate Error"}
        </button>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-status">
              <span className={`status-badge ${post.status}`}>
                {post.status}
              </span>
            </div>
            <h2>{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span className="author">✍️ {post.author}</span>
              <span className="date">📅 {post.date}</span>
              <span className="read-time">⏱️ {post.readTime}</span>
            </div>
            <div className="post-actions">
              <button className="btn btn-primary">Read More</button>
              <button className="btn btn-secondary">Share</button>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="empty-state">
          <h3>No posts found</h3>
          <p>Check back later for new content!</p>
        </div>
      )}
    </div>
  );
}
