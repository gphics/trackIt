const jwtVerify = require("../../../Config/jwtVerify");
const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");
const debtUpdateCron = require("./debtUpdateCron");

module.exports = async (req, res, next) => {
  const { debtID } = req.params;
  const { auth_token } = req.query;
  const { data, err } = jwtVerify(auth_token);
  if (err) {
    return next(activateError(err));
  }
  try {
    const debt = await DebtModel.findByIdAndUpdate(
      debtID,
      { ...req.body, isUpdated: true },
      {
        new: true,
      }
    );

    if (debt) {
      // fetching the user to get the newly updated debt
      const user = await UserModel.findOne({ email: data.email }).populate(
        "Debts"
      );
      // updating user totalDebtAmount and totalDebtCount
      let amount_to_be_paid = 0;
      let amount_to_be_collected = 0;
      let count_to_be_paid = 0;
      let count_to_be_collected = 0;
      let totalPaidDebtAmount = 0;
      let totalPaidDebtCount = 0;
      user.Debts.map((elem) => {
        if (!elem.paid) {
          // updating the amount and count base on category
          if (elem.category === "to_be_paid") {
            amount_to_be_paid += elem.amount;
            count_to_be_paid += 1;
          } else {
            amount_to_be_collected += elem.amount;
            count_to_be_collected += 1;
          }
        } else {
          totalPaidDebtCount += 1;
          totalPaidDebtAmount += debt.amount;
        }
      });
      user.totalDebtCount = {
        to_be_collected: count_to_be_collected,
        to_be_paid: count_to_be_paid,
      };
      user.totalDebtAmount = {
        to_be_collected: amount_to_be_collected,
        to_be_paid: amount_to_be_paid,
      };
      user.totalPaidDebt = {
        amount: totalPaidDebtAmount,
        count: totalPaidDebtCount,
      };
      // setting the cron job
      if (!debt.paid && debt.deadline) {
        debtUpdateCron(debt.deadline, debt._id, user._id);
      }
      // resaving the user
      await user.save();
      res.json({ data: { auth_token, data: debt.id}, err: null });
    } else {
      next(activateError("debt not found", 404));
    }
  } catch (error) {
    next(activateError(error.message));
  }
};
