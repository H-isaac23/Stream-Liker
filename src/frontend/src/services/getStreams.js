const axios = require("axios");
const baseUrl =
  "https://protected-coast-46250.herokuapp.com/https://www.youtube.com/channel/";

const getStreams = async (accounts) => {
  const promiseArray = accounts.map(async (account) => {
    const response = await axios.get(baseUrl + account.accountId);
    return response;
  });
  console.log(promiseArray);
  console.time("do this");

  const streamers = await Promise.all(promiseArray);

  console.timeEnd("do this");
  console.log(streamers);

  const streamsData = streamers.filter(
    // eslint-disable-next-line quotes
    (stream) => stream.data.search('{"text":" watching"}') > 0
  );

  streamsData.forEach((stream) => {
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].accountId === stream.config.url.slice(32)) {
        // eslint-disable-next-line quotes
        const index = stream.data.search('{"text":" watching"}');
        const log = stream.data.slice(index);
        // eslint-disable-next-line quotes
        const url_index = log.indexOf('{"url":"/watch?v=');
        accounts[i].streamId = log.slice(url_index + 17, url_index + 28);
        break;
      }
    }
  });

  const streams = streamsData.map((stream) => stream.config.url.slice(32));

  const activeStreamers = accounts.filter((account) =>
    streams.includes(account.accountId)
  );

  console.log(activeStreamers, "hi");

  // return { data: activeStreamers };
};

// getStreams(accounts);

export default getStreams;
