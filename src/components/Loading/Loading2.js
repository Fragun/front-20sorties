import styles from "./Loading2.module.scss";

export default function Loading() {
  return (
    <div className={`d-flex justify-content-center align-items-center ${styles.loading}`}>
      <div className={styles.spinner}>
        <div className={styles.rect1}></div>
        <div className={styles.rect2}></div>
        <div className={styles.rect3}></div>
        <div className={styles.rect4}></div>
        <div className={styles.rect5}></div>
      </div>
    </div>
  );
}