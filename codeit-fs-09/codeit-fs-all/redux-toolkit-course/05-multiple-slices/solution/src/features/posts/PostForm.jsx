import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import styles from "./PostForm.module.css";

export function PostForm({ onSubmit }) {
  const currentUser = useAppSelector((state) =>
    state.users.currentUserId
      ? state.users.entities[state.users.currentUserId]
      : null
  );

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("사용자를 먼저 선택해주세요.");
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    onSubmit({
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    });

    setFormData({ title: "", content: "", tags: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>새 게시글 작성</h3>
      
      <div className={styles.field}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="게시글 제목을 입력하세요"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="게시글 내용을 입력하세요"
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="tags">태그 (쉼표로 구분)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React, Redux, JavaScript"
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        게시글 작성
      </button>
    </form>
  );
}