# Challenge: 여러 컴포넌트 지연 로딩하기

## 목표
이 챌린지에서는 `React.lazy`와 `Suspense`를 사용하여, 여러 컴포넌트를 각각의 코드 청크로 분할하고 필요할 때만 지연 로딩하는 실용적인 패턴을 구현합니다. 탭(Tab) UI를 통해 이 기법을 연습합니다.

## 시작하기
1. 의존성을 설치합니다:
   ```bash
   npm install
   ```

2. 개발 서버를 시작합니다:
   ```bash
   npm run dev
   ```
   개발 서버가 실행되면, `/settings` 페이지로 접속하여 실습을 진행하세요.

## 챌린지 과제

`src/routes/settings.jsx` 파일을 열고, `// TODO:` 주석으로 표시된 부분을 단계별로 완성하세요.

### 1. 지연 로딩할 컴포넌트 생성

`src/components/settings/` 폴더 안에 다음 세 개의 파일을 **새로 생성**하세요:
- `ProfileSettings.jsx`
- `AccountSettings.jsx`
- `AppearanceSettings.jsx`

각 파일은 간단한 내용을 담은 React 컴포넌트를 `export`해야 합니다. (예: `<h2>Profile Settings</h2>`)

### 2. 컴포넌트 지연 로딩

`settings.jsx` 파일 상단에서, `React.lazy`를 사용하여 방금 만든 세 개의 컴포넌트를 각각 동적으로 임포트하세요.

### 3. `Suspense`로 로딩 상태 처리

`SettingsPage` 컴포넌트 내부에서, 현재 활성화된 탭(`activeTab`)에 따라 조건부로 렌더링되는 부분을 `Suspense` 컴포넌트로 감싸세요.
- `fallback` prop에는 로딩 중임을 알리는 간단한 UI(예: `<div>Loading...</div>`)를 전달합니다.

## 완료 후 확인사항
- [ ] `/settings` 페이지에 접속했을 때, "Profile", "Account", "Appearance" 탭 버튼이 보이는가?
- [ ] 브라우저 개발자 도구의 네트워크 탭을 열어둔 상태에서, 각 탭을 클릭할 때마다 해당 컴포넌트에 해당하는 새로운 JavaScript 청크 파일이 로드되는가?
- [ ] 두 번째부터는 동일한 탭을 다시 클릭해도 새로운 네트워크 요청이 발생하지 않는가? (이미 로드되었으므로)
- [ ] 탭을 전환하는 동안 `Suspense`의 `fallback` UI가 잠시 나타나는가?

## 도움이 필요한가요?
막히는 부분이 있다면 `solution` 폴더의 완성된 코드를 참고하거나, `해설강의.md` 파일을 확인하세요!
