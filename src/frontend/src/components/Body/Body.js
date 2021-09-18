import React, { useState } from "react";
import styles from "./Body.module.scss";
import ActiveStreams from "../Streams/ActiveStreams";
import { isMobile } from "react-device-detect";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition } from "react-transition-group";
import "./Body.css";
import service from "../../services/getStreams";
import videoService from "../../services/videos";

const Body = () => {
  const [showing, setShowing] = useState("Like");
  const [streams, setStreams] = useState([]);

  const onClickingLike = async (mobile) => {
    // show the loading portion
    setShowing("Loading");

    // get accounts for checking and videos for filtering
    const accounts = await service.getAccounts();
    let likedVideos = await videoService.getLikedVideos();
    likedVideos = likedVideos.data.map((video) => video.videoId);

    // get active streams
    const streamData = await service.getStreams(accounts.data, mobile);
    console.log(streamData);
    const toAppend = streamData.filter(
      (stream) => !likedVideos.includes(stream.streamUrl.slice(20))
    );

    // TODO: Like videos
    await videoService.likeVideos(toAppend);

    // append filtered streams to db
    await videoService.appendToDb(toAppend);

    // show active streams
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
        <LikeButton onClick={() => onClickingLike(isMobile)} />
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
        <div>
          <Return onClick={() => setShowing("Like")} />
          <Streams streams={streams} />
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

const Streams = ({ streams }) => {
  return (
    <div>
      {streams.map((stream) => (
        <ActiveStreams
          key={stream.accountId}
          name={stream.accountName}
          url={"https://www.youtube.com/watch?v=" + stream.streamUrl.slice(20)}
        />
      ))}
    </div>
  );
};

const Return = ({ onClick }) => {
  return (
    <div className={styles.returnButton}>
      <button onClick={onClick}>Return</button>
    </div>
  );
};

export default Body;
