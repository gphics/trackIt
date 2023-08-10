const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const reminderCreated = require("../cron/reminderCreated");

module.exports = async (req, res, next) => {
  const { title, dueDate, repeat, repetitionInterval, note } = req.body;
  if (!title || !note || !dueDate) {
    return next(activateError(404, "required field must be provided"));
  }
  try {
    const reminder = await ReminderModel.create({
      title,
      dueDate,
      repeat,
      repetitionInterval,
      note,
      user: req.session.authID,
    });
    // updating the user obj
    const user = await UserModel.findById(req.session.authID);
    user.Reminders.push(reminder._id);
    await user.save();
    // activating the cron operation
    reminderCreated(dueDate, reminder._id, req.session.authID);
    // sending the created reminder
    res.json({ data: reminder });
  } catch (error) {
    next(activateError(400, error.message));
  }
};


