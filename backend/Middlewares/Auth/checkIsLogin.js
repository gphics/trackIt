const activateError = require("../../Utils/activateError");

module.exports = (req, res, next) => {
  if (req.session.authID) return next();
  return next(activateError(401, "you are not authenticated"));
};
