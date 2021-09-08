const accountRouter = require("express").Router();
const Account = require("../models/account");

accountRouter.get("/", async (req, res) => {
  const accounts = await Account.find({});
  res.json(accounts);
});

accountRouter.post("/", async (req, res) => {
  const body = req.body;
  const newAccount = new Account({
    accountName: body.accountName,
    accountId: body.accountId,
  });

  await newAccount.save();
  res.status(200).end();
});

module.exports = accountRouter;
