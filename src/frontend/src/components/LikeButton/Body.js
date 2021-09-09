import React from "react";
import styles from "./Body.module.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Body = () => {
  return (
    <div className={styles.bodyContainer}>
      <LikeButton />
      <div className={styles.loaderContainer}>
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={80}
          width={80}
          className={styles.loader}
        />
      </div>
    </div>
  );
};

const LikeButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <button>Like</button>
    </div>
  );
};

export default Body;
