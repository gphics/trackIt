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

    // upating user debt amount
    if (debt.category === "to_be_paid") {
      user.totalDebtAmount.to_be_paid -= debt.amount;
    } else {
      user.totalDebtAmount.to_be_collected -= debt.amount;
    }
    // updating user debt count
    if (!debt.paid) {
      user.totalDebtCount.notPaid -= 1;
    } else {
      user.totalDebtCount.paid -= 1;
    }
    await user.save();
    res.json({ data: "debt deleted" });
  } catch (error) {
    next(activateError(error.message));
  }
};
