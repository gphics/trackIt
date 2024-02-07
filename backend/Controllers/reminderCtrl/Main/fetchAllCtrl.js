const jwtVerify = require("../../../Config/jwtVerify");
const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  console.log("from all");
  if (err) {
    return next(activateError(err));
  }
  try {
    const user = await UserModel.findOne({ email: data.email }).populate("Reminders");
    res.json({ data: { auth_token, data: user.Reminders }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
