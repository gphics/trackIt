const ReminderModel = require("../../../Models/ReminderModel");
const activateError = require("../../../Utils/activateError");
const reminderUpdated = require("../cron/reminderUpdated");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
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
      req.session.authID,
      reminder.repeat,
      reminder.repetitionInterval
    );
    // returning the updated reminder
    res.json({ data: reminder });
  } catch (error) {
    next(activateError(400, error.message));
  }
};
