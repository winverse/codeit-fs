import { useSearchParams } from 'react-router';
import styles from './Search.module.css';

const questions = [
  'React Router가 무엇인가요?',
  'useParams는 언제 사용하나요?',
  'useSearchParams와 useParams의 차이점은?',
  'React의 장점은 무엇인가요?',
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');

  const filteredQuestions = query
    ? questions
        .filter((q) => q.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          if (sort === 'asc') return a.localeCompare(b);
          if (sort === 'desc') return b.localeCompare(a);
          return 0;
        })
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('q');
    setSearchParams({ q: searchQuery });
  };

  const handleClickButton = (sortType) => {
    setSearchParams({ q: query || '', sort: sortType });
  };

  return (
    <div className={styles.page}>
      <h2>질문 검색</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
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
      {query ? (
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, i) => <li key={i}>{q}</li>)
          ) : (
            <p>'{query}'에 대한 검색 결과가 없습니다.</p>
          )}
        </ul>
      ) : (
        <p>검색어를 입력해주세요.</p>
      )}
    </div>
  );
}
