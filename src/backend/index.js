const http = require("http");
const app = require("./app");
const config = require("./utils/config");

const server = http.createServer(app);
const PORT = config.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server listening to PORT", PORT);
});
