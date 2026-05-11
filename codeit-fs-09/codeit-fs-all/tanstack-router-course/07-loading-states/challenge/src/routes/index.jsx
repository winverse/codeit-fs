import { createFileRoute, Link } from "@tanstack/react-router";

const features = [
  {
    icon: "⏳",
    title: "Loading States",
    description:
      "Experience different loading patterns including spinners, skeletons, and progressive loading.",
    links: [
      { to: "/users", label: "User List (Skeleton)" },
      { to: "/posts", label: "Posts (Spinner)" },
      { to: "/dashboard", label: "Dashboard (Progressive)" },
    ],
  },
  {
    icon: "🔄",
    title: "Error Handling",
    description:
      "See how errors are handled gracefully with retry mechanisms and fallback states.",
    links: [
      { to: "/users/999", label: "User Not Found" },
      { to: "/posts/999", label: "Post Error" },
    ],
  },
  {
    icon: "🎯",
    title: "User Experience",
    description:
      "Optimized loading experiences that keep users engaged and informed.",
    links: [
      { to: "/users", label: "Smooth Transitions" },
      { to: "/dashboard", label: "Step-by-step Loading" },
    ],
  },
];

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            padding: "4rem 2rem",
            marginBottom: "3rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚡</div>
          <h1
            style={{
              fontSize: "3rem",
              margin: "0 0 1rem 0",
              fontWeight: "bold",
            }}
          >
            Loading States Demo
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              margin: "0 0 2rem 0",
              opacity: 0.9,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore various loading patterns, error handling, and user
            experience optimizations built with TanStack Router.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/users"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "white",
                color: "#667eea",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                transition: "transform 0.2s",
              }}
            >
              👥 View Users
            </Link>
            <Link
              to="/dashboard"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                border: "2px solid white",
                transition: "transform 0.2s",
              }}
            >
              📊 Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              margin: "0 0 2rem 0",
              color: "#333",
              textAlign: "center",
            }}
          >
            🚀 Features to Explore
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  border: "2px solid #f0f0f0",
                  borderRadius: "16px",
                  padding: "2rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#007acc";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,122,204,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#f0f0f0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "1.5rem",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    margin: "0 0 2rem 0",
                    color: "#666",
                    lineHeight: 1.6,
                    textAlign: "center",
                  }}
                >
                  {feature.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {feature.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.to}
                      style={{
                        display: "block",
                        padding: "0.75rem 1rem",
                        backgroundColor: "#f8f9fa",
                        color: "#007acc",
                        textDecoration: "none",
                        borderRadius: "8px",
                        textAlign: "center",
                        border: "1px solid #e9ecef",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#007acc";
                        e.target.style.color = "white";
                        e.target.style.borderColor = "#007acc";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#f8f9fa";
                        e.target.style.color = "#007acc";
                        e.target.style.borderColor = "#e9ecef";
                      }}
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Patterns Preview */}
        <div
          style={{
            padding: "3rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              margin: "0 0 2rem 0",
              color: "#333",
              textAlign: "center",
            }}
          >
            🎨 Loading Patterns Showcase
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Spinner Preview */}
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #e9ecef",
              }}
            >
              <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>
                Loading Spinner
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #007acc",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "1rem auto",
                }}
              />
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                Classic spinner for quick loading states
              </p>
            </div>

            {/* Skeleton Preview */}
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                border: "1px solid #e9ecef",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Skeleton Loading
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#e9ecef",
                    borderRadius: "50%",
                    marginRight: "1rem",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: "16px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      height: "12px",
                      backgroundColor: "#e9ecef",
                      borderRadius: "4px",
                      width: "60%",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                Skeleton for content-aware loading
              </p>
            </div>

            {/* Progressive Preview */}
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #e9ecef",
              }}
            >
              <h3 style={{ margin: "0 0 1rem 0", color: "#333" }}>
                Progressive Loading
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {[1, 2, 3].map((step, index) => (
                  <div
                    key={step}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: index === 1 ? "#007acc" : "#e9ecef",
                        color: index === 1 ? "white" : "#666",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      {index === 0 ? "✓" : step}
                    </div>
                    {index < 2 && (
                      <div
                        style={{
                          width: "30px",
                          height: "3px",
                          backgroundColor: index === 0 ? "#007acc" : "#e9ecef",
                          margin: "0 0.5rem",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                Step-by-step loading feedback
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "white",
            borderRadius: "16px",
            border: "2px solid #e9ecef",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎯</div>
          <h2
            style={{
              fontSize: "2rem",
              margin: "0 0 1rem 0",
              color: "#333",
            }}
          >
            Ready to Explore?
          </h2>
          <p
            style={{
              margin: "0 0 2rem 0",
              color: "#666",
              fontSize: "1.1rem",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Navigate through different pages to see various loading states,
            error handling, and user experience patterns in action.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/users"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "#007acc",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                transition: "all 0.2s",
              }}
            >
              Start with Users 👥
            </Link>
            <Link
              to="/posts"
              style={{
                display: "inline-block",
                padding: "1rem 2rem",
                backgroundColor: "transparent",
                color: "#007acc",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                border: "2px solid #007acc",
                transition: "all 0.2s",
              }}
            >
              Or Browse Posts 📝
            </Link>
          </div>
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </div>
    );
  },
});
