const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);

  next();
};

const errorHandler = (err, req, res) => {
  return res.status(400).json({
    name: err.name,
    message: err.message,
  });
};

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ error: "unknown endpoint" });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
