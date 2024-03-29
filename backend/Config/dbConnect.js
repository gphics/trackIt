const mongoose = require("mongoose");
require("dotenv").config();
async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;

//
