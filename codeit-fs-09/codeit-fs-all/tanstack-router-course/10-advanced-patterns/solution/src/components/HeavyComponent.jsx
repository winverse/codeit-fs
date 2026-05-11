export function HeavyComponent() {
  // 이 컴포넌트는 무거운 라이브러리를 포함하고 있거나
  // 복잡한 계산을 수행한다고 가정합니다.
  return (
    <div className="page-content heavy-component-wrapper">
      <h2>📦 I am a Heavy Component!</h2>
      <p>
        저는 지연 로딩되었습니다. 초기 번들에는 포함되지 않아 첫 페이지 로딩 속도를 빠르게 유지하는 데 도움이 됩니다.
      </p>
    </div>
  );
}
