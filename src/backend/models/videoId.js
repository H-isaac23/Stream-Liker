const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const videoIdSchema = new mongoose.Schema({
  dateLiked: Date,
  videoId: {
    type: String,
    require: true,
    unique: true,
  },
});

videoIdSchema.plugin(uniqueValidator);
videoIdSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});

module.exports = mongoose.model("Video", videoIdSchema);
