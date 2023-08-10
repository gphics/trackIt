const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const nodeCron = require("node-cron");
const {
  actualDateString,
  tenSecondsBefore,
  dateStringGenerator,
} = require("../../../Utils/cronStringGenerators");
const sendMail = require("../../../Config/sendMail");
const webPush = require("../../../Config/webPush");
module.exports = function cronOperations(date, debtId, authID) {
  // first cron job
  nodeCron.schedule(tenSecondsBefore(date), async () => {
    // getting the debt model
    const debt = await DebtModel.findById(debtId);
    // converting the dates to string
    const [createdAt, updatedAt] = dateStringGenerator(
      debt.createdAt,
      debt.updatedAt
    );
    // if any of the following condition is met, the cron job will be stopped
    if (!debt || debt.paid || !debt.deadline || createdAt !== updatedAt) {
      return;
    }

    // starting the cron job if nothing has happened to the debt
    // main cron job
    setMainTask(date, debtId, authID).start();
    return;
  });
};

function setMainTask(date, debtId, authID) {
  const mainTask = nodeCron.schedule(actualDateString(date), async () => {
    const debt = await DebtModel.findById(debtId);
    // if debt is deleted
    if (!debt || debt.paid || !debt.deadline) {
      return;
    }
    const user = await UserModel.findById(authID);
    const {
      debtorInfo,
      creditorInfo,
      title,
      amount,
      deadline,
      category,
      debtInfo,
    } = debt;

    const html = `
    <html>
    <style>
    section{
      display:flex;
      flex-direction: column;
    }

    div{
       display:flex;
      flex-direction: column;
      margin:10px 0;
    }
    h4{
      margin: 5px 0
    }

    </style>
<body>
<h3> ${user.gender === "male" ? "Mr" : "Mrs"} ${
      user.fullname
    } it's another payment deadline </h3>
<h5> Below are the informations of the debt </h5>

<section>
<div>
<h3> Debt informations </h3>
<h4> Title : ${title}  </h4>
<h4> Amount : ${amount}  </h4>
<h4> Category : ${category}  </h4>
<h4> Date : ${new Date(deadline).toString()}  </h4>
<p> Info : ${debtInfo}  </p>
</div>
<br>
<div>
<h3> Creditor informations </h3>
<h4> Name : ${creditorInfo.name}  </h4>
<h4> Comtact : ${creditorInfo.contact}  </h4>
<h4> Location : ${creditorInfo.location}  </h4>
</div>
<div>

<br>
<h3> Debtor informations </h3>
<h4> Name : ${debtorInfo.name}  </h4>
<h4> Comtact : ${debtorInfo.contact}  </h4>
<h4> Location : ${debtorInfo.location}  </h4>
</div>

</section>

</body>

    </html>
    `;
    // sending mail to the user
    sendMail(user.email, "Payment Deadline", html);
    // sending push notifiction
    if (
      user.notificationSubscriptions &&
      user.notificationSubscriptions.length !== 0
    ) {
      const { notificationSubscriptions } = user;
      const notificationPayload = JSON.stringify({
        title: "Payment tracker",
        body: "payment deadline tracked",
        debtId: debt._id,
      });

      await Promise.all(
        notificationSubscriptions.map(
          async (subscription) =>
            await webPush.sendNotification(subscription, notificationPayload)
        )
      );
    }
  });
  return mainTask;
}
