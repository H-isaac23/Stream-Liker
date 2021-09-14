const axios = require("axios");
const baseUrl = "http://localhost:5000/api/v1/videos";

const appendToDb = async (videos) => {
  return await axios.post(baseUrl, videos);
};

const getLikedVideos = async () => {
  return await axios.get(baseUrl);
};

const videoService = { appendToDb, getLikedVideos };

export default videoService;
