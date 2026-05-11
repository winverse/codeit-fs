import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/hooks";
import { addUser, setCurrentUser } from "@/features/users/usersSlice";
import { addPost } from "@/features/posts/postsSlice";
import { PostList } from "@/features/posts/PostList";
import { PostForm } from "@/features/posts/PostForm";
import { UserSelector } from "@/features/users/UserSelector";
import styles from "./BlogDashboard.module.css";

export function BlogDashboard() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) =>
    state.users.currentUserId
      ? state.users.entities[state.users.currentUserId]
      : null
  );

  // 초기 데이터 설정
  useEffect(() => {
    // 샘플 사용자 데이터
    const sampleUsers = [
      { id: 1, name: "김개발", email: "kim@example.com", avatar: "👨‍💻" },
      { id: 2, name: "박디자인", email: "park@example.com", avatar: "👩‍🎨" },
      { id: 3, name: "이기획", email: "lee@example.com", avatar: "👨‍💼" },
    ];

    sampleUsers.forEach((user) => {
      dispatch(addUser(user));
    });

    // 기본 사용자 설정
    dispatch(setCurrentUser(1));

    // 샘플 게시글 데이터
    const samplePosts = [
      {
        title: "Redux Toolkit 시작하기",
        content:
          "Redux Toolkit을 사용하면 Redux 코드를 훨씬 간단하게 작성할 수 있습니다.",
        authorId: 1,
        status: "published",
        tags: ["Redux", "JavaScript", "Frontend"],
      },
      {
        title: "리액트 성능 최적화",
        content: "React 앱의 성능을 향상시키는 다양한 기법들을 알아봅시다.",
        authorId: 2,
        status: "draft",
        tags: ["React", "Performance", "Optimization"],
      },
    ];

    samplePosts.forEach((post) => {
      dispatch(addPost(post));
    });
  }, [dispatch]);

  const handleCreatePost = (postData) => {
    if (currentUser) {
      dispatch(
        addPost({
          ...postData,
          authorId: currentUser.id,
          status: "draft",
          tags: postData.tags || [],
        })
      );
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>블로그 대시보드</h1>
        <UserSelector />
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <PostForm onSubmit={handleCreatePost} />
        </aside>

        <main className={styles.main}>
          <PostList />
        </main>
      </div>
    </div>
  );
}