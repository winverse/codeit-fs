// Simulate API delay
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "👨‍💻",
    role: "Developer",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "👩‍🎨",
    role: "Designer",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    avatar: "👨‍💼",
    role: "Manager",
    status: "inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    avatar: "👩‍🔬",
    role: "Scientist",
    status: "active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    avatar: "👨‍🏫",
    role: "Teacher",
    status: "active",
  },
];

export const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a powerful library for building user interfaces...",
    authorId: 1,
    publishedAt: "2024-03-15T10:30:00Z",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    content:
      "TypeScript offers many advanced features that can help you write better code...",
    authorId: 2,
    publishedAt: "2024-03-14T14:20:00Z",
    likes: 38,
    comments: 12,
  },
  {
    id: 3,
    title: "Building Scalable Applications",
    content:
      "When building large applications, scalability becomes a key concern...",
    authorId: 3,
    publishedAt: "2024-03-13T09:15:00Z",
    likes: 55,
    comments: 6,
  },
];

export const mockDashboardData = {
  stats: {
    totalUsers: 1247,
    activeUsers: 892,
    totalPosts: 3456,
    totalComments: 8934,
  },
  recentActivity: [
    {
      id: 1,
      type: "user_joined",
      message: "John Doe joined the platform",
      timestamp: "2024-03-15T16:30:00Z",
    },
    {
      id: 2,
      type: "post_created",
      message: 'New post "React Best Practices" was published',
      timestamp: "2024-03-15T15:45:00Z",
    },
    {
      id: 3,
      type: "comment_added",
      message: "5 new comments were added",
      timestamp: "2024-03-15T14:20:00Z",
    },
  ],
  chartData: [
    { month: "Jan", users: 65, posts: 28 },
    { month: "Feb", users: 59, posts: 48 },
    { month: "Mar", users: 80, posts: 40 },
    { month: "Apr", users: 81, posts: 19 },
    { month: "May", users: 56, posts: 86 },
    { month: "Jun", users: 55, posts: 27 },
  ],
};

// API simulation functions
export const api = {
  async fetchUsers() {
    await delay(Math.random() * 2000 + 1000); // 1-3 second delay
    if (Math.random() < 0.1) {
      // 10% chance of error
      throw new Error("Failed to fetch users");
    }
    return mockUsers;
  },

  async fetchUser(id) {
    await delay(Math.random() * 1500 + 500); // 0.5-2 second delay
    if (Math.random() < 0.15) {
      // 15% chance of error
      throw new Error(`Failed to fetch user ${id}`);
    }
    const user = mockUsers.find((u) => u.id === parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  async fetchPosts() {
    await delay(Math.random() * 2500 + 1000); // 1-3.5 second delay
    if (Math.random() < 0.12) {
      // 12% chance of error
      throw new Error("Failed to fetch posts");
    }
    return mockPosts.map((post) => ({
      ...post,
      author: mockUsers.find((u) => u.id === post.authorId),
    }));
  },

  async fetchPost(id) {
    await delay(Math.random() * 1200 + 800); // 0.8-2 second delay
    if (Math.random() < 0.18) {
      // 18% chance of error
      throw new Error(`Failed to fetch post ${id}`);
    }
    const post = mockPosts.find((p) => p.id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    return {
      ...post,
      author: mockUsers.find((u) => u.id === post.authorId),
    };
  },

  async fetchDashboard() {
    await delay(Math.random() * 3000 + 2000); // 2-5 second delay
    if (Math.random() < 0.08) {
      // 8% chance of error
      throw new Error("Failed to fetch dashboard data");
    }
    return mockDashboardData;
  },

  async searchUsers(query) {
    await delay(Math.random() * 1000 + 500); // 0.5-1.5 second delay
    if (Math.random() < 0.1) {
      throw new Error("Search failed");
    }
    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
    );
  },
};
