# 12. Production을 위한 Prisma

이번 챕터에서는 개발 단계를 넘어, 실제 서비스 환경(Production)에서 Prisma 애플리케이션을 안정적으로 배포하고 운영하기 위한 필수 지식들을 배웁니다. 개발 환경에서 사용하던 명령어와 프로덕션 환경에서 사용해야 할 명령어의 차이점을 이해하고, 서버의 안정성을 높이는 설정들을 적용합니다.

## 학습 목표

- 개발용 마이그레이션(`migrate dev`)과 프로덕션용 마이그레이션(`migrate deploy`)의 차이점을 이해하고, 상황에 맞게 사용할 수 있다.
- 데이터베이스 커넥션 풀(Connection Pool)의 개념을 이해하고, 프로덕션 환경에 맞게 설정할 수 있다.
- 쿼리 최적화와 인덱싱의 중요성을 이해하고 Prisma 스키마에 적용할 수 있다.
- 서버가 종료될 때 진행 중이던 작업을 안전하게 마무리하는 Graceful Shutdown을 구현할 수 있다.
- 환경별로 데이터베이스 연결 정보를 안전하게 관리할 수 있다.

---

## 1. 마이그레이션: `migrate dev` vs `migrate deploy`

개발 중에는 `prisma migrate dev`를 사용했지만, 프로덕션 환경에서는 이 명령어를 **절대 사용해서는 안 됩니다.** 데이터베이스를 리셋할 가능성이 있는 등 위험하기 때문입니다.

| **명령어** | **`prisma migrate dev`** | **`prisma migrate deploy`** |
| --- | --- | --- |
| **주요 용도** | 개발 중 스키마 변경 | **프로덕션 환경에 마이그레이션 적용** |
| **마이그레이션 파일** | **생성** 및 적용 | **적용만 가능** (생성 불가) |
| **DB 리셋 가능성** | 있음 (경고 메시지 표시) | **없음 (안전)** |
| **사용 환경** | 개발(Development) | **프로덕션(Production), CI/CD** |

**프로덕션 배포 시나리오:**
1.  개발 환경에서 `prisma migrate dev`로 마이그레이션 파일을 모두 생성하고 `git`에 커밋합니다.
2.  프로덕션 서버(또는 CI/CD 파이프라인)에서 `git pull`로 최신 코드를 받습니다.
3.  아래 명령어를 실행하여, 아직 적용되지 않은 마이그레이션들을 안전하게 데이터베이스에 적용합니다.

    ```bash
    npx prisma migrate deploy
    ```

---

## 2. 데이터베이스 커넥션 풀과 타임아웃: 성능과 안정성 관리

`README.md`에서 커넥션 풀을 '연결을 재사용하는 기술'이라고 간략히 설명했습니다. 여기서는 그 원리와 중요성, 그리고 Prisma에서의 설정 방법을 더 자세히 살펴보겠습니다.

### 왜 커넥션 풀이 필수적인가?

애플리케이션이 데이터베이스에 쿼리를 보낼 때마다 새로운 '연결'을 만드는 과정은 생각보다 훨씬 비싼 작업입니다. 매번 연결을 새로 만들면 다음과 같은 일들이 순차적으로 일어납니다.

1.  **TCP/IP 핸드셰이크**: 애플리케이션 서버와 데이터베이스 서버 간의 네트워크 경로를 설정합니다.
2.  **SSL 핸드셰이크**: 통신을 암호화하기 위한 키를 교환합니다. (보안 연결 시)
3.  **데이터베이스 인증**: 사용자의 아이디와 비밀번호를 확인하고 권한을 체크합니다.
4.  **메모리 할당**: 데이터베이스 서버는 이 새로운 연결을 관리하기 위한 메모리를 할당합니다.

**커넥션 풀**은 이 모든 비용을 절약하기 위해, 미리 일정 개수의 연결을 만들어두고("풀(Pool)"에 담아두고) 필요할 때마다 꺼내 쓴 뒤, 사용이 끝나면 다시 풀에 반납하여 재사용하는 기술입니다. 이로 인해 애플리케이션의 응답 속도와 처리량이 극적으로 향상됩니다.

### Prisma의 커넥션 풀 동작 방식

Prisma는 내장된 커넥션 풀을 사용하며, 기본 풀의 크기는 `물리적 CPU 코어 수 * 2 + 1` 입니다.

-   **쿼리 생명주기**:
    1.  `prisma.user.findMany()` 같은 쿼리가 실행되면, Prisma Client는 커넥션 풀에 연결을 요청합니다.
    2.  사용 가능한 연결이 있으면 즉시 "대여(checkout)"하여 쿼리를 실행합니다.
    3.  쿼리가 완료되면, 연결은 즉시 풀에 "반납(check-in)"되어 다른 요청이 사용할 수 있도록 대기합니다.
    4.  만약 모든 연결이 사용 중이라 풀이 비어있으면, 해당 쿼리는 다른 연결이 반납될 때까지 **대기열(queue)**에서 기다립니다.

### 커넥션 풀/타임아웃 설정: `connection_limit`과 `pool_timeout`

이 두 파라미터는 `.env` 파일의 `DATABASE_URL`에 추가하여 설정합니다.

```env
# .env
DATABASE_URL=
`

#### `connection_limit`: 풀의 최대 연결 수

-   **개념**: 풀이 가질 수 있는 최대 연결의 개수입니다.
-   **언제 조절해야 할까?**
    -   **서버리스 환경 (Vercel, AWS Lambda 등)**: 각 함수 호출이 별도의 커넥션 풀을 만들 수 있어 DB의 최대 연결 수를 쉽게 초과할 수 있습니다. 이때는 `connection_limit`을 의도적으로 낮게 (예: `5` 또는 `10`) 설정하여 DB를 보호해야 합니다.
    -   **높은 동시성 트래픽**: 동시에 수백, 수천 개의 요청이 들어와 기본 풀 크기로는 감당이 안 될 때 조절을 고려합니다.
    -   **DB의 `max_connections` 초과 우려**: 데이터베이스 자체도 동시에 받을 수 있는 연결 수에 한계가 있습니다. 여러 개의 앱 서버 인스턴스를 운영한다면, `(인스턴스 수) * (connection_limit)`이 DB의 `max_connections`를 넘지 않도록 신중하게 산정해야 합니다.

> **⚠️ 주의**: `connection_limit`을 무작정 높이는 것은 해결책이 아닙니다. 이는 애플리케이션과 데이터베이스 서버 양쪽의 메모리 사용량을 증가시키고, 문제의 원인을 다른 곳으로 옮길 뿐일 수 있습니다.

#### `pool_timeout`: 풀 대기열의 타임아웃

-   **개념**: 대기열에 들어간 쿼리가 사용 가능한 연결을 얻기 위해 **최대로 기다릴 수 있는 시간(초 단위)**입니다.
-   **기본값**: **10초**.
-   **타임아웃 발생**: 10초가 지나도 풀에서 연결을 할당받지 못하면, Prisma는 `P2024` 에러(`Timed out fetching a connection from the pool.`)를 발생시키고 해당 요청을 실패 처리합니다. 이는 특정 요청 하나가 전체 시스템을 마비시키는 것을 방지하는 중요한 안전장치입니다.

> **⚠️ 경고**: `pool_timeout`을 늘리는 것은 임시방편일 뿐, 근본적인 해결책이 아닐 가능성이 높습니다. 이는 사용자가 응답을 받기까지 더 오래 기다리게 만들어, 오히려 서비스 품질을 저하시킬 수 있습니다. 타임아웃이 발생했다면, 시간을 늘리기 전에 **느린 쿼리가 없는지**, `connection_limit`이 트래픽에 비해 너무 작은 것은 아닌지 등 **근본 원인**을 먼저 분석해야 합니다.

---

## 3. 쿼리 최적화와 인덱싱 (Indexing): 성능의 핵심

Prisma는 효율적인 쿼리를 생성하지만, 프로덕션 규모의 데이터(수백만 건 이상)를 다룰 때는 데이터베이스 스키마 설계가 성능을 좌우합니다. 특히 **인덱싱(Indexing)**은 가장 중요한 성능 최적화 기법입니다.

### 인덱스(Index)란?

책 맨 뒤의 '찾아보기'와 같습니다. 특정 단어를 찾기 위해 책 전체를 뒤지는 대신(Full Table Scan), '찾아보기'에서 해당 단어가 있는 페이지 번호를 바로 찾아가는 원리입니다. 데이터베이스 인덱스는 특정 컬럼의 데이터를 빠르게 찾을 수 있도록 미리 정렬된 포인터 목록을 만들어 둡니다.

### 왜 중요한가?

- **압도적인 성능 차이**: 인덱스가 없는 컬럼에 대한 검색은 데이터가 많아질수록 기하급수적으로 느려져 수 초에서 수 분까지 걸릴 수 있습니다. 반면, 인덱스가 있는 컬럼에 대한 검색은 데이터 양에 크게 관계없이 수 밀리초(ms) 내에 완료될 수 있습니다.
- **데이터베이스 부하 감소**: 쿼리가 빨라진다는 것은 DB 서버의 CPU와 I/O 사용량이 줄어든다는 의미이며, 이는 더 많은 동시 요청을 안정적으로 처리할 수 있게 해줍니다.

### Prisma에서 인덱스 추가하기

`schema.prisma` 파일에서 간단하게 인덱스를 정의하고, 마이그레이션을 통해 실제 데이터베이스에 적용할 수 있습니다.

#### 1. 단일 컬럼 인덱스

가장 일반적인 형태로, 특정 컬럼 하나에 인덱스를 설정합니다.

- `@unique`: 자동으로 고유 인덱스(Unique Index)를 생성합니다.
- `@@index([컬럼명])`: 일반 인덱스(Non-unique Index)를 생성합니다. `WHERE` 절에 자주 사용되는 컬럼에 설정합니다.

```prisma
// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique // email은 고유해야 하며, 자동으로 인덱스가 생성됩니다.
  name  String
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int

  // 특정 사용자의 게시글을 찾는 쿼리(WHERE authorId = ... )가 많을 것이므로
  // authorId 컬럼에 인덱스를 추가합니다.
  @@index([authorId])
}
```

#### 2. 복합 인덱스 (Composite Index)

두 개 이상의 컬럼을 조합하여 인덱스를 만듭니다. 여러 컬럼을 동시에 `WHERE` 절에서 필터링하는 경우에 유용합니다.

```prisma
// schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  authorId  Int
  published Boolean  @default(false)

  // 특정 사용자의 '공개된' 게시물만 찾는 쿼리가 많은 경우
  // 예: WHERE authorId = ? AND published = true
  @@index([authorId, published])
}
```

### 인덱스 적용하기

`schema.prisma` 파일을 수정한 후, 마이그레이션을 통해 데이터베이스에 변경사항을 적용해야 합니다.

```bash
# 인덱스 추가에 대한 마이그레이션 파일 생성 및 적용
npx prisma migrate dev --name add_indexes_to_post_table
```

### 쿼리 분석의 첫걸음: 환경별 로깅 전략

인덱스를 추가한 후에는, 실제로 쿼리가 인덱스를 잘 활용하는지, 그리고 불필요한 쿼리가 실행되지는 않는지 확인하는 것이 중요합니다. 이를 위해 Prisma의 로깅 기능을 활용하되, **개발 환경과 프로덕션 환경의 전략을 반드시 다르게 가져가야 합니다.**

#### 1. 개발 환경 (Development)에서의 로깅

-   **목표**: **최대한 상세하고 즉각적인 피드백.** 내가 작성한 Prisma 코드가 어떤 SQL로 변환되는지, 잠재적인 문제는 없는지 등을 모두 확인하여 빠르게 개발하고 디버깅하는 것이 중요합니다.
-   **추천 수준**: `['query', 'info', 'warn', 'error']`
    -   `query`: **(가장 중요)** 실행되는 모든 SQL 쿼리를 콘솔에 출력합니다.
    -   `info`: Prisma Client 연결, 마이그레이션 등 주요 동작 정보를 알려줍니다.
    -   `warn`: 잠재적인 성능 저하 이슈나 잘못된 API 사용법을 경고합니다.
    -   `error`: 명백한 에러를 표시합니다.
-   **설정 예시**:
    ```javascript
    // 개발 환경에서 PrismaClient 초기화 시
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    ```

#### 2. 프로덕션 환경 (Production)에서의 로깅

-   **목표**: **성능 저하 최소화, 핵심 문제만 기록, 민감 정보 노출 방지.**
-   **추천 수준**: `['warn', 'error']`
    -   `warn`: 서비스 안정성에 영향을 줄 수 있는 잠재적인 문제들을 기록합니다.
    -   `error`: 실제 운영에 장애를 일으키는 심각한 문제들만 기록하여, 문제 발생 시 원인을 빠르게 파악하고 대응할 수 있게 합니다.

-   **⚠️ 왜 프로덕션에서 `query` 로그를 절대 사용하면 안 되나요?**
    1.  **성능 저하**: 모든 요청의 SQL을 기록하는 것은 상당한 I/O 부하를 유발하여 애플리케이션의 전체적인 성능을 떨어뜨립니다.
    2.  **보안 위험**: 쿼리 로그에는 사용자의 개인정보 등 민감한 데이터가 포함될 수 있습니다. 이 로그가 외부에 유출되면 심각한 보안 사고로 이어질 수 있습니다.
    3.  **비용 증가**: Datadog, Sentry와 같은 외부 로깅 서비스를 사용하는 경우, 방대한 양의 쿼리 로그는 엄청난 비용을 발생시킬 수 있습니다.

#### 3. 환경에 따른 동적 로깅 수준 설정 (Best Practice)

`process.env.NODE_ENV` 환경 변수를 확인하여, `PrismaClient`를 초기화하는 곳에서 동적으로 로그 레벨을 설정하는 것이 가장 좋은 방법입니다.

```javascript
// src/config/prisma.js 또는 PrismaClient를 초기화하는 파일

import { PrismaClient } from '@prisma/client';

// NODE_ENV 환경 변수에 따라 로그 레벨을 동적으로 설정
const getPrismaLogLevel = () => {
  if (process.env.NODE_ENV === 'production') {
    return ['warn', 'error'];
  }
  // 개발 환경이나 다른 환경에서는 모든 로그를 활성화
  return ['query', 'info', 'warn', 'error'];
};

export const prisma = new PrismaClient({
  log: getPrismaLogLevel(),
});
```

#### 4. `EXPLAIN ANALYZE`를 이용한 심층 분석

`query` 로그를 통해 비효율적으로 보이는 쿼리를 발견했다면, PostgreSQL 같은 DB에서 제공하는 `EXPLAIN ANALYZE` 명령어를 사용하여 심층 분석을 할 수 있습니다. 이 명령어는 특정 쿼리가 어떤 실행 계획(Execution Plan)을 통해 동작하고, 우리가 만든 인덱스를 잘 활용하고 있는지 등을 직접 확인할 수 있게 해주는 강력한 도구입니다.

---

## 4. Graceful Shutdown (서버 정상 종료)

서버를 재시작하거나 업데이트할 때, 실행 중이던 요청이 갑자기 끊기면 데이터 정합성이 깨질 수 있습니다. **Graceful Shutdown**은 서버 종료 신호(`SIGTERM`)를 받았을 때, 새로운 요청은 더 이상 받지 않고 현재 진행 중인 모든 요청이 완료될 때까지 기다린 후, 데이터베이스 연결을 안전하게 끊고 프로세스를 종료하는 과정입니다.

**`src/server.js`에 Graceful Shutdown 로직 추가**
```javascript
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient(); // Prisma Client 인스턴스화

// ... app.use() 등 미들웨어 설정 ...

const server = app.listen(3000, () => {
  console.log('Server is running...');
});

// Graceful Shutdown 로직
const gracefulShutdown = async () => {
  console.log('👋 Shutting down gracefully...');
  
  // 1. 서버가 더 이상 새로운 요청을 받지 않도록 합니다.
  server.close(async () => {
    console.log('🚫 HTTP server closed.');
    
    // 2. Prisma 클라이언트의 연결을 끊습니다.
    await prisma.$disconnect();
    console.log('🍃 Prisma client disconnected.');
    
    // 3. 프로세스를 종료합니다.
    process.exit(0);
  });

  // 만약 일정 시간 내에 연결이 안끊기면 강제 종료
  setTimeout(() => {
    console.error('💥 Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10초
};

// 운영체제의 종료 신호(SIGTERM, SIGINT)에 반응
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown); // Ctrl+C
```

---

## 5. 환경별 설정 관리

프로덕션 환경에서는 개발 환경과 다른 데이터베이스, 다른 비밀키를 사용해야 합니다. 이러한 정보는 코드에 하드코딩하지 않고, **환경 변수**를 통해 주입하는 것이 원칙입니다.

- **`DATABASE_URL`**: 프로덕션용 데이터베이스 주소를 환경 변수로 설정합니다.
- **`JWT_SECRET`**: 프로덕션용 JWT 비밀키를 환경 변수로 설정합니다.
- **`.env` 파일**: 이 파일은 개발용으로만 사용하며, **절대 `git`에 커밋해서는 안 됩니다.** `.gitignore` 파일에 `.env`가 포함되어 있는지 항상 확인하세요.

프로덕션 환경에서는 `Heroku`, `AWS`, `Vercel` 등 호스팅 서비스의 설정 페이지에서 직접 환경 변수를 주입하여 사용합니다.