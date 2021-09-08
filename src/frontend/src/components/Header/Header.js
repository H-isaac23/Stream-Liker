import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerMask}>
        <header>Stream Liker</header>
      </div>
    </div>
  );
};

export default Header;
