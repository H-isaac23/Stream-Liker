import styles from "./Footer.module.scss";

const Footer = () => {
  const reddit_site = "https://www.reddit.com/r/Hololive/";
  const twitter_site = "https://twitter.com/dev__holo";
  const github_site = "https://github.com/H-isaac23";

  return (
    <div className={styles.footerContainer}>
      <p className={styles.projectName}>"Stream Liker" Project</p>
      <p className={styles.socials}>
        <a href={github_site} target="_blank" rel="noreferrer">
          Github
        </a>
        <a href={twitter_site} target="_blank" rel="noreferrer">
          Twitter
        </a>
        <a href={reddit_site} target="_blank" rel="noreferrer">
          Reddit
        </a>
      </p>
      <div className={styles.c}>
        <p>© 2021 Stream-Liker</p>
      </div>
    </div>
  );
};

export default Footer;
