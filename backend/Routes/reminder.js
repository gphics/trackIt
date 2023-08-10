const reminderCtrl = require("../Controllers/reminderCtrl");

const express = require("express")

const reminderRouter = express.Router()

reminderCtrl.map(({ mid, url, action, method }) => {
    if (mid) {
       reminderRouter[method](url, ...mid, action);
    } else {
        reminderRouter[method](url, action)
    }
})
module.exports = reminderRouter