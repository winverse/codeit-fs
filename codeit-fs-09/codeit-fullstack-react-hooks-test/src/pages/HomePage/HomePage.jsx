import styles from './HomePage.module.css';
import { PostList } from '@/pages/HomePage/components/PostList';
import { AddPostForm } from '@/pages/HomePage/components/AddPostForm';
import { usePosts } from '@/contexts/PostContext';
import { useAddPostForm } from '@/hooks/useAddPostForm';
import { FiPlus, FiX } from 'react-icons/fi';

export function HomePage() {
  const { handleAddPost, totalTitleLength } = usePosts();
  const {
    showAddForm,
    setShowAddForm,
    newPostTitle,
    setNewPostTitle,
    newPostBody,
    setNewPostBody,
    titleInputRef,
    resetForm,
  } = useAddPostForm();

  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    handleAddPost({ title: newPostTitle, body: newPostBody });
    resetForm();
  };

  return (
    <div className={styles.HomePage}>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className={styles.toggleFormButton}
      >
        {showAddForm ? (
          <>
            <FiX /> 폼 닫기
          </>
        ) : (
          <>
            <FiPlus /> 새 게시물 추가
          </>
        )}
      </button>

      <h1>게시물 목록</h1>

      <AddPostForm
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newPostTitle={newPostTitle}
        setNewPostTitle={setNewPostTitle}
        newPostBody={newPostBody}
        setNewPostBody={setNewPostBody}
        titleInputRef={titleInputRef}
        handleAddPost={handleSubmitAddPost}
      />

      <p className={styles.totalLengthText}>
        총 게시물 제목 길이 (useMemo): {totalTitleLength}
      </p>
      <PostList />
    </div>
  );
}
