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

module.exports = (dueDate, reminderId, authID, repeat, repetitionInterval) => {
  nodeCron.schedule(tenSecondsBefore(dueDate), async () => {
    try {
      //   getting the reminder
      const reminder = await ReminderModel.findById(reminderId);

      // getting the date strings from each date obj
      const [reminderDueDate, transDueDate] = dateStringGenerator(
        reminder.dueDate,
        dueDate
      );

      // if the reminder has been deleted or
      //   it has been re-updated
      // deps: [dueDate, repeat, repetitionInterval, isUpdated]
      if (
        !reminder ||
        transDueDate !== reminderDueDate ||
        repeat !== reminder.repeat ||
        repetitionInterval !== reminder.repetitionInterval ||
        !reminder.isUpdated
      ) {
        console.log("seems I got reupdated");
        return;
      }
      //   changing the isUpdated variable of the reminder
      reminder.isUpdated = false;
      const data = await reminder.save();
      // if the reminder still exist
      if (data) {
        setMainTask(
          dueDate,
          reminderId,
          reminder.repeat,
          reminder.repetitionInterval,
          authID
        ).start();
      }
    } catch (error) {
      console.log(error);
    }
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

        //   if the reminder.isUpdated is true; meaning the reminder got reupdated
        //   then return out of the function
        //   or if the reminder does not exist
        if (!reminder || reminder.isUpdated) {
          return;
        }

        //   fetching the user
        const user = await UserModel.findById(authID);
        // getting the important data from the user
        const { notificationSubscriptions, email} = user;

        const html = `<div>
        <h2>You have a reminder today for ${reminder.title}</h2>
        <h3>Note: </h3>
        <br>
        <p> ${reminder.note} </p>
         </div>`;
        const notificationPayload = JSON.stringify({
          title: `Reminder for ${reminder.title}`,
          body: reminder.note,
        });
        // s

        // sending the mail

        sendMail(email, "Your reminder", html);
        // returning if the notificationSubscription array is empty
        if (notificationSubscriptions.length === 0) {
          console.log("I am returnning the notiication array is empty");
          return;
        }
        // sending push notification
        await Promise.all(
          notificationSubscriptions.map(
            async (subscription) =>
              await webPush.sendNotification(subscription, notificationPayload)
          )
        );
      },
      { scheduled: false }
    );

    // main function return
    return mainTask;
  } catch (error) {
    console.log(error);
  }
}

// console.log(new Date())
