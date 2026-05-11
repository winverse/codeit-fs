import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserSkeleton } from "../components/LoadingComponents";

// TODO: Mock API - 실제 프로젝트에서는 실제 API를 사용하세요
const mockUsers = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    role: "Developer",
    avatar: "👨‍💻",
    status: "online",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    role: "Designer",
    avatar: "👩‍🎨",
    status: "offline",
  },
  {
    id: 3,
    name: "박민수",
    email: "park@example.com",
    role: "Manager",
    avatar: "👨‍💼",
    status: "online",
  },
  {
    id: 4,
    name: "최지연",
    email: "choi@example.com",
    role: "Developer",
    avatar: "👩‍💻",
    status: "away",
  },
  {
    id: 5,
    name: "정현우",
    email: "jung@example.com",
    role: "Analyst",
    avatar: "👨‍📊",
    status: "online",
  },
];

const fetchUsers = () => {
  return new Promise((resolve) => {
    // 2-4초 사이의 랜덤 로딩 시간 시뮬레이션
    setTimeout(
      () => {
        resolve(mockUsers);
      },
      Math.random() * 2000 + 2000
    );
  });
};

function UsersPage() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    // TODO: 로딩 상태 관리를 구현하세요
    // 힌트: setLoading(true) -> API 호출 -> 결과 처리 -> setLoading(false)
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("사용자 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#10b981";
      case "offline":
        return "#6b7280";
      case "away":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "온라인";
      case "offline":
        return "오프라인";
      case "away":
        return "자리비움";
      default:
        return "알 수 없음";
    }
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
          👥 사용자 관리
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
          팀 멤버들의 정보를 확인하고 관리해보세요
        </p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={loadUsers}
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
          {loading ? "로딩 중..." : "사용자 불러오기"}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {loading ? (
          // 스켈레톤 로딩 - 6개의 카드 스켈레톤 표시
          Array.from({ length: 6 }).map((_, index) => (
            <UserSkeleton key={index} />
          ))
        ) : users ? (
          users.map((user) => (
            <div
              key={user.id}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: "0",
                      color: "#1f2937",
                      fontSize: "1.25rem",
                      fontWeight: "600",
                    }}
                  >
                    {user.name}
                  </h3>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      color: "#6b7280",
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(user.status),
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#6b7280",
                    }}
                  >
                    {getStatusText(user.status)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                  {user.role}
                </span>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #d1d5db",
                    color: "#374151",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  상세보기
                </button>
              </div>
            </div>
          ))
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
            📋 사용자 데이터를 불러오려면 위의 버튼을 클릭하세요
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

export const Route = createFileRoute("/users")({
  component: UsersPage,
});
