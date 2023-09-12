const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const reminder = await ReminderModel.findByIdAndDelete(id);
    if (!reminder) {
      return next(activateError("reminder not found", 404));
    }
    const user = await UserModel.findById(req.session.authID);
    user.Reminders = user.Reminders.filter((elem) => elem.toString() !== id);
    await user.save();
    res.json({ data: "reminder deleted"});
  } catch (error) {
    next(activateError(error.message));
  }
};
