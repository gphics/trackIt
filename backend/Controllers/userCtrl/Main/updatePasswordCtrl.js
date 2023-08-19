const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (
    !oldPassword ||
    !newPassword ||
    oldPassword.length < 6 ||
    newPassword.length < 6
  ) {
    return next(
      activateError(400, "password field length must be greater than 7")
    );
  }
  try {
    const user = await UserModel.findById(req.session.authID);
    const compared = await bcrypt.compare(oldPassword, user.password);
    if (!compared) {
      return next(activateError(400, "invalid credentials"));
    }
    // if compared === true
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    const data = await user.save();
    if (data) {
      console.log(data);
      res.json({ data: "password updated" });
    }
  } catch (error) {
    next(activateError(400, error.message));
  }
};
