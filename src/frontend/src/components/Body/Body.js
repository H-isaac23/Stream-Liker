import React, { useState } from "react";
import styles from "./Body.module.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition } from "react-transition-group";
import "./Body.css";
import getStreams from "../../services/getStreams";

const Body = () => {
  const [showing, setShowing] = useState("Like");

  const onClickingLike = () => {
    const accounts = [
      {
        accountName: "Fubuki",
        accountId: "UCdn5BQ06XqgXoAxIhbqw5Rg",
        __v: 0,
        id: "61383d71fd82d6748e90bfaf",
      },
      {
        accountName: "Matsuri",
        accountId: "UCQ0UDLQCjY0rmuxCDE38FGg",
        __v: 0,
        id: "61383d73fd82d6748e90bfb3",
      },
      {
        accountName: "Aki",
        accountId: "UCFTLzh12_nrtzqBPsTCqenA",
        __v: 0,
        id: "61383d74fd82d6748e90bfb7",
      },
    ];
    setShowing("Loading");
    getStreams(accounts);
  };

  return (
    <div className={styles.bodyContainer}>
      <CSSTransition
        in={showing === "Like"}
        unmountOnExit
        timeout={1000}
        classNames="body-primary"
      >
        <LikeButton onClick={onClickingLike} />
      </CSSTransition>
      <CSSTransition
        in={showing === "Loading"}
        unmountOnExit
        timeout={1000}
        classNames="bodyLoading"
      >
        <div className={styles.loaderContainer}>
          <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
        </div>
      </CSSTransition>
    </div>
  );
};

const LikeButton = ({ onClick }) => {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={onClick}>Like</button>
    </div>
  );
};

export default Body;
