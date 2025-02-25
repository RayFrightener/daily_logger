import styles from "../styles/ImageSection.module.css";

export default function ImageSection() {
  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.videoContainer}
        width="800"
        height="600"
        src="https://www.youtube.com/embed/DlY3mBIIm4E"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}