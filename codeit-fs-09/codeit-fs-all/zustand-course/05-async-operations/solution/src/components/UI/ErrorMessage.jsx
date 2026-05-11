import React from 'react';

export function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>오류: {message}</p>
    </div>
  );
}