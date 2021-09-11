const axios = require("axios");
const baseUrl = "https://www.youtube.com/channel/";

const getStreams = async (accounts) => {
  // const promiseArray = accounts.map((account) =>
  //   axios.get(baseUrl + account.accountId)
  // );

  console.time("do this");

  const streamers = await Promise.all(
    accounts.map(async (account) => {
      await axios.get(baseUrl + account.accountId);
    })
  );

  console.timeEnd("do this");

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

  return { data: activeStreamers };
};

module.exports = getStreams;

// getStreams([
//   {
//     accountName: "Fubuki",
//     accountId: "UCdn5BQ06XqgXoAxIhbqw5Rg",
//     __v: 0,
//     id: "61383d71fd82d6748e90bfaf",
//   },
//   {
//     accountName: "Matsuri",
//     accountId: "UCQ0UDLQCjY0rmuxCDE38FGg",
//     __v: 0,
//     id: "61383d73fd82d6748e90bfb3",
//   },
//   {
//     accountName: "Aki",
//     accountId: "UCFTLzh12_nrtzqBPsTCqenA",
//     __v: 0,
//     id: "61383d74fd82d6748e90bfb7",
//   },
//   {
//     accountName: "Mel",
//     accountId: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
//     __v: 0,
//     id: "61383d74fd82d6748e90bfbb",
//   },
//   {
//     accountName: "Amelia",
//     accountId: "UCyl1z3jo3XHR1riLFKG5UAg",
//     __v: 0,
//     id: "61383d8bfd82d6748e90c04b",
//   },
//   {
//     accountName: "Mori",
//     accountId: "UCL_qhgtOy0dy1Agp8vkySQg",
//     __v: 0,
//     id: "61383d8cfd82d6748e90c053",
//   },
//   {
//     accountName: "Sana",
//     accountId: "UCsUj0dszADCGbF3gNrQEuSQ",
//     __v: 0,
//     id: "61383d9ffd82d6748e90c0c7",
//   },
// ]);
