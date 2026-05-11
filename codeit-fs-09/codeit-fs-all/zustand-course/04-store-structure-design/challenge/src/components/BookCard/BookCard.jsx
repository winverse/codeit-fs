import React from 'react';

export function BookCard({ book }) {
  return (
    <div>
      <h4>{book.title}</h4>
      <p>저자: {book.author}</p>
      {/* TODO: 도서 정보 표시 및 대출/반납 버튼 구현 */}
    </div>
  );
}