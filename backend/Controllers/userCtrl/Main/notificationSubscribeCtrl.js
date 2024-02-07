const UserModel = require("../../../Models/UserModel");
const webPush = require("../../../Config/webPush");
const activateError = require("../../../Utils/activateError");
const jwtVerify = require("../../../Config/jwtVerify");
module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(activateError(err));
    }
    const { subscription } = req.body;
    const user = await UserModel.findOne({ email: data.email });
    user.notificationSubscriptions.push(subscription);
    await user.save();
    const payload = JSON.stringify({
      title: "Subscription added",
      body: "welcome to trackIt",
    });
    await webPush.sendNotification(subscription, payload);
    res.json({ data: { auth_token, data: "subscription added" }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
