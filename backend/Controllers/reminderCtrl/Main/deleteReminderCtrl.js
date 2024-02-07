const jwtVerify = require("../../../Config/jwtVerify");
const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  try {
    const reminder = await ReminderModel.findByIdAndDelete(id);
    if (!reminder) {
      return next(activateError("reminder not found", 404));
    }
    const user = await UserModel.findOne({ email: data.email });
    user.Reminders = user.Reminders.filter((elem) => elem.toString() !== id);
    await user.save();
    res.json({ data: { auth_token, data: "reminder deleted" }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
