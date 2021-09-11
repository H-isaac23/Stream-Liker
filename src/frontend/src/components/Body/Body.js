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
      {
        accountName: "Mel",
        accountId: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
        __v: 0,
        id: "61383d74fd82d6748e90bfbb",
      },
      {
        accountName: "Haato",
        accountId: "UC1CfXB_kRs3C-zaeTG3oGyg",
        __v: 0,
        id: "61383d75fd82d6748e90bfbf",
      },
      {
        accountName: "Sora",
        accountId: "UCp6993wxpyDPHUpavwDFqgg",
        __v: 0,
        id: "61383d76fd82d6748e90bfc3",
      },
      {
        accountName: "Roboco",
        accountId: "UCDqI2jOz0weumE8s7paEk6g",
        __v: 0,
        id: "61383d76fd82d6748e90bfc7",
      },
      {
        accountName: "Miko",
        accountId: "UC-hM6YJuNYVAmUWxeIr9FeA",
        __v: 0,
        id: "61383d77fd82d6748e90bfcb",
      },
      {
        accountName: "Suisei",
        accountId: "UC5CwaMl1eIgY8h02uZw7u8A",
        __v: 0,
        id: "61383d77fd82d6748e90bfcf",
      },
      {
        accountName: "Korone",
        accountId: "UChAnqc_AY5_I3Px5dig3X1Q",
        __v: 0,
        id: "61383d78fd82d6748e90bfd3",
      },
      {
        accountName: "Okayu",
        accountId: "UCvaTdHTWBGv3MKj3KVqJVCw",
        __v: 0,
        id: "61383d79fd82d6748e90bfd7",
      },
      {
        accountName: "Mio",
        accountId: "UCp-5t9SrOQwXMU7iIjQfARg",
        __v: 0,
        id: "61383d79fd82d6748e90bfdb",
      },
      {
        accountName: "Aqua",
        accountId: "UC1opHUrw8rvnsadT-iGp7Cg",
        __v: 0,
        id: "61383d7afd82d6748e90bfdf",
      },
      {
        accountName: "Shion",
        accountId: "UCXTpFs_3PqI41qX2d9tL2Rw",
        __v: 0,
        id: "61383d7bfd82d6748e90bfe3",
      },
      {
        accountName: "Ayame ",
        accountId: "UC7fk0CB07ly8oSl0aqKkqFg",
        __v: 0,
        id: "61383d7bfd82d6748e90bfe7",
      },
      {
        accountName: "Choco",
        accountId: "UC1suqwovbL1kzsoaZgFZLKg",
        __v: 0,
        id: "61383d7cfd82d6748e90bfeb",
      },
      {
        accountName: "ChocoSub",
        accountId: "UCp3tgHXw_HI0QMk1K8qh3gQ",
        __v: 0,
        id: "61383d7cfd82d6748e90bfef",
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
