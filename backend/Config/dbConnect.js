const mongoose = require("mongoose");
require("dotenv").config()
async function dbConnect() {
  try {
    const data = await mongoose.connect(process.env.DB_URL);
    if (data) console.log("db connected ....");
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;

//
