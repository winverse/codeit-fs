import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>로딩 중...</p>
    </div>
  );
}