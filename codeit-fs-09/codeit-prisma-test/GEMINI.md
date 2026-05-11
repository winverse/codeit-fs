# JavaScript와 관계형 데이터베이스 마스터 과정

안녕하세요! 10년 넘게 실무에서 클린 코드와 함수형 프로그래밍 원칙을 고수하며 개발해 온 개발자입니다. 현재는 그 경험을 바탕으로 주니어 개발자분들이 좋은 습관을 통해 성장할 수 있도록 돕는 학원 강사로 일하고 있습니다.

이 문서는 JavaScript와 관계형 데이터베이스(PostgreSQL), 그리고 Prisma를 배우는 과정을 체계적으로 정리한 커리큘럼 가이드입니다. 제 개발 철학에 따라, 단순히 기능을 배우는 것을 넘어 "왜?"라는 질문을 항상 던지며, 각 기술의 본질을 이해하고 깔끔하고 유지보수하기 좋은 코드를 작성하는 데 초점을 맞출 것입니다.

---

# Express.js 프로젝트 구조 가이드

이 문서는 과정 전반에 걸쳐 사용할 Express.js 기반 백엔드 프로젝트의 표준 폴더 구조와 개발 가이드라인을 설명합니다.

## 📁 프로젝트 구조 (기능별 아키텍처)

```
src/
├── config/          # 환경설정 (환경변수 검증, 데이터베이스 연결)
├── repository/      # 데이터 접근 계층 (DB CRUD 작업)
├── middlewares/     # 공통 미들웨어 (로깅, 에러처리)
├── routes/          # API 라우터 정의
│   ├── index.js     # 모든 라우터를 통합
│   └── users.js     # User 리소스 라우터
├── validators/      # DTO 유효성 검사 스키마
├── utils/           # 재사용 가능한 유틸리티 함수
├── errors/          # 커스텀 에러 클래스
└── server.js        # 서버 진입점
prisma/
└── schema.prisma    # Prisma 스키마 파일
scripts/
└── seed.js          # 데이터베이스 시딩 스크립트
```

## 📂 폴더별 역할과 책임

- **`config/`**: 환경변수 검증, 데이터베이스 연결 설정 등 프로젝트의 전반적인 설정을 담당합니다.
- **`prisma/`**: Prisma와 관련된 모든 파일을 관리합니다. 데이터베이스 테이블 구조를 정의하는 **`schema.prisma`** 파일이 여기에 위치합니다.
- **`scripts/`**: 데이터베이스 시딩, 마이그레이션 등의 유틸리티 스크립트를 담당합니다. **`seed.js`** 파일로 초기 데이터를 삽입합니다.
- **`repository/`**: 데이터베이스에 직접 접근하여 데이터를 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)하는 로직을 담당합니다. Prisma Client를 사용하는 부분이 바로 여기입니다.
- **`middlewares/`**: 요청이 실제 로직에 도달하기 전후에 필요한 공통 작업(로깅, 에러 핸들링 등)을 처리합니다.
- **`routes/`**: API의 엔드포인트(URL)를 정의하고, 해당 엔드포인트로 요청이 왔을 때 어떤 로직을 실행할지 연결해줍니다.
- **`validators/`**: `zod` 등을 사용하여 API 요청 데이터(DTO)의 유효성을 검사하는 스키마를 정의합니다.
- **`utils/`**: JWT, 암호화, 쿠키 처리 등 특정 도메인에 종속되지 않는 재사용 가능한 함수들을 관리합니다.
- **`errors/`**: `BadRequestError`, `NotFoundError` 등 예측 가능한 에러 상황을 클래스로 만들어 일관성 있게 관리합니다.
- **`server.js`**: Express 애플리케이션을 생성하고, 미들웨어를 설정하며, 서버를 시작하는 진입점 파일입니다.

## 🔧 개발 가이드라인

### 1. 파일명 규칙 (Naming Convention)

- **라우터 (Router):** **복수형**을 사용합니다. 해당 파일이 다루는 리소스 컬렉션의 이름을 따릅니다.

  - 예: `routes/users.js`, `routes/posts.js`

- **그 외 도메인 파일 (Repository, Service 등):** **단수형**을 사용합니다. 해당 파일이 다루는 핵심 모델(엔티티)의 이름을 따릅니다.
  - 예: `repository/user.repository.js`, `repository/post.repository.js`

### 2. ES 모듈 시스템 (ES Modules)

- `import/export` 구문을 사용합니다.
- `package.json`에 `"type": "module"` 설정이 필수입니다.

### 3. Import 경로 규칙

- 다른 폴더의 파일을 가져올 때는 명확한 상대 경로를 사용합니다.

```javascript
// 예시: routes에서 repository 가져오기
import { userRepository } from "../repository/user.repository.js";
```

## ️ 코드 스타일 및 린팅 설정

(내용 생략 - 이전과 동일)

## 📋 개발 워크플로우

(내용 생략 - 이전과 동일)

---

## 📖 강의 진행 방식 (Evolving Project)

이 강의는 **하나의 프로젝트가 각 단계를 거치며 점진적으로 완성되는(Evolving Project)** 방식으로 진행됩니다.

### 🎯 전체 구조 이해

**각 폴더의 역할:**

- **강사 시연 폴더 (`[번호]-[주제]`)**: 해당 폴더의 `README.md`에 명시된 내용을 **완성된 상태로** 구현한 예시 코드
- **학생 실습 폴더 (`[번호]-[주제]-challenge`)**: 강사 시연 폴더의 완성된 코드를 시작점으로, 추가 기능을 구현하는 과제

### 🔄 흐름 예시

```
04-crud (강사 시연 완성)
    ↓ 복사하여 시작
05-relations (강사 시연 완성)
    ↓ 복사하여 시작
05-relations-challenge (학생 실습 + 확장)
    ↓ 완성본이 다음 시작점
06-real-world-example (강사 시연)
    ↓
06-real-world-example-challenge (학생 실습)
    ↓
07-advanced-queries-challenge (학생 실습만)
```

### ✅ 핵심 원칙

1. **강사 시연 폴더**: 해당 `README.md` 내용을 **정확히** 완성 (임의 추가 금지)
2. **챌린지 폴더**: 기존 완성본에서 **추가 확장**만 수행
3. **README.md 준수**: 각 폴더의 README.md가 **그 폴더의 완성 기준**

> **참고:** 이 방식을 통해 학생들은 실제 개발처럼 기존 코드 베이스를 확장하고, 각 기능이 어떻게 유기적으로 연결되는지 자연스럽게 학습하게 됩니다.

---

# 1. 관계형 데이터베이스 기본기

(내용 생략 - 기존과 동일)

---

# 2. Prisma 기본기 배워보기

_각 레슨은 강사 시연 폴더(`[번호]-[주제]`)와 학생 실습 폴더(`[번호]-[주제]-challenge`)로 구성됩니다._

---

## 2-1. Setup

- **`01-setup`**: 프로젝트 초기 설정 및 Prisma 설치를 시연합니다.
- **`01-setup-challenge`**: 시연 내용을 바탕으로 프로젝트 초기 설정을 스스로 진행하는 과제를 수행합니다.

## 2-2. Prisma 스키마: 모델과 관계 정의

- **`02-schema`**: `User`와 `Post` 모델 및 관계를 스키마에 추가하는 방법을 시연합니다.
- **`02-schema-challenge`**: 시연 내용을 복습하고, 추가로 `Comment` 모델을 설계하는 과제를 수행합니다.

## 2-3. 마이그레이션과 시딩(Seeding)

- **`03-migration-seeding`**: `migrate`와 `seed` 명령어를 사용하여 DB를 구축하고 초기 데이터를 삽입하는 과정을 시연합니다.
- **`03-migration-seeding-challenge`**: 시연 내용을 복습하고, `Comment` 모델에 대한 시딩 스크립트를 작성하는 과제를 수행합니다.

## 2-4. Prisma Client 기본: CRUD 마스터하기

- **`04-crud`**: `User` 모델에 대한 CRUD API를 구현하는 방법을 시연합니다.
- **`04-crud-challenge`**: 시연 내용을 복습하고, `Post` 모델에 대한 CRUD API를 직접 구현하는 과제를 수행합니다.

## 2-5. Prisma Client 심화: 관계 쿼리와 N+1 문제

- **`05-relations`**: `include`를 활용한 관계 데이터 조회 및 N+1 문제 해결 방법을 시연합니다.
- **`05-relations-challenge`**: 시연 내용을 복습하고, 게시글 조회 시 댓글과 작성자 정보를 함께 가져오는 API를 구현하는 과제를 수행합니다.

## 2-6. 실전 예제와 연습

- **`06-real-world-example`**: User-Post-Comment의 복합 관계 모델링과 실무 패턴을 시연합니다.
- **`06-real-world-example-challenge`**: 시연 내용을 복습하고, 실제 블로그 시스템의 댓글 기능을 완성하는 과제를 수행합니다.

## 2-7. 고급 쿼리: 필터링, 정렬, 페이지네이션

- **`07-advanced-queries`**: `where`, `orderBy`, `take`, `skip` 등 고급 쿼리 옵션을 시연합니다.
- **`07-advanced-queries-challenge`**: 시연 내용을 복습하고, 게시글 목록 API에 고급 검색 기능을 추가하는 과제를 수행합니다.

## 2-8. (심화) 트랜잭션(Transactions) 처리

- **`08-transactions`**: `$transaction` API를 사용한 원자적 데이터 처리 방법을 시연합니다.
- **`08-transactions-challenge`**: 시연 내용을 복습하고, 복합 비즈니스 로직에 트랜잭션을 적용하는 과제를 수행합니다.

## 2-9. 인증 및 인가 (Authentication & Authorization)
- **`09-authentication`**: JWT, 쿠키, bcrypt를 사용한 인증의 핵심 유틸리티와 미들웨어를 구현합니다.
- **`09-authentication-challenge`**: 준비된 유틸리티와 미들웨어를 사용하여 실제 회원가입, 로그인 API 등을 완성합니다.

## 2-10. 에러 핸들링과 검증
- **`10-error-handling-validation`**: 중앙 에러 핸들링 미들웨어와 `zod`를 이용한 유효성 검사 패턴을 시연합니다.
- **`10-error-handling-validation-challenge`**: 기존 코드에 중앙 에러 핸들러와 유효성 검사를 적용하여 리팩토링합니다.

## 2-11. 리팩토링 (Refactoring)
- **`11-refactoring`**: 코드의 가독성과 유지보수성을 높이는 리팩토링 기법을 학습합니다. (내용 추후 정의)
- **`11-refactoring-challenge`**: 학습한 내용을 바탕으로 실제 코드 리팩토링을 진행합니다. (내용 추후 정의)

## 2-12. Production을 위한 Prisma
- **`12-production`**: `prisma migrate deploy`, 커넥션 풀링, Graceful Shutdown 등 프로덕션 운영에 필요한 개념을 시연합니다.
- **`12-production-challenge`**: 실제 코드에 Graceful Shutdown 로직과 프로덕션용 스크립트를 추가합니다.
