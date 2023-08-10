const activateError = require("../../Utils/activateError");

module.exports = (req, res, next) => {
  if (req.session.authID)
    return next(activateError(401, "you are authenticated already"));
  next();
};
