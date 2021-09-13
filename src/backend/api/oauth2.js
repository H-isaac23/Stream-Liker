require("dotenv").config();
const http = require("http");
const url = require("url");
const opn = require("open");
const { google } = require("googleapis");
const destroyer = require("server-destroy");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URI;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

google.options({ auth: oauth2Client });

const authenticate = async () => {
  return new Promise((resolve, reject) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scope,
    });

    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf("/oauth2callback" > -1)) {
          const qs = new url.URL(req.url, "http://localhost:5000").searchParams;
          res.end("Authentication successful! Please return to the console.");
          server.destroy();
          const { tokens } = await oauth2Client.getToken(qs.get("code"));
          console.log(tokens);
          oauth2Client.credential = tokens;
          resolve(oauth2Client);
        }
      } catch (e) {
        reject(e);
      }
    });

    server.listen(5000, () => {
      opn(authUrl, { wait: false }).then((cp) => cp.unref());
    });

    destroyer(server);
  });
};

const scope = ["https://www.googleapis.com/auth/youtube"];
authenticate(scope).then((client) => console.log(client.credentials));
