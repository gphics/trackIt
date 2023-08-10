const checkIsLogin = require("../../Middlewares/Auth/checkIsLogin");
const createReminderCtrl = require("./Main/createReminderCtrl");
const deleteReminderCtrl = require("./Main/deleteReminderCtrl");
const fetchAllCtrl = require("./Main/fetchAllCtrl");
const fetchReminderCtrl = require("./Main/fetchReminderCtrl");
const updateReminderCtrl = require("./Main/updateReminderCtrl");

module.exports = [
  {
    url: "/create",
    action: createReminderCtrl,
    method: "post",
    mid: [checkIsLogin],
  },
  {
    url: "/update/:id",
    action: updateReminderCtrl,
    method: "put",
    mid: [checkIsLogin],
  },

  {
    url: "/delete/:id",
    action: deleteReminderCtrl,
    method: "delete",
    mid: [checkIsLogin],
  },
  {
    url: "/fetch-all",
    action: fetchAllCtrl,
    method: "get",
    mid: [checkIsLogin],
  },
  {
    url: "/:id",
    action: fetchReminderCtrl,
    method: "get",
    mid: [checkIsLogin],
  },
];
