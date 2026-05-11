# 5. URL 쿼리 파라미터를 이용한 검색 및 정렬

이번 챕터에서는 URL의 쿼리 파라미터(Query Parameters)를 다루는 `useSearchParams` 훅의 사용법을 배웁니다. 이를 통해 사용자의 검색어와 정렬 옵션을 URL에 동기화하여, 페이지를 새로고침하거나 링크를 공유해도 상태가 유지되는 검색 페이지를 만듭니다.

## 학습 목표

- `useSearchParams` 훅을 사용하여 URL 쿼리 파라미터를 읽고 쓸 수 있다.
- 사용자의 입력(검색, 클릭)에 따라 URL 쿼리 파라미터를 동적으로 업데이트할 수 있다.
- 쿼리 파라미터를 기반으로 데이터를 필터링하고 정렬하는 기능을 구현할 수 있다.

## 주요 개념

- **`useSearchParams`**: URL의 쿼리 문자열을 읽고 수정할 수 있는 기능을 제공하는 훅입니다. `useState`와 유사하게, 현재 search-params 객체와 이를 업데이트하는 함수를 배열 형태로 반환합니다.
  - `const [searchParams, setSearchParams] = useSearchParams();`
  - `searchParams.get('key')`: 특정 키(key)의 값을 읽습니다.
  - `setSearchParams({ key: 'value' })`: 쿼리 파라미터를 새로운 값으로 설정합니다. URL이 업데이트되고 컴포넌트가 리렌더링됩니다.

💡 **심화 학습: `useParams` vs `useSearchParams`**
`useParams`는 `/courses/:id`와 같이 URL 경로의 일부인 동적 세그먼트(Path Parameter)를 가져오는 데 사용됩니다. 반면, `useSearchParams`는 `/search?q=React&sort=asc`와 같이 `?` 뒤에 오는 쿼리 파라미터(Query Parameter)를 다루는 데 사용됩니다. 전자는 특정 리소스를 식별할 때, 후자는 페이지의 상태(정렬, 필터링, 페이지네이션 등)를 표현할 때 주로 사용됩니다.

---

## 강의 시연 스크립트

`starter` 폴더의 코드를 기반으로, `solution` 폴더의 완성된 코드를 만들어가는 과정을 단계별로 안내합니다.

### 1단계: `useSearchParams`로 URL 파라미터 읽기

`SearchPage.jsx`에서 `useSearchParams`를 호출하고, `get` 메서드를 사용해 `q`와 `sort` 파라미터 값을 가져옵니다.

```jsx
// 05-search-params/starter/src/pages/SearchPage.jsx (수정)
// ...
export function SearchPage() {
  // TODO 주석 아래 코드를 작성
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');
  // ...
}
```

### 2단계: 검색 기능 구현하기

검색 form의 `onSubmit` 이벤트 핸들러인 `handleSubmit` 함수를 완성하여, 입력된 검색어로 `q` 파라미터를 업데이트합니다.

```jsx
// 05-search-params/starter/src/pages/SearchPage.jsx (수정)
// ...
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO 주석 아래 코드를 작성
    const formData = new FormData(e.target);
    const searchQuery = formData.get('q');
    setSearchParams({ q: searchQuery });
  };
// ...
```

### 3단계: 정렬 기능 구현하기

정렬 버튼의 `onClick` 이벤트 핸들러인 `handleClickButton` 함수를 완성하여, `sort` 파라미터를 업데이트합니다. 이때 기존 `q` 파라미터는 유지해야 합니다.

```jsx
// 05-search-params/starter/src/pages/SearchPage.jsx (수정)
// ...
  const handleClickButton = (sortType) => {
    // TODO 주석 아래 코드를 작성
    setSearchParams({ q: query || '', sort: sortType });
  };
// ...
```

### 4단계: 데이터 필터링 및 정렬, 조건부 렌더링

`query`와 `sort` 값에 따라 `questions` 배열을 처리하고, 그 결과에 따라 적절한 UI를 보여주는 로직을 완성합니다.

```jsx
// 05-search-params/starter/src/pages/SearchPage.jsx (수정)

  // ...
  // TODO 주석 아래 필터링/정렬 로직을 작성
  const filteredQuestions = query
    ? questions
        .filter((q) => q.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          if (sort === 'asc') return a.localeCompare(b);
          if (sort === 'desc') return b.localeCompare(a);
          return 0;
        })
    : [];

  // ...

  return (
    // ...
      {/* TODO 주석 부분을 아래의 조건부 렌더링 코드로 교체 */}
      {query ? (
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, i) => <li key={i}>{q}</li>)
          ) : (
            <p>'`${query}`'에 대한 검색 결과가 없습니다.</p>
          )}
        </ul>
      ) : (
        <p>검색어를 입력해주세요.</p>
      )}
    // ...
  );
```