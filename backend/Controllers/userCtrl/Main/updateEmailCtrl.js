const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next)=> {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.session.authID,
      req.body,
      { new: true }
    );
    res.json({ data: user });
  } catch (error) {
    next(activateError(400, error.message));
  }
}; 