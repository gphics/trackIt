const checkIsLogin = require("../../Middlewares/Auth/checkIsLogin");
const createDebtCtrl = require("./Main/createDebtCtrl");
const deleteDebtCtrl = require("./Main/deleteDebtCtrl");
const fetchAllDebtsCtrl = require("./Main/fetchAllDebtsCtrl");
const fetchSingleDebtCtrl = require("./Main/fetchSingleDebtCtrl");
const updateDebtCtrl = require("./Main/updateDebtCtrl");

module.exports = [
  {
    url: "/create",
    action: createDebtCtrl,
    method: "post",
    mid: [checkIsLogin],
  },
  {
    url: "/fetch-all",
    action: fetchAllDebtsCtrl,
    method: "get",
    mid: [checkIsLogin],
  },

  {
    url: "/delete/:debtID",
    action: deleteDebtCtrl,
    method: "delete",
    mid: [checkIsLogin],
  },
  {
    url: "/update/:debtID",
    action: updateDebtCtrl,
    method: "put",
    mid: [checkIsLogin],
  },
  {
    url: "/:debtID",
    action: fetchSingleDebtCtrl,
    method: "get",
    mid: [checkIsLogin],
  },
];
