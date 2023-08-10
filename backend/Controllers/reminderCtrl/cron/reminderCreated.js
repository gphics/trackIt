const sendMail = require("../../../Config/sendMail");
const ReminderModel = require("../../../Models/ReminderModel");
const UserModel = require("../../../Models/UserModel");
const webPush = require("../../../Config/webPush");
const nodeCron = require("node-cron");
const {
  tenSecondsBefore,
  dateStringGenerator,
  actualDateString,
  monthlyString,
  weeklyString,
  dailyString,
} = require("../../../Utils/cronStringGenerators");

module.exports = (dueDate, reminderId, authID) => {
  nodeCron.schedule(tenSecondsBefore(dueDate), async () => {
    //   getting the reminder
    const reminder = await ReminderModel.findById(reminderId);
    // getting the date strings from each date obj
    const [createdAt, updatedAt] = dateStringGenerator(
      reminder.createdAt,
      reminder.updatedAt
    );

    // if the reminder has been deleted or updated
    if (!reminder || createdAt !== updatedAt) {
      console.log("from the tenSecondsBefore, the reminder has been deleted");
      return;
    }
    // if there is no changes to the reminder, then set the cron job
    setMainTask(
      dueDate,
      reminderId,
      reminder.repeat,
      reminder.repetitionInterval,
      authID
    ).start();
  });
};

function setMainTask(dueDate, reminderId, repeat, repetitionInterval, authID) {
  try {
    // configuring the dateString
    let dateString = actualDateString(dueDate);
    if (repeat) {
      if (repetitionInterval === "daily") {
        dateString = dailyString(dueDate);
      } else if (repetitionInterval === "weekly") {
        dateString = weeklyString(dueDate);
      } else {
        dateString = monthlyString(dueDate);
      }
    }
    // setting the cron job
    const mainTask = nodeCron.schedule(
      dateString,
      async () => {
        const reminder = await ReminderModel.findById(reminderId);
        const user = await UserModel.findById(authID);
        const [createdAt, updatedAt] = dateStringGenerator(
          reminder.createdAt,
          reminder.updatedAt
        );

        // if the reminder has been updated or deleted
        if (!reminder || createdAt !== updatedAt) {
          console.log(
            "the reminder has been updated so the cron job was returned"
          );
          return;
        }

        const { notificationSubscriptions, email } = user;

        const html = `<div>
        <h2>You have a reminder today for ${reminder.title}</h2>
        <h3>Note:</h3>
        <br>
        <p> ${reminder.note} </p>
         </div>`;
        const notificationPayload = JSON.stringify({
          title: `Reminder for ${reminder.title}`,
          body: reminder.note,
        });
        // sending the mail

        sendMail(email, "Your reminder", html);

        // sending push notification
        if (notificationSubscriptions.length === 0) {
          return;
        }
        await Promise.all(
          notificationSubscriptions.map(
            async (subscription) =>
              await webPush.sendNotification(subscription, notificationPayload)
          )
        );
        console.log("from the created , i sent all");
      },
      { scheduled: false }
    );

    // main function return
    return mainTask;
  } catch (error) {
    console.log(error);
  }
}
