import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { usePagination } from '@/hooks/usePagination';
import { fetchPosts, createPost, deletePost, updatePost } from '@/api/posts';
import { PostContext } from '@/contexts/PostContext';

const POSTS_PER_PAGE = 12;
const INITIAL_PAGE = 1;
const DEFAULT_USER_ID = 1;

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentPage, totalPages, setTotalItems, goToPage, setCurrentPage } =
    usePagination(INITIAL_PAGE, POSTS_PER_PAGE);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, totalCount } = await fetchPosts(
          currentPage,
          POSTS_PER_PAGE,
        );
        setPosts(data);
        setTotalItems(totalCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [currentPage, setTotalItems]);

  const handleAddPost = useCallback(
    async (postData) => {
      setIsLoading(true);
      setError(null);
      try {
        const newPost = await createPost({
          ...postData,
          userId: DEFAULT_USER_ID,
        });
        // 새 게시물을 배열의 맨 앞에 추가
        setPosts((prevPosts) => [
          newPost,
          ...prevPosts.slice(0, POSTS_PER_PAGE - 1),
        ]);
        setTotalItems((prevTotal) => prevTotal + 1);
        // 현재 페이지가 1페이지가 아닐 경우에만 1페이지로 이동
        if (currentPage !== INITIAL_PAGE) {
          setCurrentPage(INITIAL_PAGE);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, setCurrentPage, setTotalItems],
  );

  const handleDelete = useCallback(
    async (id) => {
      setIsLoading(true);
      setError(null);
      try {
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        setTotalItems((prevTotal) => prevTotal - 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [setTotalItems],
  );

  const handleUpdate = useCallback(async (id, updatedTitle, updatedBody) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPost = await updatePost(id, {
        id: id,
        title: updatedTitle,
        body: updatedBody,
        userId: DEFAULT_USER_ID,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? updatedPost : post)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useMemo 예시: 모든 게시물 제목의 총 길이 계산
  const totalTitleLength = useMemo(() => {
    console.log('Calculating total title length...');
    return posts.reduce((acc, post) => acc + post.title.length, 0);
  }, [posts]);

  const contextValue = {
    posts,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalTitleLength,
    goToPage,
    handleAddPost,
    handleDelete,
    handleUpdate,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};
