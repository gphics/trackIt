const ReminderModel = require("../../../Models/ReminderModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return next(activateError(400, "remindr id must be provided"));
    }
    const reminder = await ReminderModel.findById(id);
    if (!reminder) {
      return next(activateError(404, "reminder not found"));
    }
    res.json({ data: reminder });
  } catch (error) {
    next(activateError(400, error.message));
  }
};
