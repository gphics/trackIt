const ReminderModel = require("../../../Models/ReminderModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { auth_token } = req.query;

  try {
    if (!id) {
      return next(activateError("reminder id must be provided"));
    }
    const reminder = await ReminderModel.findById(id);
    if (!reminder) {
      return next(activateError("reminder not found", 404));
    }
    res.json({ data: { data: reminder, auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
