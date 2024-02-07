const jwtVerify = require("../../../Config/jwtVerify");
const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const reminderCreated = require("../cron/reminderCreated");

module.exports = async (req, res, next) => {
  const { title, dueDate, repeat, repetitionInterval, note } = req.body;
  if (!title || !note || !dueDate) {
    return next(activateError("required field must be provided"));
  }
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  try {
    const user = await UserModel.findOne({ email: data.email });
    const reminder = await ReminderModel.create({
      title,
      dueDate,
      repeat,
      repetitionInterval,
      note,
      user: user._id,
    });
    // updating the user obj

    user.Reminders.push(reminder._id);
    await user.save();
    // activating the cron operation
    reminderCreated(dueDate, reminder._id, user._id);
    // sending the created reminder
    res.json({ data: { data: reminder._id, auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
