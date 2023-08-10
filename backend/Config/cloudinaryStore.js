require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
/*

cloudinary.config({
  cloud_name: "dtu3jive9",
  api_key: "312329342534745",
  api_secret: "HS2zpixCKN85GIh2jSB5rRb_-80",
  secure:true,
});
*/
const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
module.exports = { upload, configuredCloudinary: cloudinary };
