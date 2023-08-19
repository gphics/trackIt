const sendMail = require("../../../Config/sendMail");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const randomNumberGen = require("../../../Utils/randomNumberGen");
const bcrypt = require("bcryptjs");
module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(activateError("email not provided"));
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(activateError("user does not exist"));
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = randomNumberGen();
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    const html = `
    <div>
    <h1> Your new trackIt password is ${newPassword} </h1>
    </div>
    `;
    sendMail(email, "Password reset", html);
    res.json({
      data: "Your new password has been sent to the provided email, if email not delivered click on the reset button again",
    });
  } catch (error) {
    next(activateError(error.message));
  }
};
