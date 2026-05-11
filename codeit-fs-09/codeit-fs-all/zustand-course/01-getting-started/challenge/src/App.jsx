// TODO: counterStore에서 useCounterStore를 import하세요
// import { ??? } from '@/stores/counterStore';
import '@/styles/App.css';

export function App() {
  // TODO: useCounterStore 훅을 사용해서 상태와 액션을 가져오세요
  // const { ???, ???, ???, ??? } = useCounterStore();

  // 임시 상태 (TODO를 완성하면 제거하세요)
  const count = 0;
  const increment = () => console.log('TODO: increment 구현');
  const decrement = () => console.log('TODO: decrement 구현');
  const reset = () => console.log('TODO: reset 구현');

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 Zustand 실습 챌린지</h1>
        <p>카운터 앱을 완성해보세요!</p>
      </header>

      <main className="main">
        <div className="counter-section">
          <h2>카운터</h2>
          <div className="counter-display">
            <span className="count-value">{count}</span>
          </div>

          <div className="counter-controls">
            {/* TODO: 각 버튼에 올바른 이벤트 핸들러를 연결하세요 */}
            <button className="btn btn-decrement" onClick={decrement}>
              -1
            </button>
            <button className="btn btn-increment" onClick={increment}>
              +1
            </button>
            <button className="btn btn-reset" onClick={reset}>
              초기화
            </button>
          </div>
        </div>

        <div className="challenge-section">
          <h3>🎯 완성해야 할 과제</h3>
          <div className="todo-list">
            <div className="todo-item">
              <input type="checkbox" id="todo1" />
              <label htmlFor="todo1">
                <strong>1단계:</strong> counterStore.js에서 Zustand 스토어
                생성하기
              </label>
            </div>
            <div className="todo-item">
              <input type="checkbox" id="todo2" />
              <label htmlFor="todo2">
                <strong>2단계:</strong> App.jsx에서 useCounterStore 훅 사용하기
              </label>
            </div>
            <div className="todo-item">
              <input type="checkbox" id="todo3" />
              <label htmlFor="todo3">
                <strong>3단계:</strong> 버튼 클릭 시 카운터 값이 변경되는지
                확인하기
              </label>
            </div>
          </div>

          <div className="hint-section">
            <h4>💡 힌트</h4>
            <ul>
              <li>
                Zustand의 <code>create</code> 함수를 사용해서 스토어를
                만들어보세요
              </li>
              <li>
                <code>set</code> 함수로 상태를 업데이트할 수 있습니다
              </li>
              <li>구조분해 할당으로 필요한 값들을 가져오세요</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
