# 10. 에러 핸들링과 유효성 검사

이번 챕터에서는 09 챕터에서 완성한 인증 코드에 **중앙 에러 핸들링**과 **데이터 유효성 검사** 로직을 추가하여, 코드를 한 단계 더 발전시키고 안정성을 높이는 리팩토링 과정을 시연합니다.

## 🎯 학습 목표

- Express의 중앙 에러 핸들링 미들웨어를 구현하여, 모든 에러를 일관되게 처리할 수 있다.
- `zod` 라이브러리를 사용하여 API 요청 데이터의 유효성을 검사하는 재사용 가능한 미들웨어를 구현할 수 있다.
- 기존 라우터 코드에서 에러 처리와 유효성 검사 로직을 분리하여, 코드의 가독성과 유지보수성을 향상시킬 수 있다.

---

## 1. 사전 준비: `zod` 라이브러리 설치

데이터 유효성 검사를 위해 `zod` 라이브러리를 설치합니다.

```bash
npm install zod
```

---

## 2. 중앙 에러 핸들링 미들웨어 구현

먼저, 모든 에러를 마지막에 처리하는 미들웨어를 `src/middlewares/error-handler.middleware.js`에 구현합니다.

### `src/middlewares/error-handler.middleware.js`

```javascript
import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma의 특정 에러 코드 처리
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') { // Unique constraint failed
      // ex: "Unique constraint failed on the fields: (`email`)"
      const field = err.meta?.target?.[0];
      return res.status(409).json({ message: `${field}가 이미 사용 중입니다.` });
    }
  }

  // 기타 예상 가능한 에러 처리 (추후 확장 가능)
  // if (err instanceof CustomError) { ... }

  // 처리되지 않은 모든 에러
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
};
```

---

## 3. 유효성 검사 기능 구현

`zod` 스키마와 이를 사용하는 범용 미들웨어를 구현합니다.

### 가. `validators` 폴더 및 스키마 생성

`src/validators/auth.validator.js` 파일을 생성하고, 회원가입을 위한 유효성 검사 규칙을 정의합니다.

**`src/validators/auth.validator.js`**
```javascript
import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
  name: z.string().min(2, { message: '이름은 2자 이상이어야 합니다.' }).optional(),
});
```

### 나. 유효성 검사 미들웨어 생성

`src/middlewares/validation.middleware.js` 파일을 생성하여, 어떤 `zod` 스키마든 받아 처리할 수 있는 범용 미들웨어를 만듭니다.

**`src/middlewares/validation.middleware.js`**
```javascript
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // zod 에러가 발생하면, 400 Bad Request 응답
    const validationErrors = error.errors.map((err) => err.message);
    res.status(400).json({ errors: validationErrors });
  }
};
```

---

## 4. 기존 코드 리팩토링

이제 위에서 만든 미들웨어들을 실제 코드에 적용합니다.

### 가. `server.js`에 에러 핸들러 적용

`src/server.js`의 **가장 마지막**에 `errorHandler` 미들웨어를 추가합니다.

```javascript
// src/server.js
import { errorHandler } from './middlewares/error-handler.middleware.js';
// ...

app.use('/api', apiRouter); // apiRouter는 이미 /api 경로를 사용한다고 가정

// 에러 핸들링 미들웨어는 모든 라우터 뒤에 위치해야 함
app.use(errorHandler);

// ...
```

### 나. `auth.router.js`에 유효성 검사 및 에러 처리 적용

`/signup` 라우트에서 기존에 수동으로 하던 유효성 검사와 `try...catch`를 제거하고, 새로운 미들웨어를 사용하도록 리팩토링합니다.

**리팩토링 전 (`/signup` 라우트)**
```javascript
// ...
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) { // 👎 수동 유효성 검사
      return res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    }
    // ...
  } catch (error) { // 👎 개별 에러 처리
    next(error);
  }
});
```

**리팩토링 후 (`/signup` 라우트)**
```javascript
import { validate } from '../middlewares/validation.middleware.js';
import { signUpSchema } from '../validators/auth.validator.js';
// ...

router.post('/signup', validate(signUpSchema), async (req, res, next) => {
  try {
    // 이제 이 로직은 유효성 검사를 통과한 데이터만 받음
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    // ...
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // 모든 에러는 중앙 에러 핸들러로 전달
    next(error);
  }
});
```
