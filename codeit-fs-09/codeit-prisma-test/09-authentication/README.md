# 09. 인증 기능 구현 (유틸리티와 미들웨어)

이번 챕터에서는 실제 인증 API를 만들기 전, 인증 기능의 핵심적인 '재료'가 되는 유틸리티 함수들과 인증 미들웨어를 구현합니다. 이 부품들을 미리 만들어 둠으로써, 다음 챌린지에서 학생들이 API 로직 자체에 더 집중할 수 있도록 합니다.

## 학습 목표

- 인증 기능에 필요한 핵심 로직(해싱, JWT, 쿠키)을 재사용 가능한 함수로 분리하여 모듈화할 수 있다.
- Access Token을 검증하여 사용자를 인증하는 Express 미들웨어의 동작 원리를 이해하고 구현할 수 있다.

---

## 1. 사전 준비

본격적인 구현에 앞서, 필요한 라이브러리를 설치하고 데이터베이스 스키마와 환경 변수를 설정합니다.

### 가. 라이브러리 설치

```bash
npm install jsonwebtoken bcrypt cookie-parser
```

### 나. 스키마 수정 및 마이그레이션

`prisma/schema.prisma`의 `User` 모델에 `password` 필드를 추가하고, 마이그레이션을 실행합니다.

```prisma
// prisma/schema.prisma
model User {
  // ...
  password  String
  // ...
}
```

```bash
# 스키마 변경사항을 데이터베이스에 직접 반영 (마이그레이션 파일 생성 안함)
npx prisma db push --schema=09-authentication/prisma/schema.prisma
```

### 다. 환경 변수 설정 (`.env`)

`.env` 파일에 JWT 토큰들을 서명하기 위한 비밀키들을 추가합니다.

```env
DATABASE_URL=

JWT_REFRESH_SECRET=
`

---

## 2. 유틸리티 함수 구현 (`src/utils`)

`src/utils` 폴더를 생성하고, 아래 3개의 파일을 작성합니다.

### 가. `src/utils/hash.util.js`

비밀번호를 `bcrypt`로 암호화하고, 비교하는 함수입니다.

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

### 나. `src/utils/jwt.util.js`

Access Token과 Refresh Token을 생성하고 검증하는 함수입니다.

```javascript
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const verifyToken = (token, tokenType = 'access') => {
  try {
    const secret =
      tokenType === 'access'
        ? process.env.JWT_SECRET
        : process.env.JWT_REFRESH_SECRET;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
};
```

### 다. `src/utils/cookie.util.js`

`httpOnly` 속성을 가진 보안 쿠키를 설정하고 삭제하는 함수입니다.

```javascript
export const setAuthCookies = (res, tokens) => {
  const { accessToken, refreshToken } = tokens;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000,
    path: '/',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
};
```

---

## 3. 인증 미들웨어 구현 (`src/middlewares`)

`src/middlewares` 폴더에 `auth.middleware.js` 파일을 작성합니다. 이 미들웨어는 API 요청의 쿠키에서 Access Token을 읽어, 유효한 사용자인지 검증하는 역할을 합니다.

### `src/middlewares/auth.middleware.js`

```javascript
import { verifyToken } from '../utils/jwt.util.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({ message: '인증 정보가 없습니다.' });
    }

    const payload = verifyToken(accessToken, 'access');

    if (!payload) {
      return res
        .status(401)
        .json({ message: '인증 정보가 유효하지 않습니다.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: '인증 정보와 일치하는 사용자가 없습니다.' });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
```

---

여기까지가 09 챕터의 시연 내용입니다. 이제 이 재료들을 가지고, 챌린지에서 실제 API를 완성하게 됩니다.
