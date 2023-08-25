const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const bcrypt = require("bcryptjs");
const randomNumberGen = require("../../../Utils/randomNumberGen");
const sendMail = require("../../../Config/sendMail");
const nodeCron = require("node-cron");
const { DFAString } = require("../../../Utils/cronStringGenerators");

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
    // getting DFA state
    const { state } = user.dual_factor_auth;
    // if DFA state === false
    if (!state) {
      req.session.authID = user._id;
      req.session.cookie.auth = user._id;
      return res.json({ data: user });
    }
    // if DFA state === true
    if (state) {
      req.session.authEmail = email;
      const passcode = randomNumberGen();
      // sending the OTP to the user email
      const html = `
      <html>
      <style>
      h1{
        color:"orangered";
        width:90vw;
        margin: 10px auto;
        text-align: center
      }
      </style>
      <body>
      <h3> your one time dual factor authentication passcode </h3>
      <h1> ${passcode} </h1>
      <h5> OTP expires in the next 10 minutes </h5>
      </body>
      </html>
    `;
      sendMail(email, "OTP from TrackIt", html);

      // updating the user data
      user.dual_factor_auth.passcode = passcode;
      await user.save();

      // setting an asynchronous function using node-cron to delete the passcode
      // after 10 mins
      nodeCron.schedule(DFAString(), async () => {
        user.dual_factor_auth.passcode = 0;
        req.session.authEmail = null;
        await user.save();
      });

      return res.json({
        data: "your one time dual factor authentication passcode sent to your email",
      });
    }
  } catch (error) {
    next(activateError(error.message));
  }
};
