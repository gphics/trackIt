const debtCtrl = require("../Controllers/debtCtrl");
const DebtModel = require("../Models/DebtModel");

const express = require("express");

const debtRouter = express.Router();
debtCtrl.map(({ url, action, method, mid }) => {
  if (mid) {
    debtRouter[method](url, ...mid, action);
  } else {
    debtRouter[method](url, action);
  }
});

module.exports = debtRouter;
