import { useAppSelector } from "@/app/hooks";
import { selectTheme } from "@/features/user/userSlice";
import { UserProfile } from "@/features/user/UserProfile";
import { UserPreferences } from "@/features/user/UserPreferences";
import { OptimizedCounter } from "@/components/OptimizedCounter";
import { MultiSubscriber } from "@/components/MultiSubscriber";
import styles from "./App.module.css";

export function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <div className={`${styles.app} ${styles[theme]}`}>
      <header className={styles.header}>
        <h1>React-Redux 통합 데모</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.section}>
          <UserProfile />
        </div>

        <div className={styles.section}>
          <UserPreferences />
        </div>

        <div className={styles.section}>
          <OptimizedCounter />
        </div>

        <div className={styles.section}>
          <MultiSubscriber />
        </div>
      </main>
    </div>
  );
}