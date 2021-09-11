import React, { useState } from "react";
import styles from "./Body.module.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition } from "react-transition-group";
import "./Body.css";
import getStreams from "../../services/getStreams";

const Body = () => {
  const [showing, setShowing] = useState("Like");
  const [streams, setStreams] = useState([]);

  const onClickingLike = async () => {
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
      {
        accountName: "Subaru",
        accountId: "UCvzGlP9oQwU--Y0r9id_jnA",
        __v: 0,
        id: "61383d7dfd82d6748e90bff3",
      },
      {
        accountName: "Rushia",
        accountId: "UCl_gCybOJRIgOXw6Qb4qJzQ",
        __v: 0,
        id: "61383d7efd82d6748e90bff7",
      },
      {
        accountName: "Flare",
        accountId: "UCvInZx9h3jC2JzsIzoOebWg",
        __v: 0,
        id: "61383d7efd82d6748e90bffb",
      },
      {
        accountName: "Noel",
        accountId: "UCdyqAaZDKHXg4Ahi7VENThQ",
        __v: 0,
        id: "61383d7ffd82d6748e90bfff",
      },
      {
        accountName: "Marine",
        accountId: "UCCzUftO8KOVkV4wQG1vkUvg",
        __v: 0,
        id: "61383d80fd82d6748e90c003",
      },
      {
        accountName: "Pekora",
        accountId: "UC1DCedRgGHBdm81E1llLhOQ",
        __v: 0,
        id: "61383d80fd82d6748e90c007",
      },
      {
        accountName: "Kanata",
        accountId: "UCZlDXzGoo7d44bwdNObFacg",
        __v: 0,
        id: "61383d81fd82d6748e90c00b",
      },
      {
        accountName: "Coco",
        accountId: "UCS9uQI-jC3DE0L4IpXyvr6w",
        __v: 0,
        id: "61383d81fd82d6748e90c00f",
      },
      {
        accountName: "Towa",
        accountId: "UC1uv2Oq6kNxgATlCiez59hw",
        __v: 0,
        id: "61383d82fd82d6748e90c013",
      },
      {
        accountName: "Watame",
        accountId: "UCqm3BQLlJfvkTsX_hvm0UmA",
        __v: 0,
        id: "61383d83fd82d6748e90c017",
      },
      {
        accountName: "Luna",
        accountId: "UCa9Y57gfeY0Zro_noHRVrnw",
        __v: 0,
        id: "61383d83fd82d6748e90c01b",
      },
      {
        accountName: "Polka",
        accountId: "UCK9V2B22uJYu3N7eR_BT9QA",
        __v: 0,
        id: "61383d84fd82d6748e90c01f",
      },
      {
        accountName: "Botan",
        accountId: "UCUKD-uaobj9jiqB-VXt71mA",
        __v: 0,
        id: "61383d85fd82d6748e90c023",
      },
      {
        accountName: "Nene",
        accountId: "UCAWSyEs_Io8MtpY3m-zqILA",
        __v: 0,
        id: "61383d85fd82d6748e90c027",
      },
      {
        accountName: "Lamy",
        accountId: "UCFKOVgVbGmX65RxO3EtH3iw",
        __v: 0,
        id: "61383d86fd82d6748e90c02b",
      },
      {
        accountName: "Risu",
        accountId: "UCOyYb1c43VlX9rc_lT6NKQw",
        __v: 0,
        id: "61383d86fd82d6748e90c02f",
      },
      {
        accountName: "Moona",
        accountId: "UCP0BspO_AMEe3aQqqpo89Dg",
        __v: 0,
        id: "61383d87fd82d6748e90c033",
      },
      {
        accountName: "Iofi",
        accountId: "UCAoy6rzhSf4ydcYjJw3WoVg",
        __v: 0,
        id: "61383d88fd82d6748e90c037",
      },
      {
        accountName: "Reine",
        accountId: "UChgTyjG-pdNvxxhdsXfHQ5Q",
        __v: 0,
        id: "61383d88fd82d6748e90c03b",
      },
      {
        accountName: "Ollie",
        accountId: "UCYz_5n-uDuChHtLo7My1HnQ",
        __v: 0,
        id: "61383d89fd82d6748e90c03f",
      },
      {
        accountName: "Anya ",
        accountId: "UC727SQYUvx5pDDGQpTICNWg",
        __v: 0,
        id: "61383d89fd82d6748e90c043",
      },
      {
        accountName: "AZKi",
        accountId: "UC0TXe_LYZ4scaW2XMyi5_kw",
        __v: 0,
        id: "61383d8bfd82d6748e90c047",
      },
      {
        accountName: "Amelia",
        accountId: "UCyl1z3jo3XHR1riLFKG5UAg",
        __v: 0,
        id: "61383d8bfd82d6748e90c04b",
      },
      {
        accountName: "Gura",
        accountId: "UCoSrY_IQQVpmIRZ9Xf-y93g",
        __v: 0,
        id: "61383d8cfd82d6748e90c04f",
      },
      {
        accountName: "Mori",
        accountId: "UCL_qhgtOy0dy1Agp8vkySQg",
        __v: 0,
        id: "61383d8cfd82d6748e90c053",
      },
      {
        accountName: "Kiara",
        accountId: "UCHsx4Hqa-1ORjQTh9TYDhww",
        __v: 0,
        id: "61383d8dfd82d6748e90c057",
      },
      {
        accountName: "Ina",
        accountId: "UCMwGHR0BTZuLsmjY_NT5Pwg",
        __v: 0,
        id: "61383d8efd82d6748e90c05b",
      },
      {
        accountName: "Amatsuka",
        accountId: "UCdYR5Oyz8Q4g0ZmB4PkTD7g",
        __v: 0,
        id: "61383d8efd82d6748e90c05f",
      },
      {
        accountName: "Pikamee",
        accountId: "UCajhBT4nMrg3DLS-bLL2RCg",
        __v: 0,
        id: "61383d8ffd82d6748e90c063",
      },
      {
        accountName: "Sasaki",
        accountId: "UCoztvTULBYd3WmStqYeoHcA",
        __v: 0,
        id: "61383d90fd82d6748e90c067",
      },
      {
        accountName: "Mito",
        accountId: "UCD-miitqNY3nyukJ4Fnf4_A",
        __v: 0,
        id: "61383d90fd82d6748e90c06b",
      },
      {
        accountName: "Lize",
        accountId: "UCZ1xuCK1kNmn5RzPYIZop3w",
        __v: 0,
        id: "61383d91fd82d6748e90c06f",
      },
      {
        accountName: "Asano",
        accountId: "UCODNLyn3L83wEmC0DLL0cxA",
        __v: 0,
        id: "61383d91fd82d6748e90c073",
      },
      {
        accountName: "Rion",
        accountId: "UCV5ZZlLjk5MKGg3L0n0vbzw",
        __v: 0,
        id: "61383d92fd82d6748e90c077",
      },
      {
        accountName: "Sara",
        accountId: "UC9V3Y3_uzU5e-usObb6IE1w",
        __v: 0,
        id: "61383d93fd82d6748e90c07b",
      },
      {
        accountName: "Ui",
        accountId: "UCt30jJgChL8qeT9VPadidSw",
        __v: 0,
        id: "61383d93fd82d6748e90c07f",
      },
      {
        accountName: "Tamaki",
        accountId: "UC8NZiqKx6fsDT3AVcMiVFyA",
        __v: 0,
        id: "61383d94fd82d6748e90c083",
      },
      {
        accountName: "Era",
        accountId: "UCwQ9Uv-m8xkE5PzRc7Bqx3Q",
        __v: 0,
        id: "61383d95fd82d6748e90c087",
      },
      {
        accountName: "Claire",
        accountId: "UC1zFJrfEKvCixhsjNSb1toQ",
        __v: 0,
        id: "61383d95fd82d6748e90c08b",
      },
      {
        accountName: "Shiina",
        accountId: "UC_4tXjqecqox5Uc05ncxpxg",
        __v: 0,
        id: "61383d96fd82d6748e90c08f",
      },
      {
        accountName: "Hana ",
        accountId: "UCpJtk0myFr5WnyfsmnInP-w",
        __v: 0,
        id: "61383d97fd82d6748e90c093",
      },
      {
        accountName: "Furen",
        accountId: "UCuep1JCrMvSxOGgGhBfJuYw",
        __v: 0,
        id: "61383d97fd82d6748e90c097",
      },
      {
        accountName: "Hololive",
        accountId: "UCJFZiqLMntJufDCHc6bQixg",
        __v: 0,
        id: "61383d98fd82d6748e90c09b",
      },
      {
        accountName: "Petit",
        accountId: "UCIG9rDtgR45VCZmYnd-4DUw",
        __v: 0,
        id: "61383d98fd82d6748e90c09f",
      },
      {
        accountName: "Lulu",
        accountId: "UC_a1ZYZ8ZTXpjg9xUY9sj8w",
        __v: 0,
        id: "61383d99fd82d6748e90c0a3",
      },
      {
        accountName: "Roberu",
        accountId: "UCANDOlYTJT7N5jlRC3zfzVA",
        __v: 0,
        id: "61383d9afd82d6748e90c0a7",
      },
      {
        accountName: "Ars",
        accountId: "UCdpUojq0KWZCN9bxXnZwz5w",
        __v: 0,
        id: "61383d9afd82d6748e90c0ab",
      },
      {
        accountName: "Mirei",
        accountId: "UCeShTCVgZyq2lsBW9QwIJcw",
        __v: 0,
        id: "61383d9bfd82d6748e90c0af",
      },
      {
        accountName: "Himawari",
        accountId: "UC0g1AE0DOjBYnLhkgoRWN1w",
        __v: 0,
        id: "61383d9cfd82d6748e90c0b3",
      },
      {
        accountName: "Elira",
        accountId: "UCIeSUTOTkF9Hs7q3SGcO-Ow",
        __v: 0,
        id: "61383d9cfd82d6748e90c0b7",
      },
      {
        accountName: "Pomu",
        accountId: "UCP4nMSTdwU1KqYWu3UH5DHQ",
        __v: 0,
        id: "61383d9dfd82d6748e90c0bb",
      },
      {
        accountName: "Finana",
        accountId: "UCu-J8uIXuLZh16gG-cT1naw",
        __v: 0,
        id: "61383d9dfd82d6748e90c0bf",
      },
      {
        accountName: "Mumei",
        accountId: "UC3n5uGu18FoCy23ggWWp8tA",
        __v: 0,
        id: "61383d9efd82d6748e90c0c3",
      },
      {
        accountName: "Sana",
        accountId: "UCsUj0dszADCGbF3gNrQEuSQ",
        __v: 0,
        id: "61383d9ffd82d6748e90c0c7",
      },
      {
        accountName: "Fauna",
        accountId: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
        __v: 0,
        id: "61383d9ffd82d6748e90c0cb",
      },
      {
        accountName: "Kronii",
        accountId: "UCmbs8T6MWqUHP1tIQvSgKrg",
        __v: 0,
        id: "61383da0fd82d6748e90c0cf",
      },
      {
        accountName: "Hakos",
        accountId: "UCgmPnx-EEeOrZSg5Tiw7ZRQ",
        __v: 0,
        id: "61383da0fd82d6748e90c0d3",
      },
      {
        accountName: "IRyS",
        accountId: "UC8rcEBzJSleTkf_-agPM20g",
        __v: 0,
        id: "61383da1fd82d6748e90c0d7",
      },
    ];
    setShowing("Loading");
    const streamData = await getStreams(accounts);
    console.log(streamData);
    setStreams(streamData);
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
