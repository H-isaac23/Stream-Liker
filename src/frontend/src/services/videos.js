const axios = require("axios");
const baseUrl = "http://localhost:5000/api/v1/videos";

const appendToDb = async (videos) => {
  return await axios.post(baseUrl, videos);
};

const getLikedVideos = async () => {
  return await axios.get(baseUrl);
};

const likeVideos = async (streams) => {
  return await axios.post(baseUrl + "/like", streams);
};

const videoService = { appendToDb, getLikedVideos, likeVideos };

export default videoService;
