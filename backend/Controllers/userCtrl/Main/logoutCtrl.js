const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(activateError(err.message, 400));
    });
    res.clearCookie("trackIt")
    res.json({ data: "logged out ..." });
  } catch (error) {
    next(activateError(error.message));
  }
};
