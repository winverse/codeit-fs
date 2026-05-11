# 12. 실습: 프로덕션 준비하기

이번 실습에서는 현재까지 개발한 애플리케이션에 프로덕션 환경을 위한 최종 준비 작업을 진행합니다. 서버가 예기치 않게 종료될 때 데이터 손실을 방지하는 **Graceful Shutdown** 로직을 구현하고, 프로덕션 환경에서 사용할 **`npm` 스크립트**를 `package.json`에 추가합니다.

## 시작하기

- `11-data-modeling-challenge` 폴더의 완성된 코드를 `12-production-challenge` 폴더로 복사하여 시작합니다.

## 과제 목표

- `SIGTERM`, `SIGINT`와 같은 시스템 종료 신호를 감지하여 서버를 안전하게 종료하는 Graceful Shutdown 로직을 구현할 수 있다.
- `package.json`에 프로덕션 환경을 위한 `start` 및 마이그레이션 스크립트를 추가할 수 있다.
- 개발 환경과 프로덕션 환경의 동작 차이를 이해하고, 상황에 맞는 명령어를 사용할 수 있다.

---

### 1단계: Graceful Shutdown 구현

1.  **`PrismaClient` 인스턴스 관리**: `src/server.js`에서 `PrismaClient`를 인스턴스화하여, 서버의 다른 부분과 Graceful Shutdown 로직에서 모두 접근할 수 있도록 합니다.

2.  **Graceful Shutdown 로직 추가**: `src/server.js` 파일 하단에, 이론 챕터에서 배운 Graceful Shutdown 코드를 추가하세요.
    - `process.on('SIGTERM', ...)`과 `process.on('SIGINT', ...)`를 사용하여 시스템 종료 신호를 감지해야 합니다.
    - 로직의 순서는 다음과 같아야 합니다:
        1.  Express 서버 종료 (`server.close()`)
        2.  Prisma 클라이언트 연결 종료 (`prisma.$disconnect()`)
        3.  프로세스 종료 (`process.exit()`)

### 2단계: `package.json`에 프로덕션용 스크립트 추가

`package.json` 파일의 `scripts` 섹션을 수정하여, 프로덕션 환경에서 사용할 명령어들을 추가합니다.

```json
// package.json
{
  // ...
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js", // 👈 프로덕션용 시작 스크립트
    "prisma:generate": "npx prisma generate",
    "prisma:migrate": "npx prisma migrate dev",
    "prisma:deploy": "npx prisma migrate deploy", // 👈 프로덕션용 마이그레이션 스크립트
    "format": "prettier --write .",
    "seed": "node scripts/seed.js"
  },
  // ...
}
```

- **`"start": "node src/server.js"`**: `nodemon`은 개발 중에만 사용하는 도구입니다. 프로덕션 환경에서는 `node` 명령어로 직접 서버 파일을 실행해야 합니다.
- **`"prisma:deploy": "npx prisma migrate deploy"`**: 프로덕션 환경에서 데이터베이스 스키마를 안전하게 업데이트하기 위한 스크립트입니다.

### 3단계 (개념): 커넥션 풀 설정 확인

실제 프로덕션 DB가 있는 것은 아니므로, 개념을 익히는 차원에서 `.env` 파일의 `DATABASE_URL`을 수정해봅니다. `connection_limit` 파라미터를 추가하여 동시에 유지할 커넥션의 수를 제한할 수 있음을 확인하세요.

```env
# .env
DATABASE_URL=
`

---

## 검증 방법

1.  **Graceful Shutdown 테스트**:
    - 터미널에서 `npm run dev` 명령어로 서버를 시작하세요.
    - 서버가 실행되면, 터미널에서 `Ctrl+C`를 누릅니다.
    - 아래와 같이 Graceful Shutdown 과정이 담긴 로그 메시지가 순서대로 출력되는지 확인하세요.
        ```
        👋 Shutting down gracefully...
        🚫 HTTP server closed.
        🍃 Prisma client disconnected.
        ```

2.  **프로덕션 스크립트 테스트**:
    - `npm start` 명령어를 실행하여 서버가 `nodemon` 없이 정상적으로 시작되는지 확인하세요.
    - `npm run prisma:deploy` 명령어를 실행하세요. 아직 적용되지 않은 마이그레이션이 없으므로, "All migrations have been applied."와 같은 메시지가 출력되는지 확인하세요.
