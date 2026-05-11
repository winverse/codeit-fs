import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DashboardSkeleton } from "../components/LoadingComponents";

// TODO: Mock API - 실제 프로젝트에서는 실제 API를 사용하세요
const mockDashboardData = {
  stats: {
    totalUsers: 1247,
    activeUsers: 892,
    totalPosts: 3456,
    totalViews: 123456,
  },
  recentActivity: [
    {
      id: 1,
      user: "김철수",
      action: "React 18 새 기능 포스트 작성",
      time: "2분 전",
      type: "post",
    },
    {
      id: 2,
      user: "이영희",
      action: "프로필 업데이트",
      time: "5분 전",
      type: "profile",
    },
    {
      id: 3,
      user: "박민수",
      action: "CSS Layout 포스트에 댓글 작성",
      time: "12분 전",
      type: "comment",
    },
    {
      id: 4,
      user: "최지연",
      action: "새 계정 가입",
      time: "1시간 전",
      type: "signup",
    },
    {
      id: 5,
      user: "정현우",
      action: "TypeScript 포스트 좋아요",
      time: "2시간 전",
      type: "like",
    },
  ],
  popularPosts: [
    { id: 1, title: "React 18의 새로운 기능들", views: 2341, author: "김철수" },
    {
      id: 2,
      title: "Next.js 14 App Router 완전 정복",
      views: 1987,
      author: "김철수",
    },
    { id: 3, title: "TypeScript 고급 패턴", views: 1654, author: "최지연" },
    { id: 4, title: "Modern CSS Layout 기법", views: 1432, author: "박민수" },
  ],
  chartData: {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    users: [120, 150, 180, 220, 280, 320],
    posts: [45, 52, 48, 61, 55, 62],
  },
};

const fetchDashboardData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // 10% 확률로 에러 발생 시뮬레이션
        if (Math.random() < 0.1) {
          reject(new Error("서버 연결에 실패했습니다"));
        } else {
          resolve(mockDashboardData);
        }
      },
      Math.random() * 2000 + 1000
    ); // 1-3초 랜덤 로딩
  });
};

function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // 페이지 로드시 자동으로 데이터 로드
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // TODO: 컴포넌트 마운트시 자동으로 데이터를 로드하세요
  useEffect(() => {
    loadDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "post":
        return "📝";
      case "profile":
        return "👤";
      case "comment":
        return "💬";
      case "signup":
        return "🆕";
      case "like":
        return "❤️";
      default:
        return "📋";
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#dc2626",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.5rem" }}>
            데이터 로드 실패
          </h3>
          <p style={{ margin: "0 0 1.5rem 0" }}>{error}</p>
          <button
            onClick={() => loadDashboardData()}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
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
            📊 대시보드
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            실시간 사이트 통계와 활동 현황을 확인하세요
          </p>
        </div>

        <button
          onClick={() => loadDashboardData(true)}
          disabled={refreshing}
          style={{
            backgroundColor: refreshing ? "#9ca3af" : "#10b981",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: refreshing ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {refreshing ? "새로고침 중..." : "🔄 새로고침"}
          {refreshing && (
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
      </div>

      {/* 통계 카드들 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2.5rem" }}>👥</div>
            <div>
              <h3
                style={{
                  margin: "0",
                  color: "#6b7280",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                전체 사용자
              </h3>
              <p
                style={{
                  margin: "0.25rem 0 0 0",
                  color: "#1f2937",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(data.stats.totalUsers)}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2.5rem" }}>🟢</div>
            <div>
              <h3
                style={{
                  margin: "0",
                  color: "#6b7280",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                활성 사용자
              </h3>
              <p
                style={{
                  margin: "0.25rem 0 0 0",
                  color: "#1f2937",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(data.stats.activeUsers)}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2.5rem" }}>📝</div>
            <div>
              <h3
                style={{
                  margin: "0",
                  color: "#6b7280",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                총 게시글
              </h3>
              <p
                style={{
                  margin: "0.25rem 0 0 0",
                  color: "#1f2937",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(data.stats.totalPosts)}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "2.5rem" }}>👁️</div>
            <div>
              <h3
                style={{
                  margin: "0",
                  color: "#6b7280",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                총 조회수
              </h3>
              <p
                style={{
                  margin: "0.25rem 0 0 0",
                  color: "#1f2937",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {formatNumber(data.stats.totalViews)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* 최근 활동 */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.5rem 0",
              color: "#1f2937",
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            🔔 최근 활동
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  transition: "background-color 0.2s",
                }}
              >
                <div style={{ fontSize: "1.5rem" }}>
                  {getActivityIcon(activity.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: "0",
                      color: "#1f2937",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    <strong>{activity.user}</strong>님이 {activity.action}
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      color: "#6b7280",
                      fontSize: "0.8rem",
                    }}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 인기 게시글 */}
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.5rem 0",
              color: "#1f2937",
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            🔥 인기 게시글
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {data.popularPosts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#007acc",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      margin: "0 0 0.25rem 0",
                      color: "#1f2937",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.7rem",
                      color: "#6b7280",
                    }}
                  >
                    <span>👤 {post.author}</span>
                    <span>👁️ {formatNumber(post.views)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            div[style*="gridTemplateColumns: '2fr 1fr'"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});
