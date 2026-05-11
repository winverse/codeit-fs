# Codeit 강의 프로젝트 가이드라인

## 0. 전체 프로젝트 구조 원칙

모든 강의 자료는 일관된 프로젝트 구조를 유지하여 관리의 효율성을 높입니다. `codeit-fullstack-react-fetch` 프로젝트의 구조를 표준으로 삼습니다.

### 기본 구조

- **`[강의명]-course/`**: 특정 기술(예: `react-router`, `redux`, `zustand`)에 대한 최상위 강의 폴더입니다.
    - **`01-[챕터명]/`**: 각 챕터별 폴더입니다.
        - **`starter/`**: 해당 챕터의 **강의 시연 시작** 코드가 담긴 Vite 프로젝트입니다.
        - **`solution/`**: 해당 챕터의 **강의 시연 완료** 코드가 담긴 Vite 프로젝트입니다.
        - **`challenge/`**: 학생들의 **응용 실습 과제** 코드가 담긴 Vite 프로젝트입니다.
        - **`README.md`**: 해당 챕터의 학습 목표, 강의 스크립트, 챌린지 과제를 포함하는 가이드 문서입니다.

### 표준 Vite 프로젝트 구성

각 `starter`, `solution`, `challenge` 폴더는 아래의 표준 구조를 **지향하되, 해당 프로젝트에 필요한 디렉토리만 선택적으로 생성하여 구성합니다.**

```
/
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── jsconfig.json       // 추가
├── vite.config.js
├── public/
│   └── (정적 에셋)
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── assets/
    ├── components/
    │   └── [컴포넌트 이름]/
    │       ├── index.js
    │       ├── [컴포넌트 이름].jsx
    │       └── [컴포넌트 이름].module.css
    ├── contexts/
    ├── data/
    ├── hooks/
    ├── pages/
    │   └── [페이지 이름]/
    │       ├── index.js
    │       ├── [페이지 이름].jsx
    │       └── [페이지 이름].module.css
    ├── providers/
    └── styles/
```

#### `jsconfig.json` 설정

절대 경로 별칭 (`@/*`)을 사용하기 위해, 모든 프로젝트 루트에 아래 내용으로 `jsconfig.json` 파일을 생성합니다.

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

#### `vite.config.js` 설정

`jsconfig.json`의 경로 별칭을 Vite가 인식할 수 있도록, `vite.config.js`를 아래 내용으로 설정합니다.

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

---

## 1. 코드 작성 규칙

모든 강의 프로젝트는 일관된 코드 스타일과 컨벤션을 따릅니다.

### 1.1. 코드 스타일 (Prettier)

모든 Vite 프로젝트(`starter`, `solution`, `challenge`)에는 `.prettierrc` 파일을 포함하여 일관된 코드 포맷팅을 적용합니다.

```json
{
  "printWidth": 80,
  "bracketSpacing": true,
  "trailingComma": "all",
  "semi": true,
  "singleQuote": true
}
```

### 1.2. 기술 스택 및 스타일링

- **스타일링 원칙**: 스타일링은 **CSS Modules (`.module.css`)** 사용을 원칙으로 하며, 컴포넌트 파일 내에서 인라인 스타일(inline style) 객체를 직접 작성하는 방식은 지양합니다.

### 1.3. 코딩 컨벤션

#### Export/Import 패턴

- **Named Export 사용**: `export default` 대신 named export를 사용합니다.

  ```javascript
  // ❌ 사용하지 않음
  export default function HomePage() { ... }

  // ✅ 권장
  export function HomePage() { ... }
  ```

- **Destructured Import**: 해당하는 import 구문도 구조 분해 할당을 사용합니다.

  ```javascript
  // ❌ 사용하지 않음
  import HomePage from "./HomePage";

  // ✅ 권장
  import { HomePage } from "./HomePage";
  ```

#### 함수형 프로그래밍 지향

- **함수형 컴포넌트**: React 컴포넌트는 함수형으로 작성합니다.
- **함수 선언문 사용**: `function` 키워드를 사용한 함수 선언문을 권장합니다.

  ```javascript
  // ✅ 권장
  export function useCustomHook() {
    // hook logic
  }

  export function ComponentName() {
    // component logic
  }
  ```

#### 파일 및 폴더 명명 규칙

- **컴포넌트 파일**: PascalCase + `.jsx` 확장자 (예: `HomePage.jsx`)
- **훅 파일**: camelCase + `use` 접두사 (예: `useCustomHook.js`)
- **유틸리티 함수**: camelCase (예: `formatDate.js`)
- **폴더명**: PascalCase for 컴포넌트/페이지, camelCase for 기타

---

## 2. 공통 폴더 구조 및 역할

각 강의 프로젝트(예: `react-router-course`, `zustand-course`)는 다음의 일관된 폴더 구조를 따릅니다. 이는 강의의 흐름과 학생들의 실습 과정을 체계적으로 지원하기 위함입니다.

- **`starter` & `solution` 폴더 (강의 시연용):**

    - **역할:** 강사의 라이브 코딩 시연을 위한 자료입니다.
    - **`starter`**: 강의 시작 시점의 코드.
    - **`solution`**: 강의를 통해 모든 개념 설명이 끝난 후의 완성된 코드.
    - **프로세스:** 강사는 `starter`에서 출발하여 `solution`을 완성하는 과정을 단계별로 보여주며 핵심 개념과 원리를 설명합니다.

- **`challenge` 폴더 (학생 실습용):**
    - **역할:** 학생들이 해당 챕터에서 배운 **특정 개념만** 간단히 연습할 수 있는 실습 프로젝트입니다.
    - **핵심 원칙:** 복잡한 기능이나 추가 로직 없이, **해당 챕터의 학습 목표에 해당하는 개념만** 집중해서 연습합니다.
    - **내용 특징:**
        - **최소한의 구현**: 해당 챕터에서 배운 특정 개념만 적용할 수 있는 간단한 구조
        - **명확한 TODO**: 학생이 구현해야 할 핵심 부분만 TODO로 표시
        - **불필요한 복잡성 제거**: 해당 챕터 학습 목표와 관련없는 기능이나 로직은 최소화
    - **구성:**
        - **`README.md`**: 해당 챕터에서 배운 개념만 연습할 수 있는 간단한 체크리스트
        - **코드 파일들**: 해당 챕터 학습 내용과 관련된 TODO만 포함된 최소한의 파일들

### 2.1. Challenge 폴더 상세 구성

`challenge` 폴더는 학생들의 자기주도적 학습을 위한 특별한 구조를 가집니다.

#### Challenge README.md 구성

```markdown
# 챌린지: [챕터명] 연습

## 학습 목표
- [해당 챕터에서 배운 핵심 개념 1~3개만 명시]

## 해야 할 일
- [ ] [해당 챕터 학습 내용 관련 핵심 작업 1]
- [ ] [해당 챕터 학습 내용 관련 핵심 작업 2]

## 확인하기
- [ ] [기능 동작 확인 등 간단한 테스트]
```

#### Challenge 코드 파일 구성

- **해당 챕터 핵심 TODO만**: 해당 챕터에서 배운 개념만 구현하도록 안내
  ```jsx
  // TODO: [해당 챕터에서 배운 기능]을 구현하세요
  ```
- **불필요한 복잡성 제거**: 해당 챕터 학습 목표와 관련없는 기능이나 로직은 제외

#### Challenge 스타일링 가이드라인

- **기본 스타일 제공**: 학생이 학습 목표에 집중할 수 있도록 기본적인 스타일링 제공
- **CSS Module 사용**: 각 컴포넌트별로 `.module.css` 파일 제공
- **간단하고 깔끔한 디자인**: 복잡한 스타일링보다는 가독성과 사용성 중심
- **필수 스타일 요소**:
    - 헤더 네비게이션 스타일링 (배경색, 링크 스타일, 호버 효과)
    - 메인 컨텐츠 영역 패딩 및 정렬
    - 페이지별 기본 타이포그래피
    - 폼 요소 기본 스타일링 (해당하는 경우)

---

## 3. 챕터별 `README.md` 구성 가이드

각 챕터의 `README.md` 파일은 다음 형식으로 구성하여 학습 목표와 내용을 명확하게 전달해야 합니다.

- **챕터 제목 (H1):** `# (숫자). (챕터 제목)`
- **챕터 소개 (선택 사항):** 챕터가 다루는 내용과 학습 목표를 간략하게 요약합니다.
- **학습 목표 (H2):** 이 챕터를 통해 학생들이 무엇을 배울 수 있는지 구체적인 항목으로 명시합니다.
- **주요 개념 (H2):** 챕터에서 다루는 핵심 개념들을 간략하게 설명합니다.
    - **심화 학습 (선택 사항):** `💡 심화 학습: (주제)`와 같이 특정 개념에 대한 깊이 있는 이해를 돕는 추가 설명을 포함할 수 있습니다.
- **강의 시연 스크립트 (H2):** 강사가 강의 시연 시 참고할 상세한 스크립트입니다. `starter`에서 `solution`으로 코드를 완성해나가는 과정을, 실제 타이핑할 코드 조각과 함께 단계별로 구체적으로 서술합니다. 요약이 아닌, 강의 진행을 위한 완전한 가이드 역할을 합니다.
    - 💡 **CSS 처리 원칙**: 모든 CSS 스타일링은 학습 핵심 내용이 아니므로 **`starter` 프로젝트에 미리 완성된 상태로 제공**합니다. 따라서, `README.md`의 강의 시연 스크립트에는 **CSS 코드 작성을 포함하지 않습니다.** 강사는 스크립트에 명시된 React/JavaScript 로직 구현에만 집중하며, 이를 따라가면 자연스럽게 `solution`이 완성됩니다.
- **챌린지 과제 (H2):** 학생들이 `challenge` 폴더에서 수행해야 할 미션을 명확하고 구체적으로 제시합니다.
    - **미션 (H3):** 수행할 과제를 단계별로 안내합니다.
    - **확인하기 (H3):** 과제 완료 후 자신의 구현을 검증할 수 있는 방법을 안내합니다.

---

## 4. 강의 방식 원칙

1.  **개념 설명:** 각 강의의 핵심 개념과 "왜" 이러한 기능이 필요한지에 대한 근본 원리를 설명합니다. (예: SPA의 등장 배경, 상태 관리의 필요성 등)
2.  **시연 중심 강의:** `starter`에서 `solution`으로 코드를 완성해나가는 과정을 직접 보여주며, 문제 해결 과정을 생생하게 전달합니다.
3.  **심화 학습 유도:** 학생들이 실습 중 겪는 문제에 대해 단순히 답을 알려주기보다는, "왜?"라는 질문을 통해 스스로 문제의 본질을 파악하고 해결책을 찾아나가도록 유도합니다.
4.  **응용을 통한 체화:** 강의 시연 후, `challenge` 과제를 통해 학생들이 배운 내용을 스스로 응용하며 지식을 자신의 것으로 만들도록 합니다.
5.  **솔루션 비교 및 피드백:** 실습 완료 후, 학생들은 자신의 코드와 `solution` 또는 `challenge`의 완성 코드를 비교하며 학습 내용을 점검하고, 강사님은 추가적인 피드백과 심화 설명을 제공합니다.

이러한 방식은 학생들이 특정 라이브러리의 사용법뿐만 아니라 그 배경과 원리를 깊이 이해하는 데 큰 도움이 될 것입니다.

---

## 5. 프로젝트 품질 관리

### 5.1. 빌드 테스트 필수

각 챕터를 완료한 후에는 **반드시** 모든 버전(`starter`, `solution`, `challenge`)에 대해 빌드 테스트를 수행하여 프로덕션 배포 가능성을 검증해야 합니다.

#### 빌드 테스트 절차

1. **각 프로젝트별 빌드 테스트:**
   ```bash
   # starter 프로젝트 빌드 테스트
   cd [챕터]/starter
   npm install
   npm run build
   
   # solution 프로젝트 빌드 테스트  
   cd [챕터]/solution
   npm install
   npm run build
   
   # challenge 프로젝트 빌드 테스트
   cd [챕터]/challenge  
   npm install
   npm run build
   ```

2. **빌드 성공 확인:**
    - 모든 프로젝트가 에러 없이 빌드 완료되어야 함
    - TypeScript 오류, ESLint 오류, 의존성 문제 등이 없어야 함
    - `dist` 폴더가 정상적으로 생성되어야 함

3. **빌드 실패 시 대응:**
    - 의존성 문제: `npm install` 재실행
    - TypeScript/ESLint 오류: 즉시 수정
    - 버전 호환성 문제: 패키지 버전 조정

#### 빌드 테스트의 중요성

- **학생 경험 보장**: 학생들이 실습 중 예상치 못한 빌드 오류로 인해 학습이 중단되는 것을 방지
- **프로덕션 준비성**: 실제 배포 가능한 상태의 코드임을 보장
- **의존성 안정성**: 모든 필수 패키지가 올바르게 설치되고 작동함을 확인
- **코드 품질**: TypeScript, ESLint 등의 정적 분석 도구를 통한 코드 품질 검증

### 5.2. 일관성 검증

- **스타일 가이드 준수**: 모든 프로젝트가 동일한 코딩 컨벤션을 따르는지 확인
- **폴더 구조 통일**: 정의된 표준 구조를 모든 챕터에서 일관되게 적용
- **네이밍 규칙**: 파일명, 컴포넌트명, 함수명 등이 규정된 규칙을 따르는지 검증

### 5.3. 문서화 품질

- **README.md 완성도**: 각 챕터의 학습 목표, 개념 설명, 실습 가이드가 명확하고 완전한지 확인
- **코드 주석**: 핵심 개념이나 복잡한 로직에 대한 적절한 주석 포함
- **TODO 명확성**: challenge 프로젝트의 TODO가 학습 목표에 부합하고 명확한지 검증
