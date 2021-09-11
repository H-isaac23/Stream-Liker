const axios = require("axios");
const baseUrl =
  process.env.REACT_APP_CORS_ANYWHERE_URL + "https://www.youtube.com/channel/";

const getStreams = async (accounts) => {
  const promiseArray = accounts.map(async (account) => {
    const res = await axios.get(baseUrl + account.accountId);
    const streamer = { ...account };
    const index = res.data.search('{"text":" watching"}');
    if (index > 0) {
      const sliced = res.data.slice(index);
      const url = sliced.search('"url"');
      streamer.streamUrl = "youtube.com" + sliced.slice(url + 7, url + 27);
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
    return ["No Streams Available"];
  }
};

// getStreams(accounts);

export default getStreams;
