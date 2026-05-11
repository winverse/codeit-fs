# 01. 프로젝트 초기 설정

Prisma와 Express.js를 사용한 프로젝트의 가장 기본적인 뼈대를 구성합니다. 이 단계에서는 서버를 실행하고, 코드 스타일을 통일하며, Prisma를 사용할 준비를 하는 과정을 다룹니다.

## 🎯 학습 목표

- Node.js 프로젝트를 시작하고 `package.json`을 설정할 수 있다.
- Express.js, Prisma 등 핵심 라이브러리를 설치하고 그 역할을 이해한다.
- ESLint와 Prettier를 사용하여 코드의 일관성을 유지하는 방법을 배운다.
- `src`, `prisma` 등 기본적인 프로젝트 폴더 구조를 이해한다.

---

## 💻 최종 코드

이 단계를 완료하면 각 파일은 아래와 같은 상태가 됩니다.

### `package.json`

```json
{
  "name": "01-setup",
  "version": "1.0.0",
  "description": "Prisma 학습을 위한 초기 설정 데모",
  "author": "Your Name <your-email@example.com>",
  "engines": {
    "node": ">=22.0.0"
  },
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@prisma/client": "6.16.2",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "eslint": "^9.36.0",
    "nodemon": "3.1.10",
    "prettier": "^3.6.2",
    "prisma": "^6.16.2"
  }
}
```

### `src/server.js`

```javascript
import express from 'express';

const app = express();
const PORT = 

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### `eslint.config.js`

```javascript
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
];
```

### `.prettierrc`

```json
{
  "printWidth": 80,
  "bracketSpacing": true,
  "trailingComma": "all",
  "semi": true,
  "singleQuote": true
}
```

---

## 🚀 다음 단계

이제 `01-setup-challenge` 폴더에서, 이 설정 과정을 직접 처음부터 따라 해보는 실습을 진행합니다.