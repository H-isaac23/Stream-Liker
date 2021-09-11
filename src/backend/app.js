require("express-async-errors");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");
const url = config.MONGODB_URI;
const accountRouter = require("./controllers/accounts");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/v1/accounts", accountRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
