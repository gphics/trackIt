const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { state } = req.body;
    if (state === null) {
      return next(activateError(404, "activate state must be provided"));
    }
    const user = await UserModel.findById(req.session.authID);
    const action = state === false ? "deactivated" : "activated";
    if (user.dual_factor_auth.state === state) {
      return next(
        activateError(400, `dual factor authentication ${action} already`)
      );
    }
    user.dual_factor_auth.state = state;
    await user.save();
    res.json({ data: `Dual factor ${action}` });
  } catch (error) {
    next(activateError(500, error.message));
  }
};
