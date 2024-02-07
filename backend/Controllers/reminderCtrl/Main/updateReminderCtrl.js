const jwtVerify = require("../../../Config/jwtVerify");
const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const reminderUpdated = require("../cron/reminderUpdated");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  try {
    const user = UserModel.findOne({ email: data.email });
    const reminder = await ReminderModel.findByIdAndUpdate(
      id,
      { ...req.body, isUpdated: true },
      { new: true }
    );
    const { dueDate } = reminder;
    // setting the cron job
    reminderUpdated(
      dueDate,
      id,
      user._id,
      reminder.repeat,
      reminder.repetitionInterval
    );
    // returning the updated reminder
    res.json({ data: { data: reminder._id, auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
