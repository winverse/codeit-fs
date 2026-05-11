import React from 'react';

export function PostCard({ post }) {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      {/* TODO: 포스트 정보 표시 */}
    </div>
  );
}