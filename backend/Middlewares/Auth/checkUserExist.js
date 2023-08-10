const UserModel = require("../../Models/UserModel");
const activateError = require("../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) throw new Error("user already exist");
    next();
  } catch (error) {
    return next(activateError(400, error.message));
  }
};
