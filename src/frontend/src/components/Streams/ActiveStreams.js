import styles from "./ActiveStreams.module.scss";

const ActiveStreams = ({ name, url }) => {
  return (
    <div className={styles.streamContainer}>
      <a href={url} target="_blank" rel="noreferrer">
        <div className={styles.container}>{name}</div>
      </a>
    </div>
  );
};

export default ActiveStreams;
