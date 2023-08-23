const activateError = require("../../Utils/activateError");

module.exports = (req, res, next) => {
  console.log(req.session.authID);
  if (req.session.authID) return next();
  return next(activateError("you are not authenticated", 401));
};
