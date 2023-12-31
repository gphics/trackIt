const activateError = require("../../Utils/activateError");

module.exports = (req, res, next) => {
  if (req.session.authID) {
    return next(activateError("you are authenticated already"));
  }
  return next();
};
