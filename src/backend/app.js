// initial setup
require("express-async-errors");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const config = require("./utils/config");
const url = config.MONGODB_URI;

// router middlewares
const accountRouter = require("./controllers/accounts");
const videoRouter = require("./controllers/videos");

// additional options
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

// establishing connection to database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

// use middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware.requestLogger);

// establish routes
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/videos", videoRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
