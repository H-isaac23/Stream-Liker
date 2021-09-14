const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const videoSchema = new mongoose.Schema({
  dateLiked: Date,
  videoId: {
    type: String,
    require: true,
    unique: true,
  },
  accountName: {
    type: String,
    require: true,
  },
  accountId: {
    type: String,
    require: true,
  },
});

videoSchema.plugin(uniqueValidator);
videoSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});

module.exports = mongoose.model("Video", videoSchema);
