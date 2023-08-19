const DebtModel = require("../../../Models/DebtModel");
const activateError = require("../../../Utils/activateError");

module.exports = async (req, res, next) => {
  try {
    const debt = await DebtModel.findById(req.params.debtID);
    res.json({ data: debt });
  } catch (error) {
    next(activateError(error.message));
  }
};
