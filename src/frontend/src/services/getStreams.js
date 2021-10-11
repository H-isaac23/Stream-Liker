const axios = require("axios");
const baseUrl =
  process.env.REACT_APP_CORS_ANYWHERE_URL + "https://www.youtube.com/channel/";
const apiUrl = "/api/v1/accounts";

const getStreams = async (accounts, isMobile) => {
  const textSearch = isMobile ? "watching" : '{"text":" watching"}';
  const urlSearch = isMobile ? "videoId" : '"url"';

  const promiseArray = accounts.map(async (account) => {
    const res = await axios.get(baseUrl + account.accountId);
    const streamer = { ...account };

    const index = res.data.search(textSearch);

    if (index > 0 && index < 400000) {
      const sliced = res.data.slice(index);
      const url = sliced.search(urlSearch);
      if (isMobile) {
        streamer.streamUrl =
          "youtube.com/watch?v=" + sliced.slice(url + 16, url + 27);
      } else {
        streamer.streamUrl = "youtube.com" + sliced.slice(url + 7, url + 27);
      }
    }
    return streamer;
  });

  const response = await Promise.all(promiseArray);
  const activeStreams = response.filter((streamer) =>
    streamer.hasOwnProperty("streamUrl")
  );

  if (activeStreams.length >= 1) {
    return activeStreams;
  } else {
    return [{ message: "No Streams Available" }];
  }
};

const getAccounts = async () => {
  return await axios.get(apiUrl);
};

const service = { getStreams, getAccounts };
export default service;
