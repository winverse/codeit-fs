import { useSearchParams } from 'react-router';
import styles from './Search.module.css';

const questions = [
  'React Router가 무엇인가요?',
  'useParams는 언제 사용하나요?',
  'useSearchParams와 useParams의 차이점은?',
  'React의 장점은 무엇인가요?',
];

export function SearchPage() {
  // TODO: useSearchParams 훅을 사용해 searchParams와 setSearchParams를 가져오세요.
  const query = null; // TODO: searchParams에서 'q' 값을 가져오세요.
  const sort = null; // TODO: searchParams에서 'sort' 값을 가져오세요.

  // TODO: query가 있을 경우 questions 배열을 필터링하고 정렬하는 로직을 구현하세요.
  // HINT: filter와 sort, localeCompare를 사용해보세요.
  const filteredQuestions = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: form의 'q' 값을 가져와 search param을 업데이트하세요.
  };

  const handleClickButton = (sortType) => {
    // TODO: 기존 'q' 파라미터는 유지하면서 'sort' 파라미터를 업데이트하세요.
  };

  return (
    <div className={styles.page}>
      <h2>질문 검색</h2>
      <form onSubmit={handleSubmit}>
        <input type="search" name="q" defaultValue={query || ''} />
        <button type="submit">검색</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => handleClickButton('asc')}
          disabled={sort === 'asc'}
        >
          오름차순 정렬
        </button>
        <button
          onClick={() => handleClickButton('desc')}
          disabled={sort === 'desc'}
        >
          내림차순 정렬
        </button>
      </div>

      <hr />

      <h3>검색 결과</h3>
      {/* TODO: query의 존재 여부와 filteredQuestions의 길이에 따라 다른 UI를 보여주세요. */}
      {/* 1. query가 없을 때: <p>검색어를 입력해주세요.</p> */}
      {/* 2. query가 있고 결과가 있을 때: 질문 목록(ul > li) */}
      {/* 3. query가 있고 결과가 없을 때: <p>'{query}'에 대한 검색 결과가 없습니다.</p> */}
      <p>검색어를 입력해주세요.</p>
    </div>
  );
}
