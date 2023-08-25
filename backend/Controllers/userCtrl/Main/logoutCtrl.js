const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(activateError(err.message));
    });
    res.json({ data: "logged out ..." });
  } catch (error) {
    next(activateError(error.message));
  }
};
