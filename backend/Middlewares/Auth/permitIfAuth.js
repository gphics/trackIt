const jwtSign = require("../../Config/jwtSign");
const jwtVerify = require("../../Config/jwtVerify");
const activateError = require("../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    if (!auth_token) {
      return next(activateError("you are not authenticated", 401));
    }
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      next(activateError(err));
      return;
    }
    const { email } = data;
    const newToken = jwtSign({ email });
    req.query.auth_token = newToken;
    next();
  } catch (error) {
    next(activateError(error.message));
  }
};
