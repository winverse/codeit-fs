import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>홈 페이지</h1>
      <div>
        <h2>🎯 챌린지 과제</h2>
        <p>다음 기능들을 구현해보세요:</p>

        <div>
          <h3>1. 기본 내비게이션 (필수)</h3>
          <ul>
            <li>[ ] Link 컴포넌트를 사용한 기본 내비게이션 메뉴</li>
            <li>[ ] 활성 링크 하이라이팅 (activeProps 사용)</li>
            <li>[ ] 펜딩 상태 표시 (pendingProps 사용)</li>
            <li>
              [ ] 최소 5개 페이지 (Home, Products, Categories, About, Contact)
            </li>
          </ul>
        </div>

        <div>
          <h3>2. 프로그래매틱 내비게이션 (필수)</h3>
          <ul>
            <li>[ ] useNavigate 훅을 사용한 버튼 기반 내비게이션</li>
            <li>[ ] 검색 파라미터와 함께 이동하기</li>
            <li>[ ] 히스토리 교체 (replace: true) 예제</li>
            <li>[ ] 동적 라우트로 이동 (파라미터 포함)</li>
          </ul>
        </div>

        <div>
          <h3>3. 고급 기능 (선택)</h3>
          <ul>
            <li>[ ] 조건부 내비게이션 (Navigate 컴포넌트)</li>
            <li>[ ] 내비게이션 가드 (인증 기반)</li>
            <li>[ ] 외부 링크 처리</li>
            <li>[ ] 모달과 내비게이션 조합</li>
          </ul>
        </div>

        <div className="alert alert-info mt-2">
          <h4>💡 구현 힌트</h4>
          <p>solution 프로젝트를 참고하되, 직접 구현해보세요!</p>
          <ul>
            <li>
              Link 컴포넌트의 activeProps, inactiveProps, pendingProps 활용
            </li>
            <li>useNavigate 훅으로 프로그래매틱 내비게이션</li>
            <li>useRouter 훅으로 현재 라우트 정보 접근</li>
            <li>Navigate 컴포넌트로 조건부 리디렉션</li>
          </ul>
        </div>
      </div>
    </div>
  ),
});
