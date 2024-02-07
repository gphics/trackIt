const jwtVerify = require("../../../Config/jwtVerify");
const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(activateError(err));
    }
    const user = await UserModel.findOne({ email: data.email });
    const allMyDebts = await DebtModel.find({ user: user._id });
    res.json({ data: { auth_token, data: allMyDebts }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
