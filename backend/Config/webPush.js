require("dotenv").config();
const webPush = require("web-push");
const privateKey = process.env.WEB_PUSH_PRIVATE_KEY;
const publicKey = process.env.WEB_PUSH_PUBLIC_KEY;

webPush.setVapidDetails(
  "mailto:abdulbasitabdulakeem234@gmail.com",
  publicKey,
  privateKey
);

module.exports = webPush;
