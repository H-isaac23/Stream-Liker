const videoRouter = require("express").Router();
const Video = require("../models/video");

videoRouter.get("/", async (req, res) => {
  const response = await Video.find({});
  res.json(response);
});

videoRouter.post("/", async (req, res) => {
  const body = req.body;

  if (body.length === 0) {
    return res.status(200).json({ message: "No videos supplied" });
  }

  const promiseArray = [];

  for (let i = 0; i < body.length; i++) {
    const newVideoLiked = new Video({
      dateLiked: new Date(),
      videoId: body[i].streamUrl.slice(20),
      accountName: body[i].accountName,
      accountId: body[i].accountId,
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
