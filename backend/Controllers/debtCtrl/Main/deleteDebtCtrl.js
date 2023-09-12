const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const debt = await DebtModel.findByIdAndDelete(req.params.debtID);
    if (!debt) {
      return next(activateError("debt not found", 404));
    }
    const user = await UserModel.findById(req.session.authID);
    user.Debts = user.Debts.filter((id) => id.toString() !== req.params.debtID);

    if (!debt.paid) {
      // upating user debt amount
      if (debt.category === "to_be_paid") {
        user.totalDebtAmount.to_be_paid -= debt.amount;
        user.totalDebtCount.to_be_paid -= 1;
      } else {
        user.totalDebtAmount.to_be_collected -= debt.amount;
        user.totalDebtCount.to_be_collected -= 1;
      }
    } else {
      user.totalPaidDebt.count -= 1
      user.totalPaidDebt.amount -= debt.amount
    }

    await user.save();
    res.json({ data: "debt deleted" });
  } catch (error) {
    next(activateError(error.message));
  }
};
