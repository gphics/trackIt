const DebtModel = require("../../../Models/DebtModel");
const activateError = require("../../../Utils/activateError");
const UserModel = require("../../../Models/UserModel");
const cronOperations = require("./debtCreateCron");


module.exports = async (req, res, next) => {
  try {
    // creating the debt obj
    const debt = await DebtModel.create({
      ...req.body,
      user: req.session.authID,
    });
    if (debt) {
      // updating the user
      const user = await UserModel.findById(req.session.authID);
      // adding the debt id to the user obj
      user.Debts.unshift(debt._id);
      // upating user debt amount
      if (debt.category === "to_be_paid") {
        user.totalDebtAmount.to_be_paid += debt.amount;
      } else {
        user.totalDebtAmount.to_be_collected += debt.amount;
      }
      // updating user debt count
      if (!debt.paid) {
        user.totalDebtCount.notPaid += 1;
      } else {
        user.totalDebtCount.paid += 1;
      }

      // setting cron-job if the debt is yet to be paid and debt.deadline exist
      if (!debt.paid && debt.deadline) {
        cronOperations(debt.deadline, debt._id, req.session.authID);
      }

      // saving the user
      const savingUser = await user.save();
      if (savingUser) res.json({ data: debt });
    }
  } catch (error) {
    next(activateError(500, error.message));
  }
};
