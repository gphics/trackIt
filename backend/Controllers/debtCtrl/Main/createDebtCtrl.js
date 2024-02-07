const DebtModel = require("../../../Models/DebtModel");
const activateError = require("../../../Utils/activateError");
const UserModel = require("../../../Models/UserModel");
const cronOperations = require("./debtCreateCron");
const jwtVerify = require("../../../Config/jwtVerify");

module.exports = async (req, res, next) => {
  try {
    const { title, category, amount, debtInfo } = req.body;
    if (!title || !category || !amount || !debtInfo) {
      return next(activateError("all required field must be supplied"));
    }
    const { auth_token } = req.query;
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(activateError(err));
    }
    const user = await UserModel.findOne({ email: data.email });
    // creating the debt obj
    const debt = await DebtModel.create({
      ...req.body,
      user: user._id,
    });
    if (debt) {
      // updating the user

      // adding the debt id to the user obj
      user.Debts.unshift(debt._id);

      if (!debt.paid) {
        // upating user debt amount
        if (debt.category === "to_be_paid") {
          user.totalDebtAmount.to_be_paid += debt.amount;
          user.totalDebtCount.to_be_paid += 1;
        } else {
          user.totalDebtCount.to_be_collected += 1;
          user.totalDebtAmount.to_be_collected += debt.amount;
        }
      } else {
        user.totalPaidDebt.count += 1;
        user.totalPaidDebt.amount += debt.amount;
      }

      // setting cron-job if the debt is yet to be paid and debt.deadline exist
      if (!debt.paid && debt.deadline) {
        cronOperations(debt.deadline, debt._id, user._id);
      }

      // saving the user
      const savingUser = await user.save();
      if (savingUser)
        res.json({ data: { data: debt._id, auth_token }, err: null });
    }
  } catch (error) {
    next(activateError(error.message));
  }
};
