const { upload } = require("../../Config/cloudinaryStore");
const checkUserExist = require("../../Middlewares/Auth/checkUserExist");
const dontPermitIfAuth = require("../../Middlewares/Auth/dontPermitIfAuth");
const permitIfAuth = require("../../Middlewares/Auth/permitIfAuth");
const loginCtrl = require("./Main/loginCtrl");
const logoutCtrl = require("./Main/logoutCtrl");
const notificationSubscribeCtrl = require("./Main/notificationSubscribeCtrl");
const profileCtrl = require("./Main/profileCtrl");
const registerCtrl = require("./Main/registerCtrl");
const resetPasswordCtrl = require("./Main/resetPasswordCtrl");
const updateAvatarCtrl = require("./Main/updateAvatarCtrl");
const updateEmailCtrl = require("./Main/updateEmailCtrl");
const updatePasswordCtrl = require("./Main/updatePasswordCtrl");
const updateUserInfoCtrl = require("./Main/updateUserInfoCtrl");
const uploadAvatarCtrl = require("./Main/uploadAvatarCtrl");

module.exports = [
  {
    url: "/register",
    method: "post",
    action: registerCtrl,
    mid: [dontPermitIfAuth, checkUserExist],
  },
  {
    url: "/reset-password",
    method: "post",
    action: resetPasswordCtrl,
    mid: [dontPermitIfAuth],
  },

  { url: "/login", method: "post", action: loginCtrl, mid: [dontPermitIfAuth] },
  { url: "/logout", method: "get", action: logoutCtrl, mid: [permitIfAuth] },
  {
    url: "/update",
    method: "put",
    action: updateUserInfoCtrl,
    mid: [permitIfAuth],
  },
  {
    url: "/subscribe",
    method: "post",
    action: notificationSubscribeCtrl,
    mid: [permitIfAuth],
  },
  {
    url: "/update-password",
    method: "put",
    action: updatePasswordCtrl,
    mid: [permitIfAuth],
  },
  {
    url: "/update-email",
    method: "put",
    action: updateEmailCtrl,
    mid: [permitIfAuth, checkUserExist],
  },
  {
    url: "/upload-avatar",
    method: "post",
    action: uploadAvatarCtrl,
    mid: [permitIfAuth, upload.single("avatar")],
  },
  {
    url: "/update-avatar",
    method: "put",
    action: updateAvatarCtrl,
    mid: [permitIfAuth, upload.single("avatar")],
  },
  {
    url: "",
    method: "get",
    action: profileCtrl,
    mid: [permitIfAuth],
  },
];
