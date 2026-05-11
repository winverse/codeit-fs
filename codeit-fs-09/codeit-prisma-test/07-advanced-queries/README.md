# 07. 고급 쿼리 - 검색, 필터링, 페이지네이션

06-real-world-example-challenge에서 완성한 Comment API를 기반으로, **검색, 페이지네이션, 인기순 정렬** 등 실무 필수 기능을 Post API에 추가해봅시다.

## 🎯 학습 목표

- 제목/작성자 이름으로 게시글을 검색할 수 있다.
- 게시글 목록에 페이지네이션을 적용할 수 있다.
- 댓글 수 기준으로 인기 게시글을 조회할 수 있다.

---

## � TODO 체크리스트

### 0단계: 시작 설정

- [ ] `npm install` 실행
- [ ] 기존 User, Post, Comment API가 정상 동작하는지 확인

### 1단계: Post Repository에 고급 쿼리 함수 추가

- [ ] **`src/repository/post.repository.js`에 3개 함수 추가**
  - [ ] `searchPosts(search)` - 제목/작성자 검색
  - [ ] `getPostsWithPagination(page, limit)` - 페이지네이션
  - [ ] `getPopularPosts(limit)` - 댓글 수 기준 인기 게시글

### 2단계: Post Router에 고급 쿼리 API 추가

- [ ] **`src/routes/posts.js`에 3개 엔드포인트 추가**
  - [ ] `GET /posts/search?q=검색어` - 게시글 검색
  - [ ] 기존 `GET /posts`에 페이지네이션 파라미터 추가 (`?page=1&limit=10`)
  - [ ] `GET /posts/popular?limit=5` - 인기 게시글

### 3단계: 테스트

- [ ] **새로 추가된 API 엔드포인트 테스트**
  - [ ] 검색: `GET /posts/search?q=게시글`
  - [ ] 페이지네이션: `GET /posts?page=1&limit=5`
  - [ ] 인기 게시글: `GET /posts/popular?limit=3`

---

## 💡 구현 가이드

### 1. Post Repository 함수 구현

**`src/repository/post.repository.js`에 추가:**

```javascript
// 1. 간단한 검색 - 제목 또는 작성자 이름으로 검색
async function searchPosts(search) {
  return await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { name: { contains: search, mode: 'insensitive' } } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true, email: true } },
      _count: { select: { comments: true } },
    },
  });
}

// 2. 기본 페이지네이션
async function getPostsWithPagination(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [posts, totalCount] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true, email: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.post.count(),
  ]);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      hasNext: page < Math.ceil(totalCount / limit),
    },
  };
}

// 3. 인기 게시글 (댓글 수 기준)
async function getPopularPosts(limit = 5) {
  return await prisma.post.findMany({
    take: limit,
    orderBy: {
      comments: { _count: 'desc' },
    },
    include: {
      author: { select: { name: true, email: true } },
      _count: { select: { comments: true } },
    },
  });
}

// export에 추가
export const postRepository = {
  // ... 기존 CRUD 함수들
  searchPosts,
  getPostsWithPagination,
  getPopularPosts,
};
```

### 2. Post Router API 구현

**`src/routes/posts.js`에 추가:**

```javascript
// 기존 GET /posts에 페이지네이션 추가
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await postRepository.getPostsWithPagination(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 검색 API
router.get('/search', async (req, res) => {
  try {
    const { q: search } = req.query;
    const posts = await postRepository.searchPosts(search);
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 인기 게시글 API
router.get('/popular', async (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 5;
    const popularPosts = await postRepository.getPopularPosts(limit);
    res.json({ posts: popularPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🧪 테스트 시나리오

### API 테스트

```bash
# 1. 페이지네이션 테스트
curl "http://localhost:3000/posts?page=1&limit=5"

# 2. 검색 테스트
curl "http://localhost:3000/posts/search?q=게시글"

# 3. 인기 게시글 테스트
curl "http://localhost:3000/posts/popular?limit=3"
```

### 예상 응답 형태

```json
{
  "posts": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalCount": 25,
    "hasNext": true
  }
}
```

---

## 🎯 핵심 정리

- **OR 조건**: 제목 또는 작성자 이름 검색
- **페이지네이션**: skip/take + count 조합
- **관계 정렬**: comments.\_count로 인기도 정렬
- **include**: 작성자 정보와 댓글 수 함께 조회

---

## 🚀 다음 단계

**07-advanced-queries-challenge**에서 Comment API에도 동일한 고급 쿼리를 적용해봅시다!

```

```
