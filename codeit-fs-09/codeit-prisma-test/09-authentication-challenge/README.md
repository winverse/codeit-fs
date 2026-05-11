# 09. 실습: 인증 기능 처음부터 구현하기

이번 챌린지에서는 `08-challenge`의 코드 베이스에서 시작하여, 인증 시스템을 처음부터 끝까지 직접 구현합니다. 라이브러리 설치, 스키마 수정, 유틸리티 모듈 작성, 미들웨어 및 라우터 구현, 그리고 서버 적용까지 모든 과정을 스스로 진행하며 쿠키 기반 인증 흐름을 완성합니다.

## 🎯 학습 목표

- 인증에 필요한 라이브러리를 직접 설치하고, 스키마와 환경 변수를 설정할 수 있다.
- 재사용 가능한 유틸리티 함수(해싱, JWT, 쿠키)를 모듈로 분리하여 작성할 수 있다.
- 인증 미들웨어와 API 라우터를 구현하고, 서버에 올바르게 등록하여 전체 인증 시스템을 완성할 수 있다.

---

## 📋 구현할 기능

- **사용자 회원가입**: 비밀번호를 암호화하여 새로운 사용자를 생성합니다.
- **사용자 로그인**: 이메일, 비밀번호 검증 후 성공 시 JWT를 발급하여 쿠키에 저장합니다.
- **사용자 로그아웃**: 클라이언트에 저장된 인증 쿠키를 삭제합니다.
- **API 접근 제어**: 인증 미들웨어를 통해 특정 API는 로그인한 사용자만 접근하도록 보호합니다.

---

## 📋 TODO 체크리스트

### 0단계: 환경 설정
- [ ] **기본 의존성 설치**: `npm install`을 실행하여 `express`, `prisma` 등 기본 라이브러리를 설치했나요?
- [ ] **데이터베이스 연결 확인**: `.env` 파일에 `DATABASE_URL`이 올바르게 설정되어 있고, 데이터베이스에 연결할 수 있나요?

### 1단계: 인증 기능 구현 준비
- [ ] **라이브러리 설치**: `npm install jsonwebtoken bcrypt cookie-parser` 명령어로 인증 관련 라이브러리를 설치했나요?
- [ ] **스키마 수정**: `prisma/schema.prisma`의 `User` 모델에 `password` 필드를 추가했나요?
    ```prisma
    // prisma/schema.prisma
    model User {
      // ... 기존 필드들 ...
      password  String
    }
    ```
- [ ] **DB 동기화**: `npx prisma db push` 명령어로 변경된 스키마를 데이터베이스에 적용했나요?
- [ ] **환경 변수 추가**: `.env` 파일에 `JWT_SECRET`과 `JWT_REFRESH_SECRET`을 추가했나요?

### 2단계: Repository 확장 및 유틸리티 함수 구현
- [ ] **Repository 함수 추가**: `src/repository/user.repository.js`에 `findUserByEmail` 함수를 추가했나요?
- [ ] `src/utils` 폴더를 생성했나요?
- [ ] `src/utils/hash.util.js`를 만들고, `hashPassword`와 `comparePassword` 함수를 구현했나요?
- [ ] `src/utils/jwt.util.js`를 만들고, `generateTokens`와 `verifyToken` 함수를 구현했나요?
- [ ] `src/utils/cookie.util.js`를 만들고, `setAuthCookies`와 `clearAuthCookies` 함수를 구현했나요?

### 3단계: 인증 미들웨어 구현
- [ ] `src/middlewares/auth.middleware.js` 파일을 만들고, `authMiddleware`를 구현했나요?
- [ ] 미들웨어에서 `userRepository`를 import하여 사용했나요?
- [ ] 미들웨어에서 쿠키의 `accessToken`을 읽어 `verifyToken`으로 검증하나요?
- [ ] 검증 성공 시 `userRepository.findUserById()`를 사용하여 사용자 정보를 조회하고 `req.user`에 저장하나요?

### 4단계: 라우터 및 서버 적용
- [ ] `src/server.js`에 `cookie-parser` 미들웨어를 적용했나요?
- [ ] `src/routes/auth.js` 파일을 생성했나요?
- [ ] `auth.js`에서 `userRepository`를 import하여 사용했나요?
- [ ] `POST /signup` API를 `userRepository.createUser()`로 구현했나요?
- [ ] `POST /login` API를 `userRepository.findUserByEmail()`로 구현했나요?
- [ ] `POST /logout` API를 구현했나요?
- [ ] `GET /me` API를 `authMiddleware`로 보호하여 구현했나요?
- [ ] `src/routes/index.js`에 `authRouter`를 `/api/auth` 경로로 등록했나요?

### 5단계: 테스트
- [ ] API 클라이언트로 회원가입, 로그인, 로그아웃, 내 정보 조회가 모두 정상 동작하는지 확인했나요?

---

## 💡 구현 가이드 (힌트)

챌린지 진행 중 막히는 부분이 있다면 아래 가이드를 참고하여 `repository`, `utils`, `middlewares` 폴더의 파일들을 먼저 완성하세요.

### `src/repository/user.repository.js` 확장

기존 user.repository.js에 인증용 함수를 추가하세요:

```javascript
// 이메일로 유저를 찾는 함수 (인증용)
async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

// export 객체에 추가
export const userRepository = {
  createUser,
  findUserById,
  findUserByEmail, // 추가
  findAllUsers,
  updateUser,
  deleteUser,
  createUserAndPost,
};
```

### `src/utils/hash.util.js`

```javascript
import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
```

### `src/utils/jwt.util.js`

```javascript
import jwt from 'jsonwebtoken';

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
```

### `src/utils/cookie.util.js`

```javascript
export const setAuthCookies = (res, tokens) => {
  const { accessToken, refreshToken } = tokens;
  res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
};

export const clearAuthCookies = (res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
```

### `src/middlewares/auth.middleware.js`

```javascript
import { verifyToken } from '../utils/jwt.util.js';
import { userRepository } from '../repository/user.repository.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw new Error('인증 정보가 없습니다.');

    const payload = verifyToken(accessToken, process.env.JWT_SECRET);
    if (!payload) throw new Error('인증 정보가 유효하지 않습니다.');

    const user = await userRepository.findUserById(payload.userId);
    if (!user) throw new Error('인증 정보와 일치하는 사용자가 없습니다.');

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
```

---

## 💡 정답 코드 (Solution)

<details>
<summary>정답 코드를 보려면 여기를 클릭하세요.</summary>

### `src/routes/auth.js`

```javascript
import express from 'express';
import { userRepository } from '../repository/user.repository.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';
import { generateTokens } from '../utils/jwt.util.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookie.util.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 회원가입 API
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
});

// 로그인 API
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    const tokens = generateTokens(user);
    setAuthCookies(res, tokens);
    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    next(error);
  }
});

// 로그아웃 API
router.post('/logout', (req, res) => {
  clearAuthCookies(res);
  res.status(200).json({ message: '로그아웃 성공' });
});

// 내 정보 조회 API
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export { router as authRouter };
```

### `src/server.js`

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import { indexRouter as apiRouter } from './routes/index.js';

const app = express();
const PORT = 

app.use(express.json());
app.use(cookieParser()); // 추가된 부분
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### `src/routes/index.js`

```javascript
import express from 'express';
import { usersRouter } from './users.js';
import { postsRouter } from './posts.js';
import { commentsRouter } from './comments.js';
import { transactionsRouter } from './transactions.js';
import { authRouter } from './auth.js'; // 추가된 부분

const router = express.Router();

router.use('/auth', authRouter); // 추가된 부분
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/transactions', transactionsRouter);

export const indexRouter = router;
```

</details>