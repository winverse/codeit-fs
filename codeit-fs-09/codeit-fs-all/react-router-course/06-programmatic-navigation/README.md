# 6. 프로그래매틱 내비게이션

이번 챕터에서는 `useNavigate` 훅을 사용하여 코드 내에서 프로그래밍 방식으로 페이지를 이동시키는 방법을 배웁니다. `<Link>` 컴포넌트를 사용하기 어려운 경우, 예를 들어 폼 제출, 로그인/로그아웃 처리, 또는 특정 비동기 작업이 완료된 후에 페이지를 이동시켜야 할 때 유용하게 사용됩니다.

## 학습 목표

- `useNavigate` 훅을 사용하여 페이지를 이동시키는 함수를 가져올 수 있다.
- 특정 이벤트(예: 버튼 클릭)가 발생했을 때, 원하는 경로로 페이지를 이동시킬 수 있다.
- `navigate` 함수의 두 번째 인자인 `options` 객체(`replace` 등)를 사용하여 페이지 이동 동작을 제어할 수 있다.

## 주요 개념

- **`useNavigate`**: React Router가 제공하는 훅으로, 프로그래밍 방식으로 페이지를 이동시킬 수 있는 `navigate` 함수를 반환합니다.
- **`navigate(to, [options])`**: `useNavigate`가 반환하는 함수입니다.
  - `to` (string): 이동할 경로를 지정합니다. (예: `/dashboard`)
  - `options` (object, 선택 사항): 페이지 이동에 대한 추가 옵션을 설정합니다.
    - `replace` (boolean): `true`로 설정하면 현재 경로를 브라우저 히스토리 스택에 쌓지 않고 새로운 경로로 대체합니다. (로그인/로그아웃 처리에 유용)
    - `state`: 이동하는 페이지에 상태 값을 전달할 때 사용합니다. (다음 챕터에서 배웁니다.)

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `useNavigate`로 로그인 기능 구현하기

`pages/Login/LoginPage.jsx`에서, 사용자가 '로그인' 버튼을 클릭했을 때 `/dashboard` 경로로 프로그래밍 방식으로 이동시키는 기능을 구현합니다.

1.  **`useNavigate` 훅 호출**

    `LoginPage` 컴포넌트 최상단에서 `useNavigate`를 호출하여 `navigate` 함수를 가져옵니다.

    ```jsx
    // 06-programmatic-navigation/starter/src/pages/Login/LoginPage.jsx (수정)
    import { useNavigate } from "react-router";

    export function LoginPage() {
      // TODO 주석 아래 코드를 작성
      const navigate = useNavigate();
      // ...
    }
    ```

2.  **`navigate` 함수 호출**

    `handleLogin` 함수 내에서, `alert` 창이 닫힌 후 `/dashboard` 경로로 이동하도록 `navigate` 함수를 호출합니다.

    ```jsx
    // 06-programmatic-navigation/starter/src/pages/Login/LoginPage.jsx (수정)
    // ...
    function handleLogin() {
      // ...
      alert("로그인 성공! 대시보드로 이동합니다.");

      // TODO 주석 아래 코드를 작성
      navigate("/dashboard");
    }
    // ...
    ```

이제 로그인 페이지에서 버튼을 클릭하면, 경고창이 뜬 후 대시보드 페이지로 화면이 전환됩니다.