import React from 'react';
import Header from './components/Header/Header';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail/PostDetail';
import PostForm from './components/PostForm/PostForm';
import { useBlogStore } from './store/blogStore';
import styles from './App.module.css';

function App() {
  const { currentView, selectedPostId } = useBlogStore();

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <PostList />;
      case 'detail':
        return <PostDetail postId={selectedPostId} />;
      case 'create':
        return <PostForm />;
      case 'edit':
        return <PostForm postId={selectedPostId} />;
      default:
        return <PostList />;
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;