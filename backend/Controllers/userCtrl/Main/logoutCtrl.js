const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    res.json({ data: { data: "logged out ..." }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
