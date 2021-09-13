const videoRouter = require("express").Router();
const Video = require("../models/video");

videoRouter.get("/", async (req, res) => {
  const response = await Video.find({});
  res.json(response);
});

videoRouter.post("/", async (req, res) => {
  const body = req.body;
  const newVideoLiked = new Video({
    dateLiked: new Date(),
    videoId: body.videoId,
  });

  await newVideoLiked.save();
  res.status(200).end();
});
