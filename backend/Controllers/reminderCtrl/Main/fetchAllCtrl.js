const ReminderModel = require("../../../Models/ReminderModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { authID } = req.session;
  try {
    const reminders = await ReminderModel.find({ user: authID });
    res.json({ data: reminders });
  } catch (error) {
    next(activateError(error.message));
  }
};
