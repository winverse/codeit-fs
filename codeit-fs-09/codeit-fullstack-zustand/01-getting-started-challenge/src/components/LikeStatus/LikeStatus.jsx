// TODO: useLikeStore를 import하세요
import styles from './LikeStatus.module.css';

export function LikeStatus() {
  // TODO: 좋아요 수만 가져오세요
  // const ??? = useLikeStore(???);
  const likes = 1;

  // TODO: 좋아요 수에 따른 메시지를 반환하는 함수를 완성하세요
  const getMessage = () => {
    // TODO: 조건에 따른 메시지를 반환하세요
    // 0개: "아직 좋아요가 없어요"
    // 1-5개: "좋아요를 받고 있네요!"
    // 6-10개: "인기가 많아요!"
    // 11개 이상: "대박! 너무 인기 있어요!"

    if (likes === 0) {
      return '아직 좋아요가 없어요';
    }
    if (likes >= 1 && likes <= 5) {
      return '좋아요를 받고 있네요!';
    }
    if (likes >= 6 && likes <= 10) {
      return '인기가 많아요!';
    }
    return '대박! 너무 인기 있어요!';
  };

  return (
    <div className={styles.display}>
      <p>
        현재 상태: <strong>{likes}</strong>개의 좋아요
      </p>
      <p className={styles.message}>{getMessage()}</p>
    </div>
  );
}

// 💡 힌트:
// 1. useLikeStore((state) => state.likes)로 좋아요 수만 선택적으로 가져올 수 있어요
// 2. if-else 문이나 삼항 연산자를 사용해서 조건부 렌더링을 구현하세요
// 3. 좋아요 수에 따라 다른 CSS 클래스를 적용하면 시각적 효과를 줄 수 있어요
