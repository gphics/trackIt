const sendMail = require("../../../Config/sendMail");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const { fullname, email, password, gender } = req.body;
  if (!fullname || !email || !gender) {
    return next(activateError(401, "all field must be populated"));
  }
  if (!password || password.length < 6) {
    return next(
      activateError(401, "password field length must be greater than 7")
    );
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
      isActive: true,
      gender,
    });

    if (user) {
      // writeup to be sent to mail if user created successfully
      const html = `
<html>
<style>
body{
  display:flex;
  flex-direction: column;
}
</style>
<body>
<h2>
Welcome to trackIt, ${gender === "male" ? "Mr " + fullname : "Mrs " + fullname}.
</h2>
<p> start tracking all your debts today with our easy to use and accurate debt tracking software </p>
</body>
</html>
`;

      sendMail(email, "Account creation", html);
      req.session.authID = user._id;
      return res.json({ data: user });
    }
  } catch (error) {
    return next(activateError(400, error.message));
  }
};
