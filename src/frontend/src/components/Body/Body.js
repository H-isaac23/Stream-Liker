import React, { useState } from "react";
import styles from "./Body.module.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition } from "react-transition-group";
import "./Body.css";
import service from "../../services/getStreams";

const Body = () => {
  const [showing, setShowing] = useState("Like");
  const [streams, setStreams] = useState([]);

  const onClickingLike = async () => {
    setShowing("Loading");
    const accounts = await service.getAccounts();
    const streamData = await service.getStreams(accounts.data);
    setStreams(streamData);
    setShowing("Streams");
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
      <CSSTransition
        in={showing === "Streams"}
        unmountOnExit
        timeout={1000}
        classNames="bodyStreams"
      >
        <Streams streams={streams} />
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

const Streams = ({ streams }) => {
  return (
    <div>
      {streams.map((stream) => (
        <p key={stream.accountId}>{stream.accountName}</p>
      ))}
    </div>
  );
};

export default Body;
