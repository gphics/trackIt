const mongoose = require("mongoose");
require("dotenv").config();
async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {}
}

module.exports = dbConnect;

//
