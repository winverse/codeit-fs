// Loading Spinner Component
export const LoadingSpinner = ({ size = 40, color = "#007acc" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    }}
  >
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: "4px solid #f3f3f3",
        borderTop: `4px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
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

// Skeleton Loading Components
export const SkeletonCard = () => (
  <div
    style={{
      padding: "1.5rem",
      backgroundColor: "white",
      border: "1px solid #e9ecef",
      borderRadius: "8px",
      marginBottom: "1rem",
    }}
  >
    <div
      style={{
        height: "20px",
        backgroundColor: "#e9ecef",
        borderRadius: "4px",
        marginBottom: "1rem",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div
      style={{
        height: "16px",
        backgroundColor: "#e9ecef",
        borderRadius: "4px",
        marginBottom: "0.5rem",
        width: "70%",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div
      style={{
        height: "16px",
        backgroundColor: "#e9ecef",
        borderRadius: "4px",
        width: "40%",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

export const SkeletonUserCard = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "1.5rem",
      backgroundColor: "white",
      border: "1px solid #e9ecef",
      borderRadius: "8px",
      marginBottom: "1rem",
    }}
  >
    {/* Avatar skeleton */}
    <div
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "#e9ecef",
        borderRadius: "50%",
        marginRight: "1rem",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />

    <div style={{ flex: 1 }}>
      {/* Name skeleton */}
      <div
        style={{
          height: "20px",
          backgroundColor: "#e9ecef",
          borderRadius: "4px",
          marginBottom: "0.5rem",
          width: "60%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Email skeleton */}
      <div
        style={{
          height: "16px",
          backgroundColor: "#e9ecef",
          borderRadius: "4px",
          marginBottom: "0.5rem",
          width: "80%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Role skeleton */}
      <div
        style={{
          height: "14px",
          backgroundColor: "#e9ecef",
          borderRadius: "4px",
          width: "40%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>

    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e9ecef",
      borderRadius: "8px",
      overflow: "hidden",
    }}
  >
    {/* Table header skeleton */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #e9ecef",
      }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "20px",
            backgroundColor: "#e9ecef",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      ))}
    </div>

    {/* Table rows skeleton */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1rem",
          padding: "1rem",
          borderBottom: rowIndex < rows - 1 ? "1px solid #f8f9fa" : "none",
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={colIndex}
            style={{
              height: "16px",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              width: colIndex === 0 ? "80%" : "60%",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    ))}

    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

// Loading States for different scenarios
export const EmptyState = ({
  icon = "📋",
  title = "No Data",
  description = "No items to display",
  action,
}) => (
  <div
    style={{
      textAlign: "center",
      padding: "4rem 2rem",
      color: "#666",
    }}
  >
    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{icon}</div>
    <h2 style={{ margin: "0 0 1rem 0", color: "#333" }}>{title}</h2>
    <p
      style={{
        margin: "0 0 2rem 0",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {description}
    </p>
    {action && action}
  </div>
);

// Progressive Loading Component
export const ProgressiveLoader = ({ steps, currentStep }) => (
  <div
    style={{
      padding: "2rem",
      textAlign: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      {steps.map((step, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: index <= currentStep ? "#007acc" : "#e9ecef",
              color: index <= currentStep ? "white" : "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
          >
            {index < currentStep ? "✓" : index + 1}
          </div>

          {index < steps.length - 1 && (
            <div
              style={{
                width: "60px",
                height: "4px",
                backgroundColor: index < currentStep ? "#007acc" : "#e9ecef",
                margin: "0 1rem",
                transition: "all 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>

    <div
      style={{
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
        color: "#333",
      }}
    >
      {steps[currentStep]}
    </div>

    <div
      style={{
        fontSize: "0.9rem",
        color: "#666",
      }}
    >
      Step {currentStep + 1} of {steps.length}
    </div>
  </div>
);

// Specific skeleton components for different page types
export const UserSkeleton = () => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
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
          width: "60px",
          height: "60px",
          backgroundColor: "#f3f4f6",
          borderRadius: "50%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            width: "60%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "16px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            width: "80%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
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
            backgroundColor: "#f3f4f6",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "40px",
            height: "12px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "24px",
          backgroundColor: "#f3f4f6",
          borderRadius: "20px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: "70px",
          height: "32px",
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>

    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

export const PostSkeleton = () => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
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
        <div
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "80px",
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "20px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          height: "24px",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
          marginBottom: "0.5rem",
          width: "85%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />

      <div
        style={{
          height: "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
          marginBottom: "0.25rem",
          width: "100%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          height: "16px",
          backgroundColor: "#f3f4f6",
          borderRadius: "4px",
          width: "70%",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: `${40 + i * 10}px`,
              height: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "12px",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ))}
      </div>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: "60px",
            height: "14px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "80px",
            height: "14px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "40px",
            height: "14px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: "30px",
            height: "14px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "14px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </div>

    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);

export const DashboardSkeleton = () => (
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
        <div
          style={{
            height: "40px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "0.5rem",
            width: "300px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: "20px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            width: "500px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          width: "120px",
          height: "44px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
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
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f3f4f6",
                borderRadius: "4px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
            <div>
              <div
                style={{
                  height: "14px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                  width: "80px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  height: "32px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  width: "120px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "2rem",
      }}
    >
      {/* 최근 활동 스켈레톤 */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            height: "24px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "1.5rem",
            width: "150px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: "16px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    marginBottom: "0.25rem",
                    width: "80%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    height: "12px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    width: "40%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인기 게시글 스켈레톤 */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            height: "24px",
            backgroundColor: "#f3f4f6",
            borderRadius: "4px",
            marginBottom: "1.5rem",
            width: "120px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
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
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "50%",
                  flexShrink: 0,
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    height: "16px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                    width: "90%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    height: "12px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    width: "70%",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "10px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "4px",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "30px",
                      height: "10px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "4px",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
);
