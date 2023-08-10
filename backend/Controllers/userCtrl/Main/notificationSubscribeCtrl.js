const UserModel = require("../../../Models/UserModel");
const webPush = require("../../../Config/webPush");
const activateError = require("../../../Utils/activateError");
module.exports = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const user = await UserModel.findById(req.session.authID);
    user.notificationSubscriptions.push(subscription);
    await user.save();
    const payload = JSON.stringify({
      title: "Subscription added",
      body: "welcome to trackIt",
    });
    await webPush.sendNotification(subscription, payload);
    res.json({ data: "subscription added" });
  } catch (error) {
    next(activateError(500, error.message));
  }
};
