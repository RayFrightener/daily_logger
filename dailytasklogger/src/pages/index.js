import LandingPageContent from "../components/LandingPageContent";
import ImageSection from "../components/ImageSection";
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <LandingPageContent />
          </div>
          <div className={styles.right}>
            <ImageSection />
          </div>
        </div>
      </main>
    </div>
  );
}