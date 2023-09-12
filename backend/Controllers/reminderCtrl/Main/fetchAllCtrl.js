const ReminderModel = require("../../../Models/ReminderModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  
  try {
    const reminders = await ReminderModel.find({ user: req.session.authID });
    res.json({ data: reminders });
  } catch (error) {
    next(activateError(error.message));
  }
};
