const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.authID)
      .populate("Debts")
      .populate("Reminders");
    res.json({ data: user });
  } catch (error) {
    next(activateError(error.message));
  }
};
