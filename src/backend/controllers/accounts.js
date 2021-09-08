const accountRouter = require("express").Router();
const Account = require("../models/account");

accountRouter.get("/", async (req, res) => {
  const accounts = await Account.find({});
  res.json(accounts);
});

accountRouter.post("/", async (req, res) => {});
