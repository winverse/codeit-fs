# 실습: 06. 종합 API 구현 챌린지

`06-real-world-example`에서는 `User`와 `Post`에 대한 완전한 블로그 API를 구현했습니다. 이번 챌린지에서는 지금까지 배운 모든 내용을 종합하여, 마지막 남은 기능인 `Comment` API를 스스로 구현해 봅니다.

## 🎯 학습 목표

- Repository 패턴을 활용하여 Comment 데이터 접근 로직을 구현할 수 있다.
- 관계 쿼리(include)를 사용하여 댓글과 관련된 데이터를 함께 조회할 수 있다.
- RESTful API 설계 원칙에 따라 Comment CRUD 엔드포인트를 구현할 수 있다.
- 전체 블로그 API의 일관성을 유지하며 기능을 확장할 수 있다.

---

## 📋 TODO 체크리스트

### 0단계: 환경 설정
- [ ] **데이터베이스 연결**
  - [ ] `.env` 파일을 프로젝트 루트에 생성했나요?
  - [ ] `DATABASE_URL`을 본인의 PostgreSQL 데이터베이스 URL로 설정했나요?

    ```bash
    # 비밀번호가 있는 경우
    DATABASE_URL=

    # 비밀번호가 없는 경우
    DATABASE_URL=
    ```

  - [ ] `npm install`로 의존성 패키지를 설치했나요?

- [ ] **데이터베이스 초기화**

  **새로운 데이터베이스를 사용하는 경우 (마이그레이션 방식)**
  - [ ] `npx prisma migrate dev --name init`로 데이터베이스 스키마를 적용했나요?
  
  **기존 데이터베이스를 계속 사용하는 경우 (DB Push 방식)**
  - [ ] 스키마 상태를 확인했나요? `npx prisma validate`
  - [ ] 스키마를 데이터베이스에 적용했나요? `npx prisma db push`
  - [ ] Prisma Client를 업데이트했나요? `npx prisma generate`
  
  **공통 작업**
  - [ ] `npm run seed`로 초기 데이터를 삽입했나요?
  - [ ] DBeaver에서 User, Post, Comment 데이터가 모두 생성되었는지 확인했나요? (또는 `npx prisma studio` 사용 가능)

### 1단계: Comment Repository 구현

## 📋 TODO 체크리스트

- [ ] **`comment.repository.js` 파일 생성**

  - [ ] `src/repository/comment.repository.js` 파일을 새로 생성했나요?
  - [ ] 06-real-world-example 스타일에 맞게 function 키워드로 함수를 선언했나요?

- [ ] **CRUD 함수 구현**

  - [ ] `createComment(data)` - 새 댓글 생성 (content, authorId, postId 포함)
  - [ ] `findAllComments()` - 모든 댓글 조회 (author 정보 include)
  - [ ] `findCommentsByPostId(postId)` - 특정 게시글의 댓글 목록 조회
  - [ ] `findCommentById(id)` - ID로 특정 댓글 조회
  - [ ] `updateComment(id, data)` - 댓글 내용 수정
  - [ ] `deleteComment(id)` - 댓글 삭제

- [ ] **Repository 객체 export**
  - [ ] 모든 함수를 `commentRepository` 객체로 묶어서 export 했나요?

### 2단계: Comment Router 구현

- [ ] **`comments.js` 라우터 파일 생성**

  - [ ] `src/routes/comments.js` 파일을 새로 생성했나요?
  - [ ] `commentRepository`를 import 했나요?

- [ ] **RESTful API 엔드포인트 구현**
  - [ ] `POST /comments` - 새 댓글 생성 (201 Created)
  - [ ] `GET /comments` - 모든 댓글 조회 (200 OK)
  - [ ] `GET /comments/post/:postId` - 특정 게시글의 댓글 목록 조회
  - [ ] `GET /comments/:id` - 특정 댓글 조회 (200 OK | 404 Not Found)
  - [ ] `PUT /comments/:id` - 댓글 수정 (200 OK | 404 Not Found)
  - [ ] `DELETE /comments/:id` - 댓글 삭제 (200 OK | 404 Not Found)

### 3단계: 라우터 통합 및 테스트

- [ ] **라우터 등록**

  - [ ] `src/routes/index.js`에서 `commentsRouter`를 import 했나요?
  - [ ] `router.use('/comments', commentsRouter)`로 등록했나요?

- [ ] **API 테스트**
  - [ ] 새 댓글 생성: `POST /comments`
    ```json
    {
      "content": "좋은 글이네요!",
      "authorId": 1,
      "postId": 1
    }
    ```
  - [ ] 게시글별 댓글 조회: `GET /comments/post/1`
  - [ ] 댓글 수정 및 삭제 테스트

---

## 💡 상세 구현 힌트

### 1단계: Comment Repository 구현 예시

#### `src/repository/comment.repository.js` 전체 구조
```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createComment(data) {
  return await prisma.comment.create({
    data,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      post: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
}

async function findCommentById(id) {
  return await prisma.comment.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      post: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
}

// TODO: 나머지 함수들도 이와 같은 패턴으로 구현하세요
// findAllComments(), findCommentsByPostId(), updateComment(), deleteComment()

export const commentRepository = {
  createComment,
  findCommentById,
  // TODO: 여기에 나머지 함수들을 추가하세요
};
```

### 2단계: Comments Router 구현 예시

#### `src/routes/comments.js` 핵심 패턴
```javascript
import express from 'express';
import { commentRepository } from '../repository/comment.repository.js';

const router = express.Router();

// 새 댓글 생성 - 완전한 예시
router.post('/', async (req, res) => {
  try {
    const { content, authorId, postId } = req.body;
    
    // 필수 필드 검증
    if (!content || !authorId || !postId) {
      return res.status(400).json({ 
        error: 'content, authorId, and postId are required' 
      });
    }

    const newComment = await commentRepository.createComment({
      content,
      authorId: Number(authorId),
      postId: Number(postId)
    });
    
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 댓글 조회 - 에러 처리 포함
router.get('/:id', async (req, res) => {
  try {
    const comment = await commentRepository.findCommentById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: 나머지 엔드포인트들도 이와 같은 패턴으로 구현하세요
// GET /, GET /post/:postId, PUT /:id, DELETE /:id

export const commentsRouter = router;
```

### 3단계: 라우터 통합

#### `src/routes/index.js` 수정
```javascript
import express from 'express';
import { usersRouter } from './users.js';
import { postsRouter } from './posts.js';
import { commentsRouter } from './comments.js'; // 추가

const router = express.Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter); // 추가

export const indexRouter = router;
```

---

## 🧪 테스트 시나리오 혹은 POSTMAN 이용

### 단계별 API 테스트
```bash
# 1. 서버 실행
npm run dev

# 2. 댓글 생성 테스트
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -d '{
    "content": "정말 좋은 글이네요!",
    "authorId": 1,
    "postId": 1
  }'

# 3. 모든 댓글 조회
curl http://localhost:3000/comments

# 4. 특정 게시글의 댓글 목록 조회
curl http://localhost:3000/comments/post/1

# 5. 특정 댓글 조회
curl http://localhost:3000/comments/1

# 6. 댓글 수정
curl -X PUT http://localhost:3000/comments/1 \
  -H "Content-Type: application/json" \
  -d '{"content": "수정된 댓글 내용입니다."}'

# 7. 댓글 삭제
curl -X DELETE http://localhost:3000/comments/1
```

---

## 🎓 학습 포인트

### 주의해야 할 사항들

1. **타입 변환**: `req.params.id`는 문자열이므로 `Number()`로 변환 필요
2. **에러 처리**: Prisma의 `P2025` 에러 코드는 "레코드를 찾을 수 없음"을 의미
3. **관계 데이터**: `include`를 사용해 작성자와 게시글 정보도 함께 조회
4. **필드 선택**: `select`를 사용해 필요한 필드만 조회하여 성능 최적화

### Repository 패턴의 장점
- 데이터 접근 로직을 한 곳에 모음
- 라우터에서는 비즈니스 로직에만 집중
- 재사용 가능한 함수들로 구성
- 테스트하기 쉬운 구조

---

## 🚀 도전 과제 (선택사항)

완성 후 추가로 구현해볼 만한 기능들:

1. **댓글 개수 조회**: `GET /posts/:id/comments/count`
2. **페이지네이션**: `GET /comments?page=1&limit=10`
3. **댓글 검색**: `GET /comments?search=keyword`
4. **대댓글 기능**: Comment 모델에 `parentId` 추가
