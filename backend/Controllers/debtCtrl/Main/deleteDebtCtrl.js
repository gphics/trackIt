const jwtVerify = require("../../../Config/jwtVerify");
const DebtModel = require("../../../Models/DebtModel");
const UserModel = require("../../../Models/UserModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;
    const { data, err } = jwtVerify(auth_token);
    if (err) {
      return next(activateError(err));
    }
    const debt = await DebtModel.findByIdAndDelete(req.params.debtID);
    if (!debt) {
      return next(activateError("debt not found", 404));
    }
    const user = await UserModel.findOne({ email: data.email });
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
      user.totalPaidDebt.count -= 1;
      user.totalPaidDebt.amount -= debt.amount;
    }

    await user.save();
    res.json({ data: { auth_token, data: "debt deleted" }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
