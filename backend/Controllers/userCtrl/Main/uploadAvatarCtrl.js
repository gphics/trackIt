const { configuredCloudinary } = require("../../../Config/cloudinaryStore");
const jwtVerify = require("../../../Config/jwtVerify");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  // if the user didint provide the file
  if (!req.file) {
    return next(activateError("file must be uploaded"));
  }
  // rejecting if the file size is >= 1.3mb
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
          if (err) return next(activateError(err.message));
          const { public_id, secure_url } = result;
          const userImgUpload = await UserModel.findOneAndUpdate(
            { email: data.email },
            { avatar: { url: secure_url, public_id } },
            { new: true }
          );
          res.json({
            data: { data: "upload successful", auth_token },
            err: null,
          });
        }
      );
    } else {
      return next(activateError(`${req.file.mimetype} format not supported`));
    }
  } catch (error) {
    next(activateError(error.message));
  }
};
