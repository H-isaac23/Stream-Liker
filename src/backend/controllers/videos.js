const videoRouter = require("express").Router();
const Video = require("../models/video");

videoRouter.get("/", async (req, res) => {
  const response = await Video.find({});
  res.json(response);
});

videoRouter.post("/", async (req, res) => {
  const body = req.body;

  if (body.length === 0) {
    return res.status(400).json({ error: "No videos supplied" });
  }

  const promiseArray = [];

  for (let i = 0; i < body.length; i++) {
    const newVideoLiked = new Video({
      dateLiked: new Date(),
      videoId: body[i].videoId,
    });

    promiseArray.push(newVideoLiked.save());
  }

  await Promise.all(promiseArray);

  res.status(200).end();
});

videoRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndRemove(id);

  res.status(200).end();
});

module.exports = videoRouter;
