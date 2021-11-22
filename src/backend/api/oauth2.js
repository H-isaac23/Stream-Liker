require("dotenv").config();
const http = require("http");
const url = require("url");
const opn = require("open");
const fs = require("fs");
const { google } = require("googleapis");
const destroyer = require("server-destroy");

const videoLiker = (streams) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URL = process.env.REDIRECT_URI;
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  const videoUrls = streams.map((stream) => stream.streamUrl.slice(20));

  google.options({ auth: oauth2Client });
  const scope = ["https://www.googleapis.com/auth/youtube"];
  const authenticate = async () => {
    return new Promise((resolve, reject) => {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scope,
      });

      const server = http.createServer(async (req, res) => {
        try {
          if (req.url.indexOf("/oauth2callback" > -1)) {
            const qs = new url.URL(req.url, "http://localhost:5000")
              .searchParams;
            res.end("Authentication successful! Please return to the console.");
            server.destroy();
            const { tokens } = await oauth2Client.getToken(qs.get("code"));
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

  let credjson = fs.readFileSync("credentials.json", "utf-8");
  let credentials = JSON.parse(credjson);

  const likeVideo = (auth, v_id) => {
    console.log("Liking video...");
    const service = google.youtube("v3");
    service.playlistItems.insert(
      {
        auth: auth,
        part: "snippet",
        requestBody: {
          snippet: {
            playlistId: "LL",
            resourceId: {
              kind: "youtube#video",
              videoId: v_id,
            },
          },
        },
      },
      function (err) {
        if (err) {
          console.log(err.errors[0].message);
          return;
        }

        console.log("Liked video");
      }
    );
  };

  if (credentials.length === 0 || JSON.stringify(credentials)[0] === "{}") {
    authenticate().then((client) => {
      credentials = [client.credential];
      credjson = JSON.stringify(credentials);
      fs.writeFileSync("credentials.json", credjson, "utf-8");
      for (let i = 0; i < videoUrls.length; i++) {
        likeVideo(oauth2Client, videoUrls[i]);
      }
    });
  } else {
    const tokens = credentials[0];
    oauth2Client.setCredentials(tokens);
    oauth2Client.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        // console.log(tokens.refresh_token);
      }
      // console.log(tokens.access_token);
    });

    for (let i = 0; i < videoUrls.length; i++) {
      if (videoUrls[i]) {
        likeVideo(oauth2Client, videoUrls[i]);
      }
    }
  }
};

module.exports = videoLiker;
