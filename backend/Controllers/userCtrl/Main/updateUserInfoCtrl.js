const jwtVerify = require("../../../Config/jwtVerify");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  const { avatar, password, email, ...rest } = req.body;
  try {
    await UserModel.findOneAndUpdate({ email: data.email }, rest, {
      new: true,
    });
    res.json({ data: { auth_token, data: "update successful" }, err: null });
  } catch (error) {
    next(activateError(400, error.message));
  }
};
