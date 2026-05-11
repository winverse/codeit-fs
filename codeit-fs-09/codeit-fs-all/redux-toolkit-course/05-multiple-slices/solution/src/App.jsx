import { BlogDashboard } from "@/components/BlogDashboard";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.app}>
      <BlogDashboard />
    </div>
  );
}