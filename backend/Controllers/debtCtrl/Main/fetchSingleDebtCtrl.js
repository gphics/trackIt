const DebtModel = require("../../../Models/DebtModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const { auth_token } = req.query;

    const debt = await DebtModel.findById(req.params.debtID);
    res.json({ data: { data: debt, auth_token }, err: null });
  } catch (error) {
    next(activateError(error.message));
  }
};
