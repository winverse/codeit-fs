import styles from './MemoList.module.css';
import { MemoCard } from '@/components/MemoCard';

export function MemoList() {
  // TODO: Zustand 스토어에서 필터링된 메모 목록 가져오기
  // const { filteredMemos, deleteMemo, updateMemo } = useMemoStore((state) => ({
  //   filteredMemos: state.filteredMemos,
  //   deleteMemo: state.deleteMemo,
  //   updateMemo: state.updateMemo,
  // }));

  // 임시 데모 데이터 (TODO 제거 후 삭제)
  const demoMemos = [
    {
      id: 1,
      title: '프로젝트 미팅 준비',
      content:
        '오늘 오후 2시 프로젝트 미팅을 위한 자료를 준비해야 한다. 진행 상황 정리하고 다음 단계 계획 수립하기.',
      category: 'work',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      title: 'React 공부 계획',
      content:
        'Zustand 상태관리 라이브러리 학습하기. 기본 사용법부터 고급 패턴까지 단계별로 학습.',
      category: 'study',
      createdAt: '2024-01-14T16:20:00Z',
      updatedAt: '2024-01-14T16:20:00Z',
    },
    {
      id: 3,
      title: '새로운 앱 아이디어',
      content:
        '사용자들이 쉽게 메모를 작성하고 관리할 수 있는 앱을 만들어보자. 카테고리별 필터링과 검색 기능이 핵심.',
      category: 'ideas',
      createdAt: '2024-01-13T09:45:00Z',
      updatedAt: '2024-01-13T09:45:00Z',
    },
  ];

  const handleDelete = memoId => {
    // TODO: Zustand deleteMemo 액션 호출
    console.log('TODO: deleteMemo 액션 호출:', memoId);
  };

  const handleUpdate = memo => {
    // TODO: Zustand updateMemo 액션 호출
    console.log('TODO: updateMemo 액션 호출:', memo);
  };

  // TODO: 실제 필터링된 메모 사용 (현재는 데모 데이터)
  const memosToShow = demoMemos;

  if (memosToShow.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <h3 className={styles.emptyTitle}>메모가 없습니다</h3>
          <p className={styles.emptyDescription}>새로운 메모를 작성해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.memoGrid}>
        {memosToShow.map(memo => (
          <MemoCard
            key={memo.id}
            memo={memo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
