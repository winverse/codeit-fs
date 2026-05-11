# 10. 실습: 에러 핸들링 및 유효성 검사 리팩토링

이번 챌린지에서는 09 챕터에서 완성한 인증 기능 코드에, 중앙 에러 핸들링과 `zod` 유효성 검사 로직을 적용하는 리팩토링을 직접 수행합니다. 기존 코드의 `try...catch` 블록과 수동 유효성 검사를 제거하고, 재사용 가능한 미들웨어로 대체하여 코드의 안정성과 가독성을 높입니다.

## 🎯 학습 목표

- 기존 코드의 에러 처리 로직을 중앙 에러 핸들링 미들웨어로 교체할 수 있다.
- `zod`를 사용하여 유효성 검사 로직을 미들웨어로 분리하고, 기존 코드에 적용할 수 있다.
- 리팩토링을 통해 관심사 분리 원칙을 적용하고, 코드의 품질을 향상시킬 수 있다.

---

## 📋 TODO 체크리스트

### 0단계: 환경 설정

- [ ] **시작 코드 확인**: 현재 폴더(`10-error-handling-validation-challenge`)에 09 챕터의 완성된 코드가 모두 들어있는지 확인하세요.
- [ ] **라이브러리 설치**: `npm install zod` 명령어로 `zod` 라이브러리를 설치했나요?

### 1단계: 중앙 에러 핸들러 구현 및 적용

- [ ] `src/middlewares/error-handler.middleware.js` 파일을 생성하고, `errorHandler` 함수를 구현했나요?
  - `PrismaClientKnownRequestError` (`P2002` 등)를 처리하는 로직을 포함해야 합니다.
- [ ] `src/server.js`의 가장 마지막에 `errorHandler` 미들웨어를 적용했나요?
- [ ] 기존의 모든 라우터(`auth.js`, `users.js` 등)에서 개별 에러 처리 로직을 제거하고, `catch (error) { next(error); }` 형태로 에러를 중앙 핸들러에 전달하도록 수정했나요?

### 2단계: 유효성 검사 구현 및 적용

- [ ] `src/validators/auth.validator.js` 파일을 생성하고, `signUpSchema`를 `zod`로 정의했나요?
- [ ] `src/middlewares/validation.middleware.js` 파일을 생성하고, 범용 `validate` 미들웨어를 구현했나요?
- [ ] `src/routes/auth.js`의 `POST /signup` 라우트에 `validate(signUpSchema)` 미들웨어를 적용했나요?
- [ ] `/signup` 라우트 핸들러에서 수동으로 하던 유효성 검사 코드를 제거했나요?

### 3단계: 테스트

- [ ] **유효성 검사 테스트**: 일부러 짧은 비밀번호나 잘못된 이메일 형식으로 회원가입을 시도하여, `400 Bad Request` 에러가 발생하는지 확인했나요?
- [ ] **에러 핸들러 테스트**: 이미 가입된 이메일로 다시 회원가입을 시도하여, 중앙 에러 핸들러가 `409 Conflict` 에러를 반환하는지 확인했나요?

---

## 💡 구현 가이드 (힌트)

### `error-handler.middleware.js` 구현 예시

```javascript
import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      return res
        .status(409)
        .json({ message: `${field}가 이미 사용 중입니다.` });
    }
  }
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
};
```

### `validation.middleware.js` 구현 예시

```javascript
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const validationErrors = error.errors.map((err) => err.message);
    res.status(400).json({ errors: validationErrors });
  }
};
```

### `auth.router.js`의 `/signup` 리팩토링 예시

```javascript
// 리팩토링 전 (09 챕터에서 이미 repository 패턴 적용됨)
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: '이메일과 비밀번호는 필수입니다.' });
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });
    const { password: userPassword, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // 개별 에러 처리 로직...
    if (error.code === 'P2002') {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 리팩토링 후 - 중앙 에러 핸들링 + Zod 유효성 검사 적용
import { validate } from '../middlewares/validation.middleware.js';
import { signUpSchema } from '../validators/auth.validator.js';

router.post('/signup', validate(signUpSchema), async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });
    const { password: userPassword, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error); // 중앙 핸들러로 에러 전달
  }
});
```

---

## 💡 정답 코드 (Solution)

<details>
<summary>정답 코드를 보려면 여기를 클릭하세요.</summary>

### `src/repository/user.repository.js` (수정 후)

```javascript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(data) {
  return await prisma.user.create({ data });
}

async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { posts: true },
  });
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function findAllUsers() {
  return await prisma.user.findMany({
    include: { posts: true },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({ where: { id: Number(id) }, data });
}

async function deleteUser(id) {
  return await prisma.user.delete({ where: { id: Number(id) } });
}

async function createUserAndPost(userData, postData) {
  return await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({ data: userData });
    const newPost = await tx.post.create({
      data: { ...postData, authorId: newUser.id },
    });
    return { newUser, newPost };
  });
}

export const userRepository = {
  createUser,
  findUserById,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
  createUserAndPost,
};
```

### `src/middlewares/error-handler.middleware.js`

```javascript
// 위 구현 가이드와 동일
```

### `src/validators/auth.validator.js`

```javascript
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
  name: z
    .string()
    .min(2, { message: '이름은 2자 이상이어야 합니다.' })
    .optional(),
});
```

### `src/middlewares/validation.middleware.js`

```javascript
// 위 구현 가이드와 동일
```

### `src/server.js` (수정 후)

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import { indexRouter as apiRouter } from './routes/index.js';
import { errorHandler } from './middlewares/error-handler.middleware.js'; // 👈 추가

const app = express();
const PORT = 

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);
app.use(errorHandler); // 👈 추가

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### `src/routes/auth.js` (수정 후)

```javascript
import express from 'express';
import { userRepository } from '../repository/user.repository.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';
import { generateTokens } from '../utils/jwt.util.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookie.util.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validation.middleware.js';
import { signUpSchema } from '../validators/auth.validator.js';

export const authRouter = express.Router();

// 회원가입 API
authRouter.post('/signup', validate(signUpSchema), async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });
    // eslint-disable-next-line no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
});

// 로그인 API
authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: '인증 정보가 유효하지 않습니다.' });
    }
    const tokens = generateTokens(user);
    setAuthCookies(res, tokens);
    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    next(error);
  }
});

// 로그아웃 API
authRouter.post('/logout', (req, res) => {
  clearAuthCookies(res);
  res.status(200).json({ message: '로그아웃 성공' });
});

// 내 정보 조회 API (인증 필요)
authRouter.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});
```

</details>
