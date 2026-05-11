# 실습: 03. 마이그레이션과 시딩

`02-schema-challenge`에서 완성한 스키마(`User`, `Post`, `Comment`)를 실제 데이터베이스에 적용하고, `User`, `Post`, `Comment`의 관계를 고려하여 테스트용 초기 데이터를 삽입하는 방법을 학습합니다.

## 🎯 학습 목표

- `prisma migrate dev`를 사용하여 스키마 변경사항을 DB에 적용할 수 있다.
- `seed` 스크립트를 작성하고 실행하여, 관계가 있는 여러 모델의 데이터를 생성할 수 있다.
- `npx prisma migrate reset` 명령어를 사용하여 DB를 초기화하고 시딩을 다시 실행하는 방법을 이해한다.

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
  - [ ] Faker.js를 개발 의존성으로 설치했나요?
    ```bash
    npm install -D @faker-js/faker
    ```

### 1단계: 데이터베이스 스키마 적용하기

**새로운 데이터베이스를 사용하는 경우 (마이그레이션 방식)**

- [ ] `npx prisma migrate dev --name init`로 데이터베이스 테이블을 생성했나요?

  **기존 데이터베이스를 계속 사용하는 경우 (DB Push 방식)**

  - [ ] 스키마 상태를 확인했나요? `npx prisma validate`
  - [ ] 스키마를 데이터베이스에 적용했나요? `npx prisma db push`
  - [ ] Prisma Client를 업데이트했나요? `npx prisma generate`

**공통 확인사항**

- [ ] DB 관리 도구를 사용하여, 세 개의 테이블(`User`, `Post`, `Comment`)이 모두 잘 생성되었는지 직접 확인해 보세요.

### 2단계: 시딩 스크립트 작성 및 설정

- [ ] `scripts/seed.js` 파일을 생성하고, Faker.js를 사용하여 `User`와 `Post` 데이터를 생성하는 코드를 먼저 작성하세요.

  ```javascript
  // scripts/seed.js
  import { PrismaClient } from '@prisma/client';
  import { faker } from '@faker-js/faker';
  const prisma = new PrismaClient();

  async function main() {
    const NUM_USERS_TO_CREATE = 5; // 생성할 유저 수
    console.log('🌱 시딩 시작...');

    // 랜덤 유저 생성
    const usersPromises = Array.from({ length: NUM_USERS_TO_CREATE }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
        },
      }),
    );

    const users = await Promise.all(usersPromises);

    // 각 유저가 1-3개의 포스트 작성
    const allPosts = [];
    for (const user of users) {
      const postCount = faker.number.int({ min: 1, max: 3 });
      const postPromises = Array.from({ length: postCount }).map(() =>
        prisma.post.create({
          data: {
            title: faker.lorem.sentence({ min: 3, max: 8 }),
            content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
            authorId: user.id,
          },
        }),
      );

      const userPosts = await Promise.all(postPromises);
      allPosts.push(...userPosts);
    }

    // ... 이어서 Comment 생성 코드를 작성합니다.
  }
  // ... main 함수 호출부
  ```

- [ ] `package.json`에 `prisma.seed` 경로를 설정하세요.
  ```json
  "prisma": {
    "seed": "node scripts/seed.js"
  }
  ```

### 3단계: 시딩 스크립트 확장 (Challenge)

- [ ] `scripts/seed.js`의 `main` 함수에, 위에서 생성한 `users`와 `posts` 배열을 사용하여 `Comment` 데이터를 생성하는 코드를 추가하세요.
- [ ] Faker.js를 활용하여 각 포스트마다 0-5개의 랜덤한 댓글을 생성하되, 다른 사용자들이 작성하도록 구현하세요.
- [ ] 댓글 내용도 `faker.lorem.sentence()` 또는 `faker.lorem.paragraph()`를 사용하여 현실적으로 생성하세요.

### 4단계: 시딩 실행 및 확인

- [ ] `npm run seed` 명령어를 실행하여 데이터가 정상적으로 삽입되는지 확인하세요.
- [ ] DB 관리 도구에서 `User`, `Post`, `Comment` 테이블에 데이터가 모두 잘 들어갔는지 확인하세요.

---

## 📚 개념 정리

- **관계 데이터 시딩**: `Comment`처럼 다른 모델(`User`, `Post`)에 의존하는 데이터를 생성할 때는, 부모 모델(`User`, `Post`)이 먼저 생성되어야 합니다. `await` 키워드를 사용하여 부모 데이터 생성이 완료되고, 그 결과로 반환된 객체에서 `id` 값을 가져와 자식 데이터(`Comment`)의 외래 키(`authorId`, `postId`) 값으로 사용해야 합니다.
- **`prisma migrate reset`**: 이 명령어는 데이터베이스를 완전히 초기화하고, 모든 마이그레이션을 처음부터 다시 적용한 뒤, 시드 스크립트까지 실행해주는 매우 유용한 명령어입니다. 스키마나 시드 스크립트를 변경하며 테스트할 때, 이 명령 하나로 DB를 깨끗한 상태로 되돌릴 수 있습니다.

---

## ✅ 완료 확인사항

- [ ] `prisma/migrations` 폴더 안에 `...init_user_post_comment` 마이그레이션 폴더가 생성되었나요?
- [ ] `scripts/seed.js` 파일에 `User`, `Post`, `Comment`를 모두 생성하는 코드가 작성되었나요?
- [ ] `npm run seed` 실행 시 오류 없이 "데이터 시딩 완료" 메시지가 출력되나요?
- [ ] DB 테이블을 확인했을 때, 모든 데이터가 관계에 맞게 잘 삽입되었나요?

---

## 💡 팁

챌린지가 어렵다면 아래 완성 코드를 참고하세요.

<details>
<summary><b>👉 완성된 Faker.js Comment 시딩 코드 보기</b></summary>

```javascript
// scripts/seed.js - main 함수 내부

// ... User, Post 생성 코드 이후 ...

// 각 포스트에 랜덤 댓글 생성 (0-5개)
for (const post of allPosts) {
  const commentCount = faker.number.int({ min: 0, max: 5 });
  const commentPromises = Array.from({ length: commentCount }).map(() => {
    const randomUser =
      users[faker.number.int({ min: 0, max: users.length - 1 })];
    return prisma.comment.create({
      data: {
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        authorId: randomUser.id,
        postId: post.id,
      },
    });
  });

  await Promise.all(commentPromises);
}

console.log('✅ 데이터 시딩 완료');
```

</details>

## 전체 코드 보기

// /scripts/seed.js

```js
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  const NUM_USERS_TO_CREATE = 5; // 생성할 유저 수
  console.log('🌱 시딩 시작...');

  // 랜덤 유저 생성
  const usersPromises = Array.from({ length: NUM_USERS_TO_CREATE }).map(() =>
    prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    }),
  );

  const users = await Promise.all(usersPromises);

  // 각 유저가 1-3개의 랜덤 포스트 작성
  const allPosts = [];
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 3 });
    const postPromises = Array.from({ length: postCount }).map(() =>
      prisma.post.create({
        data: {
          title: faker.lorem.sentence({ min: 3, max: 8 }),
          content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
          authorId: user.id,
        },
      }),
    );

    const userPosts = await Promise.all(postPromises);
    allPosts.push(...userPosts);
  }

  // 각 포스트에 랜덤 댓글 생성 (0-5개)
  for (const post of allPosts) {
    const commentCount = faker.number.int({ min: 0, max: 5 });
    const commentPromises = Array.from({ length: commentCount }).map(() => {
      const randomUser =
        users[faker.number.int({ min: 0, max: users.length - 1 })];
      return prisma.comment.create({
        data: {
          content: faker.lorem.sentences({ min: 1, max: 3 }),
          authorId: randomUser.id,
          postId: post.id,
        },
      });
    });

    await Promise.all(commentPromises);
  }

  const totalComments = await prisma.comment.count();
  console.log(`✅ ${users.length}명의 유저가 생성되었습니다`);
  console.log(`✅ ${allPosts.length}개의 게시글이 생성되었습니다`);
  console.log(`✅ ${totalComments}개의 댓글이 생성되었습니다`);
  console.log('✅ 데이터 시딩 완료');
}

main()
  .catch((e) => {
    console.error('❌ 시딩 에러:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
