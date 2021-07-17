import styles from './Loader.module';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span>Loading...</span>
    </div>
  );
}
