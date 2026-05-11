import { Header } from "../Header";
import { Content } from "../Content";
import styles from "./Page.module.css";

export function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <Content />
    </div>
  );
}
