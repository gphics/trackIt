const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { passcode } = req.body;
  if (!passcode) {
    return next(activateError("passcode required"));
  }
  try {
    const email = req.session.authEmail;
    const user = await UserModel.findOne({ email });
    if (!email || user.dual_factor_auth.passcode === 0) {
      return next(activateError("passcode expired"));
    }
    if (user.dual_factor_auth.passcode !== passcode) {
      return next(activateError("incorrect passcode"));
    }
    req.session.authID = user._id;
    req.session.authEmail = null;
    user.dual_factor_auth.passcode = 0;
    await user.save();
    res.json({ data: user });
  } catch (error) {
    next(activateError(error.message));
  }
};
