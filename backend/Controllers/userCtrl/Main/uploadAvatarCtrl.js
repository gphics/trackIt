const { configuredCloudinary } = require("../../../Config/cloudinaryStore");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  // if the user didint provide the file
  if (!req.file) {
    return next(activateError("file must be uploaded"));
  }
  // rejecting i the file size is >= 1.3mb
  if (req.file.size > 1572864) {
    return next(activateError("file size must be less than 1.5mb"));
  }

  try {
    // rejecting if the user provide unsupported format
    if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/png"
    ) {
      // uploading the image to cloudinary
      await configuredCloudinary.uploader.upload(
        req.file.path,
        { folder: "trackIt" },
        async (err, result) => {
          if (err) return next(activateError(400, err));
          const { public_id, secure_url } = result;
          const userImgUpload = await UserModel.findByIdAndUpdate(
            req.session.authID,
            { avatar: { url: secure_url, public_id } },
            { new: true }
          );
          res.json({ data: userImgUpload });
        }
      );
    } else {
      return next(
        activateError(`${req.file.mimetype} format not supported`)
      );
    }
  } catch (error) {
    console.log(error);
    next(activateError(error.message));
  }
};
