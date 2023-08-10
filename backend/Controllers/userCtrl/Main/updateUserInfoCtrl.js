const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next)=> {
  const { password, email, ...rest } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(req.session.authID, rest, {
      new: true,
    });
    res.json({data: user});
  } catch (error) {
    next(activateError(400, error.message));
  }
}