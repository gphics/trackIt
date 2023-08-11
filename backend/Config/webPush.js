require("dotenv").config();
const webPush = require("web-push");
const privateKey = "1IGcvU21Vp8heu9pKD2-ODFXDAJJYkqvDeXlZpuSntc";
const publicKey =
  "BP6wc7uBiJ-S1LbydpZM7-WRsh2X1dUqcnOWL-TqCgiB9UblBfT0XBrTt2JzrjvAKZtiobBIDJCRsyZzcAUMWsw";


webPush.setVapidDetails(
  "mailto:abdulbasitabdulakeem234@gmail.com",
  publicKey,
  privateKey
);

// console.log(webPush.generateVAPIDKeys());

module.exports = webPush;
