const jwtVerify = require("../../../Config/jwtVerify");
const jwtSign = require("../../../Config/jwtSign");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  if (!email || typeof email !== "string") {
    return next(activateError("email not provided"));
  }
  try {
    const user = await UserModel.findOneAndUpdate(
      { email: data.email },
      req.body,
      {
        new: true,
      }
    );
    if (!user) {
      return next(
        activateError(`user with the email ${data.email} does not exist`)
      );
    }
    const auth_token = jwtSign({ email });
    res.json({ data: { data: "email updated", auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
