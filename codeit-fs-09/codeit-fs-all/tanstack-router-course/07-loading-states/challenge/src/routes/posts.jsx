import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PostSkeleton } from "../components/LoadingComponents";

// TODO: Mock API - 실제 프로젝트에서는 실제 API를 사용하세요
const mockPosts = [
  {
    id: 1,
    title: "React 18의 새로운 기능들",
    content:
      "React 18에서 도입된 Concurrent Features와 Suspense의 개선사항에 대해 알아보겠습니다...",
    author: "김철수",
    publishedAt: "2024-01-15",
    category: "React",
    readTime: "5분",
    likes: 42,
    comments: 12,
    tags: ["React", "JavaScript", "Frontend"],
    thumbnail: "⚛️",
  },
  {
    id: 2,
    title: "TanStack Router vs React Router",
    content:
      "TanStack Router와 React Router의 차이점과 각각의 장단점을 비교 분석해보겠습니다...",
    author: "이영희",
    publishedAt: "2024-01-14",
    category: "Routing",
    readTime: "8분",
    likes: 38,
    comments: 7,
    tags: ["TanStack", "Router", "React"],
    thumbnail: "🚀",
  },
  {
    id: 3,
    title: "Modern CSS Layout 기법",
    content:
      "Grid와 Flexbox를 활용한 현대적인 CSS 레이아웃 설계 방법론을 소개합니다...",
    author: "박민수",
    publishedAt: "2024-01-13",
    category: "CSS",
    readTime: "12분",
    likes: 56,
    comments: 23,
    tags: ["CSS", "Layout", "Design"],
    thumbnail: "🎨",
  },
  {
    id: 4,
    title: "TypeScript 고급 패턴",
    content:
      "TypeScript의 고급 타입 시스템을 활용한 실무 패턴들을 살펴보겠습니다...",
    author: "최지연",
    publishedAt: "2024-01-12",
    category: "TypeScript",
    readTime: "15분",
    likes: 73,
    comments: 31,
    tags: ["TypeScript", "Advanced", "Patterns"],
    thumbnail: "📘",
  },
  {
    id: 5,
    title: "API 상태 관리 최적화",
    content:
      "서버 상태 관리를 위한 다양한 전략과 도구들을 비교 분석해보겠습니다...",
    author: "정현우",
    publishedAt: "2024-01-11",
    category: "State Management",
    readTime: "10분",
    likes: 29,
    comments: 8,
    tags: ["API", "State", "Optimization"],
    thumbnail: "⚡",
  },
  {
    id: 6,
    title: "Next.js 14 App Router 완전 정복",
    content:
      "Next.js 14의 App Router를 활용한 풀스택 애플리케이션 개발 가이드입니다...",
    author: "김철수",
    publishedAt: "2024-01-10",
    category: "Next.js",
    readTime: "20분",
    likes: 91,
    comments: 45,
    tags: ["Next.js", "App Router", "Fullstack"],
    thumbnail: "▲",
  },
];

const fetchPosts = () => {
  return new Promise((resolve) => {
    // 1.5-3초 사이의 랜덤 로딩 시간 시뮬레이션
    setTimeout(
      () => {
        resolve(mockPosts);
      },
      Math.random() * 1500 + 1500
    );
  });
};

function PostsPage() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = [
    "전체",
    "React",
    "Routing",
    "CSS",
    "TypeScript",
    "State Management",
    "Next.js",
  ];

  const loadPosts = async () => {
    // TODO: 로딩 상태와 에러 처리를 구현하세요
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError("게시글 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          selectedCategory === "전체" || post.category === selectedCategory
      )
    : [];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            color: "#1f2937",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          📝 기술 블로그
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
          최신 개발 트렌드와 기술 정보를 공유합니다
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <button
          onClick={loadPosts}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#9ca3af" : "#007acc",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {loading ? "로딩 중..." : "게시글 불러오기"}
          {loading && (
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid #ffffff",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          )}
        </button>

        {posts && (
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  backgroundColor:
                    selectedCategory === category ? "#007acc" : "white",
                  color: selectedCategory === category ? "white" : "#374151",
                  border: "1px solid #d1d5db",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* TODO: 로딩 상태일 때 스켈레톤 UI를 보여주세요 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {loading ? (
          // 스켈레톤 로딩 - 6개의 게시글 스켈레톤 표시
          Array.from({ length: 6 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{post.thumbnail}</div>
                  <span
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#374151",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    color: "#1f2937",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    lineHeight: "1.4",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#6b7280",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.content}
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#e0f2fe",
                        color: "#0369a1",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span>👤 {post.author}</span>
                  <span>📅 {formatDate(post.publishedAt)}</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))
        ) : posts ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.1rem",
              padding: "3rem",
            }}
          >
            📋 선택한 카테고리에 해당하는 게시글이 없습니다
          </div>
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1.1rem",
              padding: "3rem",
            }}
          >
            📋 게시글 데이터를 불러오려면 위의 버튼을 클릭하세요
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export const Route = createFileRoute("/posts")({
  component: PostsPage,
});
