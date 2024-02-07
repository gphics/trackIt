const permitIfAuth = require("../../Middlewares/Auth/permitIfAuth");
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
    mid: [permitIfAuth],
  },
  {
    url: "/:id",
    action: updateReminderCtrl,
    method: "put",
    mid: [permitIfAuth],
  },

  {
    url: "/:id",
    action: deleteReminderCtrl,
    method: "delete",
    mid: [permitIfAuth],
  },
  {
    url: "/all",
    action: fetchAllCtrl,
    method: "get",
    mid: [permitIfAuth],
  },
  {
    url: "/:id",
    action: fetchReminderCtrl,
    method: "get",
    mid: [permitIfAuth],
  },
];
