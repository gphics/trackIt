const permitIfAuth = require("../../Middlewares/Auth/permitIfAuth");
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
    mid: [permitIfAuth],
  },
  {
    url: "/all",
    action: fetchAllDebtsCtrl,
    method: "get",
    mid: [permitIfAuth],
  },

  {
    url: "/:debtID",
    action: deleteDebtCtrl,
    method: "delete",
    mid: [permitIfAuth],
  },
  {
    url: "/:debtID",
    action: updateDebtCtrl,
    method: "put",
    mid: [permitIfAuth],
  },
  {
    url: "/:debtID",
    action: fetchSingleDebtCtrl,
    method: "get",
    mid: [permitIfAuth],
  },
];
