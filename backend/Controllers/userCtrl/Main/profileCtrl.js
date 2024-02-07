const jwtVerify = require("../../../Config/jwtVerify");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(activateError(err));
    }
    const user = await UserModel.findOne({ email: data.email })
      .populate("Debts")
      .populate("Reminders");
    res.json({ data: { data: user, auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
