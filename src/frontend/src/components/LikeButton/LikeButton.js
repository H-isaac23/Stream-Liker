import React from "react";
import styles from "./LikeButton.module.scss";

const LikeButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <button>Like</button>
    </div>
  );
};

export default LikeButton;
