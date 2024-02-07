const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const bcrypt = require("bcryptjs");
const randomNumberGen = require("../../../Utils/randomNumberGen");
const sendMail = require("../../../Config/sendMail");
const nodeCron = require("node-cron");
const { DFAString } = require("../../../Utils/cronStringGenerators");
const jwtSign = require("../../../Config/jwtSign");

module.exports = async (req, res, next) => {
  const { password, email } = req.body;
  // checking the authenticity of the provided info
  if (!password || password.length < 6 || !email)
    return next(
      activateError("field must be filled and password length must be up to 6")
    );
  try {
    // fetching the user using the provided email
    const user = await UserModel.findOne({ email });

    // throwing an error if the user does not exist
    if (!user) return next(activateError("invalid credentials"));
    // decoding the password
    const decodedPassword = await bcrypt.compare(password, user.password);

    // if the inputed password is correct
    if (!decodedPassword) {
      return next(activateError("invalid credentials"));
    }

    const auth_token = jwtSign({ email });

    return res.json({
      data: { auth_token, data: "logged in successfully" },
      err: null,
    });
  } catch (error) {
    next(activateError(error.message));
  }
};
