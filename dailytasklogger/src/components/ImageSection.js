import Image from "next/image";
import styles from "../styles/ImageSection.module.css";

export default function ImageSection() {
  return (
    <div className={styles.image}>
      <Image
        src="/images/dailyLoggerScreenShot.png"
        alt="Screenshot of the Daily Task Logger"
        width={800}
        height={600}
        priority
      />
    </div>
  );
}