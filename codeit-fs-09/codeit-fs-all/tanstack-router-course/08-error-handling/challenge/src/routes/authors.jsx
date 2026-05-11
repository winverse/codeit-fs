import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authors")({
  component: AuthorsComponent,
  errorComponent: ({ error, retry, reset }) => (
    <div className="error-container">
      <h2>Authors Not Available 👥</h2>
      <p>We're having trouble loading the authors page:</p>
      <div className="error-details">
        <code>{error.message}</code>
      </div>
      <div className="error-actions">
        <button onClick={retry} className="btn btn-primary">
          🔄 Retry
        </button>
        <button onClick={reset} className="btn btn-secondary">
          🔄 Reset
        </button>
        <a href="/" className="btn btn-outline">
          🏠 Go Home
        </a>
      </div>
      <div className="error-tip">
        💡 Try refreshing the page or check your internet connection
      </div>
    </div>
  ),
  loader: async () => {
    return await fetchAuthors();
  },
  pendingComponent: () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading authors...</p>
    </div>
  ),
});

// Mock API with different error scenarios
async function fetchAuthors() {
  const errorType = Math.random();

  // Different types of errors for demonstration
  if (errorType < 0.2) {
    throw new Error("Server timeout: Authors service is currently unavailable");
  } else if (errorType < 0.4) {
    throw new Error("Data corruption: Invalid author data received");
  }

  // Simulate longer loading time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: 1,
      name: "Sarah Johnson",
      bio: "Frontend architect with 8+ years experience in React and modern web technologies.",
      expertise: ["React", "TypeScript", "Error Handling", "UX Design"],
      articles: 24,
      followers: 1500,
      avatar: "👩‍💻",
      status: "active",
    },
    {
      id: 2,
      name: "Mike Chen",
      bio: "Full-stack developer passionate about building resilient and scalable applications.",
      expertise: ["Node.js", "React", "System Design", "DevOps"],
      articles: 18,
      followers: 1200,
      avatar: "👨‍💻",
      status: "active",
    },
    {
      id: 3,
      name: "Emily Davis",
      bio: "Technical writer and developer advocate focusing on developer experience and documentation.",
      expertise: ["Technical Writing", "Developer Tools", "API Design"],
      articles: 32,
      followers: 2100,
      avatar: "✍️",
      status: "active",
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      bio: "Senior engineer specializing in performance optimization and error monitoring.",
      expertise: ["Performance", "Monitoring", "Error Tracking", "Analytics"],
      articles: 15,
      followers: 890,
      avatar: "🔧",
      status: "inactive",
    },
  ];
}

function AuthorsComponent() {
  const authors = Route.useLoaderData();

  return (
    <div className="authors">
      <div className="authors-header">
        <h1>Our Authors 👥</h1>
        <p>Meet the talented writers behind our technical content.</p>
      </div>

      <div className="authors-grid">
        {authors.map((author) => (
          <div key={author.id} className={`author-card ${author.status}`}>
            <div className="author-avatar">
              <span className="avatar-emoji">{author.avatar}</span>
              <div className={`status-indicator ${author.status}`}></div>
            </div>

            <div className="author-info">
              <h3>{author.name}</h3>
              <p className="author-bio">{author.bio}</p>

              <div className="author-expertise">
                <h4>Expertise:</h4>
                <div className="expertise-tags">
                  {author.expertise.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="author-stats">
                <div className="stat">
                  <span className="stat-number">{author.articles}</span>
                  <span className="stat-label">Articles</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{author.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
              </div>

              <div className="author-actions">
                <button className="btn btn-primary">Follow</button>
                <button className="btn btn-secondary">View Articles</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="authors-cta">
        <h3>Want to become an author?</h3>
        <p>Join our community of technical writers and share your expertise.</p>
        <button className="btn btn-primary">Apply Now</button>
      </div>
    </div>
  );
}
