

const express = require("express");
const userCtrl = require("../Controllers/userCtrl");

const userRouter = express.Router();
userCtrl.map(({ url, action, method, mid }) => {
  if (mid) {
    userRouter[method](url, ...mid, action);
  } else {
    userRouter[method](url, action);
  }
});

module.exports = userRouter;
