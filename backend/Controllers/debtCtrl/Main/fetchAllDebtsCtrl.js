const DebtModel = require("../../../Models/DebtModel")
const activateError = require("../../../Utils/activateError")


module.exports = async (req, res, next) => {
    try {
        const allMyDebts = await DebtModel.find({ user: req.session.authID })
        res.json({data: allMyDebts})
    } catch (error) {
        next(activateError(500, error.message))
    }
}