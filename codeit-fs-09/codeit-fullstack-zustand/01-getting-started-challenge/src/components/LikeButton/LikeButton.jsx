// TODO: useLikeStore를 import하세요
import styles from './LikeButton.module.css';

export function LikeButton() {
  // TODO: 좋아요 스토어에서 상태와 액션들을 가져오세요
  // const {} = useLikeStore(state => state);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>❤️ 좋아요 카운터</h2>

      {/* TODO: 좋아요 수를 표시하세요 */}
      <div className={styles.counter}>
        <span className={styles.count}>1</span>
        <span className={styles.label}>좋아요</span>
      </div>

      <div className={styles.buttons}>
        {/* TODO: 좋아요 추가 버튼 - addLike 함수를 연결하세요 */}
        <button onClick={() => {}} className={styles.button}>
          ❤️ 좋아요
        </button>

        {/* TODO: 좋아요 취소 버튼 - removeLike 함수를 연결하세요 */}
        <button onClick={() => {}} className={styles.button}>
          💔 취소
        </button>

        {/* TODO: 리셋 버튼 - resetLikes 함수를 연결하세요 */}
        <button onClick={() => {}} className={styles.resetButton}>
          🔄 리셋
        </button>
      </div>
    </div>
  );
}

// 💡 힌트:
// 1. useLikeStore를 import하고 사용하세요
// 2. 각 버튼의 onClick에 적절한 액션을 연결하세요
// 3. {likes}로 현재 좋아요 수를 표시하세요
