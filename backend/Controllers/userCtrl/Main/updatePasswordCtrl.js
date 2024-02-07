const jwtVerify = require("../../../Config/jwtVerify");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  if (
    !oldPassword ||
    !newPassword ||
    oldPassword.length < 6 ||
    newPassword.length < 6
  ) {
    return next(activateError("password field length must be greater than 6"));
  }
  if (oldPassword === newPassword) {
    return next(activateError("the two passwords cannot be the same"))
  }
  try {
    const user = await UserModel.findOne({ email: data.email });
    const compared = await bcrypt.compare(oldPassword, user.password);
    if (!compared) {
      return next(activateError("invalid credentials"));
    }
    // if compared === true
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.json({ data: { data: "password updated", auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
