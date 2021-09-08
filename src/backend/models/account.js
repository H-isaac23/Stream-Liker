const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const accountSchema = new mongoose.Schema({
  accountName: String,
  accountId: {
    type: String,
    require: true,
    unique: true,
  },
});

accountSchema.plugin(uniqueValidator);
accountSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
  },
});

module.exports = mongoose.model("Account", accountSchema);
