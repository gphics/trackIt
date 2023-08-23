const UserModel = require("../../Models/UserModel");
const activateError = require("../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(activateError("email must be provided"));
  }
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return next(activateError("user already exist"));
    }
    next();
  } catch (error) {
    return next(activateError(error.message));
  }
};
