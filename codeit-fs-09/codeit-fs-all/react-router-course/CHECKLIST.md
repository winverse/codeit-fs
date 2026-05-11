# React Router 강의 코스 검증 체크리스트 (GEMINI.md 기반)

이 문서는 `GEMINI.md` 가이드라인에 따라 전체 강의 코스의 일관성과 품질을 검증하기 위해 사용됩니다.

## 1. 챕터별 종합 검증 현황

각 챕터별로 아래 상세 기준을 모두 충족할 경우 체크박스를 표시([x])하세요.

| 챕터 (Chapter) | 폴더 구조 | 공통 검증 | `s` → `sol` | `challenge` | 종합 확인 | 비고 (Notes) |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| 01-basic-routing | [x] | [x] | [x] | [x] | [x] | 완료 |
| 02-nested-routes | [x] | [x] | [x] | [x] | [x] | 완료 |
| 03-dynamic-routes | [x] | [x] | [x] | [x] | [x] | 완료 |
| 04-not-found-and-redirect | [x] | [x] | [x] | [x] | [x] | 완료 |
| 05-search-params | [x] | [x] | [x] | [x] | [x] | 완료 |
| 06-programmatic-navigation | [x] | [ ] | [x] | [x] | [ ] | CSS Modules 미사용 |
| 07-dynamic-head | [x] | [ ] | [x] | [x] | [ ] | CSS Modules 미사용 및 인라인 스타일 사용 |

---

## 2. 상세 검증 항목

### 2.1. 챕터 폴더 구조 (`[챕터명]/`)
- [ ] `starter`, `solution`, `challenge` 폴더가 모두 존재하는가?
- [ ] 챕터 `README.md` 파일이 존재하는가?
- [ ] 챕터 `README.md` 파일에 필수 목차(학습 목표, 주요 개념, 강의 시연 스크립트)가 포함되어 있는가?

### 2.2. `starter`, `solution`, `challenge` 공통 검증

- **프로젝트 설정 파일**
  - [ ] `jsconfig.json` 파일이 존재하며, 표준 설정(경로 별칭 등)과 일치하는가?
  - [ ] `vite.config.js` 파일이 존재하며, 표준 설정(경로 별칭 등)과 일치하는가?
  - [ ] `package.json`, `.prettierrc`, `src/main.jsx` 등 기타 필수 파일이 존재하는가?

- **코드 스타일 및 컨벤션 (`GEMINI.md` 1항)**
  - [ ] 스타일링에 CSS Modules(`.module.css`)를 사용하고, 인라인 스타일을 지양하는가?
  - [ ] `export default` 대신 `export function` (Named Export)을 사용하는가?
  - [ ] 컴포넌트와 훅을 `function` 키워드로 선언하는가? (화살표 함수 지양)
  - [ ] 파일 및 폴더 명명 규칙(컴포넌트: `PascalCase`, 훅: `useCamelCase` 등)을 준수하는가?

- **품질 관리 (`GEMINI.md` 5항)**
  - [ ] `npm run build` 명령어가 에러 없이 성공하는가?

### 2.3. `starter` → `solution` 검증
- [ ] **강의 시연 스크립트 정확성**: 챕터 `README.md`의 '강의 시연 스크립트'를 `starter` 프로젝트에 순서대로 적용했을 때, 그 결과가 `solution` 프로젝트의 코드와 정확히 일치하는가?
  - *💡 참고: CSS나 스타일링 관련 코드는 학습 핵심 내용이 아니므로, `starter`에 미리 포함되어 있어야 한다.*

### 2.4. `challenge` 프로젝트 검증 (`GEMINI.md` 2.1항)
- [ ] `challenge` 폴더 내에 별도의 `README.md` 파일이 존재하는가?
- [ ] `challenge` 폴더 내에 별도의 `해설강의.md` 파일이 존재하는가?
- [ ] `challenge/README.md`에 '해야 할 일', '확인하기' 항목이 명확하게 제시되어 있는가?
- [ ] 코드 내에 해당 챕터의 핵심 학습 목표와 관련된 명확한 `// TODO:` 주석이 포함되어 있는가?
- [ ] 프로젝트가 해당 챕터의 특정 개념만 연습할 수 있도록 최소한의 기능으로 구성되어 있는가?
- [ ] **실습 내용 차별성**: `challenge` 프로젝트의 내용(코드, 구조 등)이 `starter` 프로젝트와 의미 있는 차이가 있는가? (단순 복사본이 아닌가?)
