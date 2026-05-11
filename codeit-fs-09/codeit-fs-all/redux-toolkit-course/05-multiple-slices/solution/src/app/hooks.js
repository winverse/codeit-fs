import { useDispatch, useSelector } from "react-redux";

// 기본 훅들을 재사용하기 쉽게 래핑
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// 자주 사용되는 selector를 위한 커스텀 훅들
export function useCurrentUser() {
  return useAppSelector((state) => {
    const currentUserId = state.users.currentUserId;
    return currentUserId ? state.users.entities[currentUserId] : null;
  });
}

export function usePostWithAuthor(postId) {
  return useAppSelector((state) => {
    const post = state.posts.entities[postId];
    if (!post) return null;

    const author = state.users.entities[post.authorId];
    return { ...post, author };
  });
}

export function usePostsWithAuthors() {
  return useAppSelector((state) => {
    const posts = state.posts.ids.map((id) => state.posts.entities[id]);
    return posts.map((post) => ({
      ...post,
      author: state.users.entities[post.authorId] || { name: "Unknown" },
      commentsCount: state.comments.byPostId[post.id]?.length || 0,
    }));
  });
}