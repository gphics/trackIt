const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const debtUpdateCron = require("./debtUpdateCron");

module.exports = async (req, res, next) => {
  const { debtID } = req.params;
  const { authID } = req.session;
  try {
    const user = await UserModel.findById(authID).populate("Debts");
    const debt = await DebtModel.findByIdAndUpdate(
      debtID,
      { ...req.body, isUpdated: true },
      {
        new: true,
      }
    );

    if (debt) {
      // removing the updated debt from the user debt array
      user.Debts = user.Debts.filter(
        (eachDebt) => eachDebt._id.toString() !== debtID
      );
      user.Debts.unshift(debt);
      // updating copiedUser totalDebtAmount after the removal of the updated
      let to_be_paid = 0;
      let to_be_collected = 0;
      let paid = 0;
      let notPaid = 0;
      user.Debts.map((elem) => {
        // updating the amount base on category
        if (elem.category === "to_be_paid") {
          to_be_paid += elem.amount;
        } else {
          to_be_collected += elem.amount;
        }

        if (elem.paid) {
          paid += 1;
        } else {
          notPaid += 1;
        }
      });
      user.totalDebtAmount = { to_be_paid, to_be_collected };
      user.totalDebtCount = { paid, notPaid };
      // setting the cron job
      if (!debt.paid && debt.deadline) {
        debtUpdateCron(debt.deadline, debt._id, req.session.authID);
      }
      // resaving the user
      await user.save();
      res.json({ data: debt });
    } else {
      next(activateError("debt not found", 404));
    }
  } catch (error) {
    next(activateError(error.message))
  }
};
